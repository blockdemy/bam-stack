export default function access() {
  return {
    publicUser: false,
    privateUser: false,
    adminUser: false,
    public() {
      this.publicUser = true
      return this
    },
    private() {
      this.privateUser = true
      return this
    },
    admin() {
      this.adminUser = true
      return this
    }
  }
}
