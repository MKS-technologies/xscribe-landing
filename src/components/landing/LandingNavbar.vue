<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const APP_URL = 'https://app.xscribe.tech'

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'sv' : 'en'
}
</script>

<template>
  <nav class="landing-navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-brand">
        <span class="brand-name">xScribe</span>
        <span class="brand-suffix">Labs.</span>
      </div>

      <!-- Nav Actions -->
      <div class="navbar-actions">
        <button @click="toggleLanguage" class="lang-btn">
          {{ locale === 'en' ? 'SV' : 'EN' }}
        </button>
        <a :href="APP_URL" class="nav-btn nav-btn-primary">
          {{ $t('home.goToApp') }}
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.landing-navbar {
  position: fixed;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  
  /* Dynamic width - max 600px, shrinks on smaller screens */
  width: calc(100% - 2rem);
  max-width: 600px;
  
  padding: 0.75rem 1.5rem;
  
  /* Liquid Glass Effect - more transparent */
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  
  /* Rounded pill shape */
  border-radius: 9999px;
  
  /* Subtle border with inner glow effect */
  border: 1px solid rgba(255, 255, 255, 0.4);
  
  /* Layered shadows for depth like liquid glass */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04),
    inset 0 1px 1px rgba(255, 255, 255, 0.6);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.brand-suffix {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
  font-style: italic;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-btn {
  /* Glass button */
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #475569;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.6);
  color: #1e293b;
}

.nav-btn {
  padding: 0.625rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-btn-primary {
  background: #2563eb;
  color: #ffffff;
  border: 1px solid #2563eb;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
}

.nav-btn-primary:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

@media (max-width: 640px) {
  .landing-navbar {
    top: 1rem;
    padding: 0.625rem 1rem;
  }
  
  .brand-name,
  .brand-suffix {
    font-size: 1.25rem;
  }
  
  .lang-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
  
  .nav-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
  }
}

/* Fallback for browsers that don't support backdrop-filter */
@supports not (backdrop-filter: blur(20px)) {
  .landing-navbar {
    background: rgba(255, 255, 255, 0.95);
  }
}
</style>
