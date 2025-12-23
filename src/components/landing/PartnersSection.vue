<script setup lang="ts">
</script>

<template>
  <section class="partners-section">
    <div class="partners-container">
      <p class="partners-title">{{ $t('home.partnersTitle') }}</p>
      <div class="partners-logos">
        <div class="partner-logo">
          <img src="/images/linnaeus-logo.png" alt="Linnæus University" />
        </div>
        <div class="partner-logo">
          <img src="/images/kulturparken-logo.png" alt="Kultur Parken Småland" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners-section {
  background: #f8fafc;
  padding: 4rem 2rem;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.partners-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.partners-title {
  font-size: 0.9375rem;
  color: #64748b;
  margin: 0 0 2rem 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
}

.partners-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  flex-wrap: wrap;
}

.partner-logo {
  opacity: 0.5;
  transition: all 0.3s ease;
  filter: grayscale(1);
}

.partner-logo:hover {
  opacity: 1;
  filter: grayscale(0);
}

.partner-logo img {
  height: 48px;
  width: auto;
}

@media (max-width: 640px) {
  .partners-logos {
    gap: 3rem;
  }
  
  .partner-logo img {
    height: 36px;
  }
}
</style>
