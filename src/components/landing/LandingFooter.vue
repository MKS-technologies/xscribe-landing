<script setup lang="ts">
</script>

<template>
  <footer class="landing-footer">
    <div class="footer-container">
      <div class="footer-brand">
        <span class="brand-name">xScribe</span>
        <span class="brand-suffix">Labs.</span>
      </div>
      <p class="footer-copyright">{{ $t('home.footerText') }}</p>
    </div>
  </footer>
</template>

<style scoped>
.landing-footer {
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 2.5rem 2rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-brand {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}

.brand-suffix {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2563eb;
  font-style: italic;
}

.footer-copyright {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

@media (max-width: 640px) {
  .footer-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
