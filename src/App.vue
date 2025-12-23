<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

// Landing Components
import LandingNavbar from './components/landing/LandingNavbar.vue'
import HeroSection from './components/landing/HeroSection.vue'
import FeaturesSection from './components/landing/FeaturesSection.vue'
import StatsSection from './components/landing/StatsSection.vue'
import PartnersSection from './components/landing/PartnersSection.vue'

import LandingFooter from './components/landing/LandingFooter.vue'

const { t } = useI18n()

// SEO
useHead({
  title: t('home.seoTitle'),
  meta: [
    { name: 'description', content: t('home.seoDescription') },
    { name: 'keywords', content: t('home.seoKeywords') },
  ],
})
</script>

<template>
  <div class="landing-app">
    <LandingNavbar />
    <main>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <PartnersSection />

    </main>
    <LandingFooter />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Reset */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;
  color: #0f172a;
}

.landing-app {
  min-height: 100vh;
}

a {
  text-decoration: none;
}

button {
  font-family: inherit;
}
</style>
