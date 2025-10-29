// URL Service for creating shorter, cleaner URLs
class UrlService {
  constructor() {
    this.urlMap = new Map();
    this.reverseMap = new Map();
    this.counter = 1000; // Start from 1000 for cleaner IDs
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
    
    return shortId;
  }

  // Get the original long ID from a short ID
  getLongId(shortId) {
    return this.reverseMap.get(shortId) || shortId;
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