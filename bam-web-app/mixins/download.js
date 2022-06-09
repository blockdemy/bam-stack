export default {
  methods: {
    downloadFile(fileContent, filename) {
      const a = document.createElement('a')
      a.style.display = 'none'
      document.body.appendChild(a)
      a.href = window.URL.createObjectURL(fileContent)
      a.setAttribute('download', filename)
      a.click()
      document.body.removeChild(a)
    },
    async download(dataURL, filename) {
      const data = await this.$axios.$get(dataURL, {
        responseType: 'blob'
      })

      this.downloadFile(data, filename)
    },
    async downloadZip(dataUrl, filename) {
      const {
        data: { url }
      } = await this.$axios.$get(dataUrl)
      const data = await this.$axios.$get(url, {
        responseType: 'blob',
        data: { isS3Source: true }
      })

      this.downloadFile(data, filename)
    }
  }
}
