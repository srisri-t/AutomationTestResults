<template>
  <v-app :theme="currentTheme">
    <div id="app" :class="{ 'dark-theme': isDark }">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  
  computed: {
    ...mapGetters('theme', ['isDark', 'currentTheme'])
  },
  
  watch: {
    isDark: {
      handler(newVal) {
        // Ensure body class is updated
        if (newVal) {
          document.body.classList.add('dark-theme');
        } else {
          document.body.classList.remove('dark-theme');
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
@import './styles/vuetify.scss';

#app {
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

// Let Vuetify handle the theme colors
.v-application {
  font-family: inherit !important;
}

// Theme-aware scrollbar
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--theme-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--theme-text-secondary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--theme-text-primary);
}

[data-theme="dark"] ::-webkit-scrollbar-track {
  background: var(--theme-surface-variant);
}

[data-theme="dark"] ::-webkit-scrollbar-thumb {
  background: var(--theme-text-secondary);
}

[data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
  background: var(--theme-text-primary);
}

/* Global Mobile Responsive Styles */
@media (max-width: 768px) {
  #app {
    font-size: 14px;
  }

  /* Ensure proper touch targets */
  .v-btn {
    min-height: 44px;
    min-width: 44px;
  }

  /* Improve text readability on mobile */
  .v-card-title {
    font-size: 16px !important;
    line-height: 1.3 !important;
  }

  .v-card-subtitle {
    font-size: 13px !important;
  }

  .v-card-text {
    font-size: 14px !important;
    line-height: 1.4 !important;
  }

  /* Better spacing for mobile */
  .v-expansion-panel-title {
    padding: 12px 16px !important;
    font-size: 14px !important;
  }

  .v-expansion-panel-text {
    padding: 8px 16px 16px 16px !important;
  }

  /* Improve form elements on mobile */
  .v-text-field .v-field__input {
    font-size: 16px !important; /* Prevents zoom on iOS */
    padding: 8px 12px !important;
  }

  .v-select .v-field__input {
    font-size: 16px !important;
    padding: 8px 12px !important;
  }

  /* Better chip sizing */
  .v-chip {
    font-size: 12px !important;
    height: 24px !important;
  }

  /* Improve icon sizing */
  .v-icon {
    font-size: 18px !important;
  }

  /* Better progress bar visibility */
  .v-progress-linear {
    height: 6px !important;
  }
}

@media (max-width: 480px) {
  #app {
    font-size: 13px;
  }

  .v-card-title {
    font-size: 15px !important;
  }

  .v-card-subtitle {
    font-size: 12px !important;
  }

  .v-card-text {
    font-size: 13px !important;
  }

  .v-expansion-panel-title {
    padding: 10px 12px !important;
    font-size: 13px !important;
  }

  .v-expansion-panel-text {
    padding: 6px 12px 12px 12px !important;
  }

  .v-chip {
    font-size: 11px !important;
    height: 22px !important;
  }

  .v-icon {
    font-size: 16px !important;
  }
}

/* Touch-friendly improvements */
@media (hover: none) and (pointer: coarse) {
  /* Larger touch targets */
  .v-btn {
    min-height: 48px;
    min-width: 48px;
  }

  /* Better spacing for touch */
  .v-list-item {
    min-height: 48px !important;
  }

  /* Prevent text selection on touch */
  .v-expansion-panel-title {
    -webkit-user-select: none;
    user-select: none;
  }
}
</style>