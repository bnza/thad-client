export default {
  props: {
    media: {
      type: Object,
      required: true
    }
  },
  computed: {
    filename() {
      return this.media.mediaObject.contentUrl.match(/\/([^/]+)$/)[0]
    },
    thumbFilename() {
      return this.media.mediaObject.contentUrl.replace(/\.(\w+)/, '.thumb.jpeg')
    },
    originalFilename() {
      return this.filename.substring(66)
    },
    hasThumbnail() {
      return ['image/jpeg'].includes(this.media.mediaObject.mimeType)
    },
    documentThumbnail() {
      return this.$config.appRouterBase.slice(-1) === '/'
        ? `${this.$config.appRouterBase}file-document-outline.svg`
        : `${this.$config.appRouterBase}/file-document-outline.svg`
    },
    thumbnailUrl() {
      return this.hasThumbnail ? `${this.$config.apiBaseUrl}${this.thumbFilename}` : this.documentThumbnail
    },
    previewMediaUrl() {
      return this.hasThumbnail ? this.mediaUrl : this.documentThumbnail;
    },
    mediaUrl() {
      return `${this.$config.apiBaseUrl}${this.media.mediaObject.contentUrl}`
    }
  }
}
