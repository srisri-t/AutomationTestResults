<template>
  <div class="home">
    <LandingPage @file-uploaded="onFileUploaded" />
  </div>
</template>

<script>
import LandingPage from '@/components/LandingPage.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import parseCucumberJson from '@/utils/parseCucumberJson';
import UrlService from '@/services/UrlService.js';

export default {
  components: {
    LandingPage
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const onFileUploaded = (fileData) => {
      const parsed = parseCucumberJson(fileData);
      console.log('Parsed Cucumber JSON:', parsed); // Debug log
      
      // Generate a short, clean ID for this report
      const timestamp = Date.now();
      const reportName = parsed.name || 'uploaded-report';
      const longId = `${reportName}-${timestamp}`;
      const shortId = UrlService.generateShortId(longId);
      
      // Store with the long ID for retrieval
      parsed._uploadedId = longId;
      store.commit('setReportData', parsed);
      
      // Navigate using the short ID
      router.push(`/r/${shortId}`);
    };
    return { onFileUploaded };
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>