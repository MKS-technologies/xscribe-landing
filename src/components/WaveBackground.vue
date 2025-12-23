<template>
  <canvas ref="canvasRef" class="wave-background"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

type Particle = {
  hue: number
  sat: number
  lum: number
  x: number
  y: number
  xLast: number
  yLast: number
  xSpeed: number
  ySpeed: number
  speed: number
  age: number
  name: string
}

type Eddy = {
  x: number
  y: number
  K: number
  r0: number
}

const canvasRef = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let animationId: number
let particles: Particle[] = []
let stepCount = 0
let width = 0
let height = 0
let xC = 0
let yC = 0
let dataToImageRatio = 1
let startTime = 0
let animationStopped = false

// Particle system properties
const lifespan = 420
const popPerBirth = 5
const maxPop = 1500
const birthFreq = 1
const ANIMATION_DURATION = 10000 // Stop after 10 seconds (in milliseconds)

// Tuning constants for motion/opacity/fade
const SPEED_SCALE = 0.05 // Lower = slower animation (was ~0.1 implicit)
const EDDY_INTENSITY = 5 // Lower than 7 to reduce flow speed
const TRAIL_FADE_ALPHA = 0.06 // Higher = faster fade of old lines (was 0.02)
const ALPHA_BASE = 0.05 // Base stroke alpha to keep text readable
const ALPHA_MAX = 0.16 // Cap stroke alpha so it never gets too strong

const segmentAngleRad = (
  Xstart: number,
  Ystart: number,
  Xtarget: number,
  Ytarget: number,
  realOrWeb: boolean,
): number => {
  let result = 0

  if (Xstart === Xtarget) {
    if (Ystart === Ytarget) {
      result = 0
    } else if (Ystart < Ytarget) {
      result = Math.PI / 2
    } else {
      result = (3 * Math.PI) / 2
    }
  } else if (Xstart < Xtarget) {
    result = Math.atan((Ytarget - Ystart) / (Xtarget - Xstart))
  } else {
    result = Math.PI + Math.atan((Ytarget - Ystart) / (Xtarget - Xstart))
  }

  result = (result + 2 * Math.PI) % (2 * Math.PI)

  if (!realOrWeb) {
    result = 2 * Math.PI - result
  }

  return result
}

const dataXYtoCanvasXY = (x: number, y: number): { x: number; y: number } => {
  const zoom = 0.72
  const xx = xC + x * zoom * dataToImageRatio
  const yy = yC + y * zoom * dataToImageRatio
  return { x: xx, y: yy }
}

const birth = () => {
  const x = -800 + 1600 * Math.random()
  const y = -800 + 1600 * Math.random()

  const particle: Particle = {
    hue: 195 + 3 * Math.floor(3 * Math.random()),
    sat: 65 + 30 * Math.random(),
    lum: 15 + Math.floor(50 * Math.random()),
    x,
    y,
    xLast: x,
    yLast: y,
    xSpeed: 0,
    ySpeed: 0,
    speed: 0,
    age: 0,
    name: 'seed-' + Math.ceil(10000000 * Math.random()),
  }

  particles.push(particle)
}

const kill = (deadParticleName: string) => {
  particles = particles.filter((p) => p.name !== deadParticleName)
}

const move = () => {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // Save last position
    p.xLast = p.x
    p.yLast = p.y

    // Reset velocity
    p.xSpeed = 0
    p.ySpeed = 0

    // Eddies configuration
    const baseK = EDDY_INTENSITY
    const eddies: Eddy[] = [
      { x: -300, y: -300, K: 10 * baseK, r0: 180 },
      { x: 300, y: -300, K: 15 * baseK, r0: 150 },
      { x: 300, y: 300, K: 10 * baseK, r0: 250 },
      { x: -300, y: 300, K: 15 * baseK, r0: 150 },
      { x: 0, y: 0, K: 5 * baseK, r0: 20 },
    ]

    for (let e = 0; e < eddies.length; e++) {
      const eddy = eddies[e]
      const dx = p.x - eddy.x
      const dy = p.y - eddy.y
      const r = Math.sqrt(dx * dx + dy * dy)
      const theta = segmentAngleRad(0, 0, dx, dy, true)
      const cos = Math.cos(theta)
      const sin = Math.sin(theta)
      const K = eddy.K
      const r0 = eddy.r0

      const er = { x: cos, y: sin }
      const eO = { x: -sin, y: cos }

      const radialVelocity = (-0.003 * K * Math.abs(dx * dy)) / 3000
      const sigma = 100
      const azimutalVelocity = K * Math.exp(-Math.pow((r - r0) / sigma, 2))

      p.xSpeed += radialVelocity * er.x + azimutalVelocity * eO.x
      p.ySpeed += radialVelocity * er.y + azimutalVelocity * eO.y
    }

    // Viscosity
    const visc = 1
    p.xSpeed *= visc
    p.ySpeed *= visc

    p.speed = Math.sqrt(p.xSpeed * p.xSpeed + p.ySpeed * p.ySpeed)

    // Logarithmic speed decay - VERY fast at start (first 1-2 seconds), then slow down dramatically
    // Super fast initial phase (0-60 frames ≈ 1 second at 60fps)
    // Then rapid slowdown using steep logarithmic curve
    let logDamping: number
    if (p.age < 60) {
      // First second: 10x speed boost for instant visual impact
      logDamping = 10
    } else if (p.age < 120) {
      // Second 1-2: transition from 10x to 1x (rapid deceleration)
      const transitionProgress = (p.age - 60) / 60
      logDamping = 10 - 9 * transitionProgress // 10 → 1
    } else {
      // After 2 seconds: normal logarithmic decay
      const adjustedAge = (p.age - 120) / lifespan
      logDamping = 1 / (1 + Math.log(1 + adjustedAge * 10))
    }

    const speedMultiplier = SPEED_SCALE * logDamping

    p.x += speedMultiplier * p.xSpeed
    p.y += speedMultiplier * p.ySpeed

    // Get older
    p.age++

    // Kill if too old
    if (p.age > lifespan) {
      kill(p.name)
    }
  }
}

const initDraw = () => {
  if (!ctx) return

  // Clear and draw background
  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()
  ctx.rect(0, 0, width, height)
  // Keep background very light so content stays readable behind
  ctx.fillStyle = '#f8fbff'
  ctx.fill()
  ctx.closePath()
}

const draw = () => {
  if (!ctx || !particles.length) return

  // Subtle fade effect to erase old lines gradually
  ctx.beginPath()
  ctx.rect(0, 0, width, height)
  ctx.fillStyle = `rgba(248, 251, 255, ${TRAIL_FADE_ALPHA})`
  ctx.fill()
  ctx.closePath()

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    const h = p.hue
    const s = p.sat
    const l = p.lum
    // Keep stroke alpha low to prevent obscuring text
    let a = ALPHA_BASE + p.speed / 700
    if (a > ALPHA_MAX) a = ALPHA_MAX

    const last = dataXYtoCanvasXY(p.xLast, p.yLast)
    const now = dataXYtoCanvasXY(p.x, p.y)

    ctx.beginPath()
    ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`
    ctx.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`

    // Particle trail
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(now.x, now.y)

    const size = 0.4 * (3 - (4 * p.age) / 500)
    ctx.lineWidth = 1 * size * dataToImageRatio
    ctx.stroke()
    ctx.closePath()
  }
}

const evolve = () => {
  stepCount++

  // Birth control
  if (stepCount % birthFreq === 0 && particles.length + popPerBirth < maxPop) {
    for (let n = 0; n < popPerBirth; n++) {
      birth()
    }
  }

  move()
  draw()
}

const animate = () => {
  // Check if 10 seconds have elapsed since start
  const elapsed = performance.now() - startTime

  if (elapsed >= ANIMATION_DURATION) {
    // Stop animation after 10 seconds
    animationStopped = true
    cancelAnimationFrame(animationId)
    return
  }

  evolve()
  animationId = requestAnimationFrame(animate)
}

const setup = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')

  if (!ctx) return

  // Set canvas size to viewport dimensions
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height

  // Ensure canvas doesn't exceed viewport
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.maxWidth = '100vw'
  canvas.style.maxHeight = '100vh'

  dataToImageRatio = Math.max(width, height) / 1000

  // Blend mode for darker composite (valid value per TS types)
  ctx.globalCompositeOperation = 'darken'
  ctx.imageSmoothingEnabled = false

  xC = width / 2
  yC = height / 2

  // Initialize
  stepCount = 0
  particles = []
  animationStopped = false
  startTime = performance.now() // Record start time for 10-second limit

  initDraw()

  // Spawn initial burst of particles to fill screen immediately
  // Create 300 particles at once so screen isn't empty on load
  for (let i = 0; i < 300; i++) {
    birth()
  }

  animate()
}

const handleResize = () => {
  if (!canvasRef.value || !ctx) return

  // Store the current canvas state before resizing
  const tempCanvas = document.createElement('canvas')
  const tempCtx = tempCanvas.getContext('2d')
  if (!tempCtx) return

  // Copy current canvas to temporary canvas
  tempCanvas.width = width
  tempCanvas.height = height
  tempCtx.drawImage(canvasRef.value, 0, 0)

  // Update dimensions
  const oldWidth = width
  const oldHeight = height
  width = window.innerWidth
  height = window.innerHeight

  canvasRef.value.width = width
  canvasRef.value.height = height

  // Ensure canvas styles are maintained on resize
  canvasRef.value.style.width = '100vw'
  canvasRef.value.style.height = '100vh'
  canvasRef.value.style.maxWidth = '100vw'
  canvasRef.value.style.maxHeight = '100vh'

  // Update data ratio and center point
  dataToImageRatio = Math.max(width, height) / 1000
  xC = width / 2
  yC = height / 2

  // Restore the canvas content by scaling it to the new size
  if (ctx) {
    ctx.save()
    ctx.scale(width / oldWidth, height / oldHeight)
    ctx.drawImage(tempCanvas, 0, 0)
    ctx.restore()

    // Restore the blend mode
    ctx.globalCompositeOperation = 'darken'
  }

  // Don't call initDraw() - we want to preserve the existing pattern
}

// Debounce helper to prevent excessive resize calls
let resizeTimeout: number | null = null
const debouncedResize = () => {
  if (resizeTimeout !== null) {
    clearTimeout(resizeTimeout)
  }
  resizeTimeout = window.setTimeout(() => {
    handleResize()
    resizeTimeout = null
  }, 150) // 150ms debounce
}

onMounted(() => {
  setup()
  window.addEventListener('resize', debouncedResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', debouncedResize)
  if (resizeTimeout !== null) {
    clearTimeout(resizeTimeout)
  }
})
</script>

<style scoped>
.wave-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0.38; /* Lower overall opacity so foreground text stays readable */
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
}

/* Accessibility: reduce motion */
@media (prefers-reduced-motion: reduce) {
  .wave-background {
    display: none;
  }
}
</style>
