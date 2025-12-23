<script setup lang="ts">
const APP_URL = 'https://app.xscribe.tech'
</script>

<template>
  <section class="hero-section">
    <!-- Content -->
    <div class="hero-container">
      <!-- Badge -->
      <div class="hero-badge">
        <span class="badge-new">NEW</span>
        <span class="badge-text">{{ $t('home.heroTagline') }}</span>
        <svg class="badge-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <!-- Main Headline -->
      <h1 class="hero-title">
        {{ $t('home.heroHeadline') }}
      </h1>

      <!-- Subtitle -->
      <p class="hero-subtitle">
        {{ $t('home.heroDescription') }}
      </p>

      <!-- CTA -->
      <div class="hero-ctas">
        <a :href="APP_URL + '/signup'" class="cta-btn cta-primary">
          {{ $t('home.signUpFree') }}
          <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 6rem;
  background: url('/svg/bg.svg') center center / cover no-repeat;
  background-color: #ffffff;
}

.hero-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 900px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 9999px;
  margin-bottom: 2.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.hero-badge:hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 0.7);
}

.badge-new {
  background: #dbeafe;
  color: #2563eb;
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.05em;
}

.badge-text {
  color: #475569;
  font-size: 0.875rem;
}

.badge-arrow {
  width: 1rem;
  height: 1rem;
  stroke: #94a3b8;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 600;
  line-height: 1.1;
  color: #0f172a;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #64748b;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 0 2.5rem 0;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.cta-primary {
  background: #2563eb;
  color: #ffffff;
  border: 1px solid #2563eb;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
}

.cta-primary:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
}

.cta-arrow {
  width: 1.125rem;
  height: 1.125rem;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 1.5rem 4rem;
  }
  
  .hero-ctas {
    width: 100%;
    max-width: 280px;
  }
  
  .cta-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
