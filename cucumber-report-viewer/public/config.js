// Configuration for GeoCall Test Reports
window.GeoCallConfig = {
    // Base URLs
    baseUrl: 'https://srisri-t.github.io/AutomationTestResults/',
    shortUrl: 'geocall.test', // Replace with your custom domain when available
    
    // Branding
    appName: 'GeoCall Test Reports',
    tagline: 'Professional Testing Platform',
    
    // Social sharing
    shareText: 'Check out our professional test report viewer!',
    
    // URL helpers
    getShareableUrl: function(reportId) {
        if (reportId) {
            return this.baseUrl + '#/report/' + reportId;
        }
        return this.baseUrl;
    },
    
    getShortUrl: function(reportId) {
        // This would work with a custom domain and URL shortener
        if (this.shortUrl !== 'geocall.test') {
            return 'https://' + this.shortUrl + (reportId ? '/' + reportId : '');
        }
        return this.getShareableUrl(reportId);
    }
};

// Helper function to copy short URL to clipboard
window.copyShortUrl = function(reportId) {
    const url = window.GeoCallConfig.getShortUrl(reportId);
    navigator.clipboard.writeText(url).then(function() {
        console.log('URL copied to clipboard:', url);
        // You can add a toast notification here
    }).catch(function(err) {
        console.error('Failed to copy URL:', err);
    });
};