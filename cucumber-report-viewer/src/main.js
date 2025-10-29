import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';

// Initialize theme BEFORE creating the app
function initializeTheme() {
  // Detect system preference
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Load user preference from localStorage
  const savedPreference = localStorage.getItem('theme-preference') || 'system';
  
  // Determine if should be dark
  let shouldBeDark = false;
  if (savedPreference === 'dark') {
    shouldBeDark = true;
  } else if (savedPreference === 'light') {
    shouldBeDark = false;
  } else { // system
    shouldBeDark = systemPrefersDark;
  }
  
  // Apply theme to document immediately
  if (shouldBeDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-theme');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('dark-theme');
  }
  
  // Set Vuetify theme
  vuetify.theme.global.name.value = shouldBeDark ? 'dark' : 'light';
  
  return { shouldBeDark, savedPreference, systemPrefersDark };
}

// Initialize theme before app creation
const themeState = initializeTheme();

const app = createApp(App);
app.use(router);
app.use(store);
app.use(vuetify);

// Set initial theme state in store
store.commit('theme/SET_THEME', themeState.shouldBeDark);
store.commit('theme/SET_USER_PREFERENCE', themeState.savedPreference);
store.commit('theme/SET_SYSTEM_PREFERENCE', themeState.systemPrefersDark);

// Initialize theme system (for listeners and watchers)
store.dispatch('theme/initializeTheme');

// Watch for theme changes and update Vuetify
store.watch(
  (state) => state.theme.isDark,
  (isDark) => {
    vuetify.theme.global.name.value = isDark ? 'dark' : 'light';
    
    // Update document attributes
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-theme');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.classList.remove('dark-theme');
    }
  },
  { immediate: true }
);

// Mount the app
app.mount('#app');

// Dynamic Meta Tags for Link Previews
window.updateMetaTags = function(reportData) {
  if (!reportData) return;
  
  const title = `GeoCall Test Report - ${reportData.name || 'Automation Results'}`;
  const description = `Test Results: ${reportData.passed || 0} passed, ${reportData.failed || 0} failed, ${reportData.skipped || 0} skipped. Duration: ${reportData.duration || 'N/A'}`;
  
  // Update document title
  document.title = title;
  
  // Update meta tags
  updateMetaTag('og:title', title);
  updateMetaTag('twitter:title', title);
  updateMetaTag('og:description', description);
  updateMetaTag('twitter:description', description);
  
  // Update with specific report stats
  const statsDescription = `📊 ${reportData.passed || 0} Passed • ❌ ${reportData.failed || 0} Failed • ⏭️ ${reportData.skipped || 0} Skipped • ⏱️ ${reportData.duration || 'N/A'}`;
  updateMetaTag('description', statsDescription);
};

function updateMetaTag(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`) || 
             document.querySelector(`meta[name="${property}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    if (property.startsWith('og:') || property.startsWith('twitter:')) {
      meta.setAttribute('property', property);
    } else {
      meta.setAttribute('name', property);
    }
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}