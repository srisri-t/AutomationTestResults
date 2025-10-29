<template>
  <div class="share-url-container">
    <div class="url-display">
      <div class="url-section">
        <label class="url-label">Share this report:</label>
        <div class="url-input-group">
          <input 
            ref="urlInput"
            :value="shareableUrl" 
            readonly 
            class="url-input"
            @click="selectAll"
          />
          <button 
            @click="copyToClipboard" 
            class="copy-btn"
            :class="{ 'copied': copied }"
          >
            <i class="fas fa-copy" v-if="!copied"></i>
            <i class="fas fa-check" v-else></i>
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
      </div>
      
      <div class="url-info">
        <small class="url-description">
          Clean, professional URL perfect for sharing with your team
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import UrlService from '@/services/UrlService.js';

export default {
  name: 'ShareUrl',
  props: {
    reportId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const urlInput = ref(null);
    const copied = ref(false);
    
    const shareableUrl = computed(() => {
      const baseUrl = window.location.origin + window.location.pathname;
      const shortId = UrlService.generateShortId(props.reportId);
      return `${baseUrl}#/r/${shortId}`;
    });
    
    const selectAll = () => {
      if (urlInput.value) {
        urlInput.value.select();
      }
    };
    
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(shareableUrl.value);
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        if (urlInput.value) {
          urlInput.value.select();
          document.execCommand('copy');
          copied.value = true;
          setTimeout(() => {
            copied.value = false;
          }, 2000);
        }
      }
    };
    
    return {
      urlInput,
      copied,
      shareableUrl,
      selectAll,
      copyToClipboard
    };
  }
};
</script>

<style scoped>
.share-url-container {
  margin: 20px 0;
  padding: 16px;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
}

.url-section {
  margin-bottom: 8px;
}

.url-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.url-input-group {
  display: flex;
  gap: 8px;
}

.url-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  background: white;
  color: #1f2937;
}

.url-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.copy-btn {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: #2563eb;
}

.copy-btn.copied {
  background: #10b981;
}

.url-description {
  color: #6b7280;
  font-size: 12px;
}

/* Dark theme support */
[data-theme="dark"] .url-label {
  color: #e5e7eb;
}

[data-theme="dark"] .url-input {
  background: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

[data-theme="dark"] .url-input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
}

[data-theme="dark"] .share-url-container {
  background: rgba(96, 165, 250, 0.1);
  border-color: rgba(96, 165, 250, 0.3);
}

[data-theme="dark"] .url-description {
  color: #9ca3af;
}
</style>