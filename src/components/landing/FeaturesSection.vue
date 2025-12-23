<script setup lang="ts">
const features = [
  {
    icon: 'upload',
    titleKey: 'home.feature1Title',
    descKey: 'home.feature1Description'
  },
  {
    icon: 'edit',
    titleKey: 'home.feature2Title',
    descKey: 'home.feature2Description'
  },
  {
    icon: 'ai',
    titleKey: 'home.feature3Title',
    descKey: 'home.feature3Description'
  },
  {
    icon: 'search',
    titleKey: 'home.feature4Title',
    descKey: 'home.feature4Description'
  }
]
</script>

<template>
  <section class="features-section">
    <div class="features-container">
      <h2 class="features-title">{{ $t('home.featuresTitle') }}</h2>
      <p class="features-subtitle">{{ $t('home.featuresSubtitle') }}</p>

      <div class="features-grid">
        <div v-for="feature in features" :key="feature.icon" class="feature-card">
          <div class="feature-icon">
            <!-- Upload Icon -->
            <svg v-if="feature.icon === 'upload'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M12,11L8,15H10.5V18H13.5V15H16L12,11Z" />
            </svg>
            <!-- Edit Icon -->
            <svg v-else-if="feature.icon === 'edit'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04Z" />
            </svg>
            <!-- AI Icon -->
            <svg v-else-if="feature.icon === 'ai'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z" />
            </svg>
            <!-- Search Icon -->
            <svg v-else-if="feature.icon === 'search'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
          </div>
          <h3 class="feature-title">{{ $t(feature.titleKey) }}</h3>
          <p class="feature-description">{{ $t(feature.descKey) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  background: #ffffff;
  padding: 6rem 2rem;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  color: #0f172a;
  text-align: center;
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
}

.features-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem auto;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feature-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: #3b82f6;
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.1);
}

.feature-icon {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.feature-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: #ffffff;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
}

.feature-description {
  font-size: 0.9375rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .features-section {
    padding: 4rem 1.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
