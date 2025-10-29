<template>
    <div class="share-container">
        <div class="share-buttons">
            <button @click="copyCleanLink" class="share-btn" :class="{ 'copied': copied }">
                <i class="fas fa-share-alt"></i>
                {{ copied ? 'Copied!' : getButtonText() }}
            </button>

            <button @click="togglePreview" class="preview-btn" :class="{ 'active': showPreview }">
                <i class="fas fa-eye"></i>
            </button>
        </div>

        <!-- Hidden input for copying -->
        <input ref="hiddenInput" :value="cleanShareText" style="position: absolute; left: -9999px; opacity: 0;"
            readonly />

        <!-- Display what will be copied -->
        <div class="preview-text" v-if="showPreview">
            <small>Will copy:</small>
            <div class="clean-text" :class="{ 'multiline': shareMode === 'team' }">{{ cleanShareText }}</div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'CustomShareButton',
    props: {
        reportTitle: {
            type: String,
            default: 'Automation Test Results Viewer'
        },
        reportId: {
            type: String,
            default: ''
        },
        shareMode: {
            type: String,
            default: 'team', // 'text', 'url', or 'team'
            validator: value => ['text', 'url', 'team', 'markdown'].includes(value)
        }
    },
    setup(props) {
        const copied = ref(false);
        const showPreview = ref(false);
        const hiddenInput = ref(null);

        // Create clean share content based on mode
        const cleanShareText = computed(() => {
            const baseUrl = window.location.origin + window.location.pathname;
            const fullUrl = `${baseUrl}#/report/${props.reportId}`;
            const reportName = props.reportId ? formatReportName(props.reportId) : props.reportTitle;

            switch (props.shareMode) {
                case 'url':
                    // Just the raw URL
                    return fullUrl;

                case 'text':
                    // Just clean text, no URL
                    return `${reportName} - Professional Test Results`;

                case 'markdown':
                    // Markdown format: [Text](URL)
                    return `[${reportName} Test Results](${fullUrl})`;

                case 'team':
                default:
                    // Team-friendly format with both clean text and URL
                    return `🧪 ${reportName} Test Results\n\n✅ Latest build ready for review\n🔗 ${fullUrl}\n\n#testing #automation #qa`;
            }
        });

        // Format report ID into readable name
        const formatReportName = (reportId) => {
            return reportId
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
                .replace(/test|scenarios?|page/gi, '')
                .trim()
                .replace(/\s+/g, ' ') || 'Test Report';
        };

        const copyCleanLink = async () => {
            try {
                const textToCopy = cleanShareText.value;

                // Try modern clipboard API first
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    // Fallback for older browsers
                    hiddenInput.value.value = textToCopy;
                    hiddenInput.value.select();
                    document.execCommand('copy');
                }

                copied.value = true;
                setTimeout(() => {
                    copied.value = false;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        };

        const togglePreview = () => {
            showPreview.value = !showPreview.value;
        };

        const getButtonText = () => {
            switch (props.shareMode) {
                case 'url': return 'Copy Link';
                case 'text': return 'Copy Text';
                case 'markdown': return 'Copy Markdown';
                case 'team': return 'Share with Team';
                default: return 'Copy';
            }
        };

        return {
            copied,
            showPreview,
            hiddenInput,
            cleanShareText,
            copyCleanLink,
            togglePreview,
            getButtonText
        };
    }
};
</script>

<style scoped>
.share-container {
    position: relative;
    display: inline-block;
}

.share-buttons {
    display: flex;
    gap: 8px;
    align-items: center;
}

.share-btn {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.share-btn:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
}

.share-btn.copied {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.preview-btn {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    border: 1px solid rgba(59, 130, 246, 0.3);
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
}

.preview-btn:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.5);
}

.preview-btn.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.preview-text {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
}

.clean-text {
    font-weight: 600;
    margin-top: 4px;
}

.clean-text.multiline {
    white-space: pre-line;
    max-width: 300px;
    word-wrap: break-word;
}

/* Dark theme support */
[data-theme="dark"] .share-btn {
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
}

[data-theme="dark"] .share-btn:hover {
    background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%);
}
</style>