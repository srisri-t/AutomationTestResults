// URL Service for creating shorter, cleaner URLs
class UrlService {
  constructor() {
    this.urlMap = new Map();
    this.reverseMap = new Map();
    this.counter = 1000; // Start from 1000 for cleaner IDs
    this.loadMappings();
  }

  // Load mappings from localStorage
  loadMappings() {
    try {
      const savedMappings = localStorage.getItem('url-mappings');
      if (savedMappings) {
        const data = JSON.parse(savedMappings);
        this.urlMap = new Map(data.urlMap || []);
        this.reverseMap = new Map(data.reverseMap || []);
        this.counter = data.counter || 1000;
      }
    } catch (e) {
      console.warn('Failed to load URL mappings:', e);
    }
  }

  // Save mappings to localStorage
  saveMappings() {
    try {
      const data = {
        urlMap: Array.from(this.urlMap.entries()),
        reverseMap: Array.from(this.reverseMap.entries()),
        counter: this.counter
      };
      localStorage.setItem('url-mappings', JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save URL mappings:', e);
    }
  }

  // Generate a short ID from a long report identifier
  generateShortId(longId) {
    // Check if we already have a short ID for this long ID
    if (this.urlMap.has(longId)) {
      return this.urlMap.get(longId);
    }

    // Create a short, readable ID
    const shortId = this.createReadableId(longId);
    
    // Store the mapping
    this.urlMap.set(longId, shortId);
    this.reverseMap.set(shortId, longId);
    
    // Persist to localStorage
    this.saveMappings();
    
    return shortId;
  }

  // Get the original long ID from a short ID
  getLongId(shortId) {
    // First check our mapping
    if (this.reverseMap.has(shortId)) {
      return this.reverseMap.get(shortId);
    }
    
    // If no mapping exists, this might be a direct short ID
    // Try to find it in existing reports or return as-is
    return shortId;
  }

  // Try to resolve a report ID by checking various sources
  async resolveReportId(id) {
    // If it's already a long ID, return it
    if (id.length > 10) {
      return id;
    }
    
    // Check if we have a mapping for this short ID
    const longId = this.getLongId(id);
    if (longId !== id) {
      return longId;
    }
    
    // If no mapping exists, try to find matching reports
    // This is a fallback for existing reports that weren't mapped
    try {
      // Check localStorage for uploaded reports
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('uploaded-report-')) {
          const reportId = key.replace('uploaded-report-', '');
          const shortId = this.generateShortId(reportId);
          if (shortId === id) {
            return reportId;
          }
        }
      }
    } catch (e) {
      console.warn('Error resolving report ID:', e);
    }
    
    return id;
  }

  // Create a readable short ID
  createReadableId(longId) {
    // Extract meaningful parts from the long ID
    const parts = longId.split('-');
    const meaningful = [];

    for (const part of parts) {
      if (part.length > 2 && !part.match(/^\d+$/)) {
        // Take first few characters of meaningful words
        meaningful.push(part.substring(0, 3).toLowerCase());
      }
    }

    // If we have meaningful parts, use them
    if (meaningful.length > 0) {
      const base = meaningful.slice(0, 3).join('');
      return base + this.counter++;
    }

    // Fallback to simple counter
    return 'test' + this.counter++;
  }

  // Generate a shareable URL
  generateShareableUrl(reportId, baseUrl = window.location.origin) {
    const shortId = this.generateShortId(reportId);
    return `${baseUrl}/#/r/${shortId}`;
  }

  // Extract report info for cleaner display
  getReportDisplayInfo(reportId) {
    // Extract readable information from report ID
    const parts = reportId.split('-');
    
    // Look for common patterns
    const testType = parts.find(p => 
      p.toLowerCase().includes('test') || 
      p.toLowerCase().includes('scenario') ||
      p.toLowerCase().includes('feature')
    );
    
    const component = parts.find(p => 
      p.toLowerCase().includes('admin') ||
      p.toLowerCase().includes('client') ||
      p.toLowerCase().includes('page')
    );

    return {
      testType: testType || 'Test',
      component: component || 'Component',
      shortId: this.generateShortId(reportId)
    };
  }
}

// Create a singleton instance
const urlService = new UrlService();

export default urlService;