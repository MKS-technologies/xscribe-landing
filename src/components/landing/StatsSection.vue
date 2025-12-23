<script setup lang="ts">
const stats = [
  { valueKey: 'home.stat1Value', labelKey: 'home.stat1Label' },
  { valueKey: 'home.stat2Value', labelKey: 'home.stat2Label' },
  { valueKey: 'home.stat3Value', labelKey: 'home.stat3Label' }
]
</script>

<template>
  <section class="stats-section">
    <div class="stats-container">
      <div class="stats-content">
        <h2 class="stats-title">{{ $t('home.aboutTitle') }}</h2>
        <p class="stats-description">{{ $t('home.aboutDescription') }}</p>
      </div>
      
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.valueKey" class="stat-item">
          <div class="stat-value">{{ $t(stat.valueKey) }}</div>
          <div class="stat-label">{{ $t(stat.labelKey) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  background: #ffffff;
  padding: 6rem 2rem;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.stats-content {
  max-width: 500px;
}

.stats-title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.02em;
}

.stats-description {
  font-size: 1.0625rem;
  color: #64748b;
  line-height: 1.7;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .stats-content {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .stats-section {
    padding: 4rem 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
