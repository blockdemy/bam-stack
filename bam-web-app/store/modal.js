export const state = () => ({
  params: {},
  modalName: null
})

export const mutations = {
  show(state, { modalName, params }) {
    state.modalName = modalName
    state.params = params || {}
  },
  hide(state) {
    state.modalName = null
    state.params = {}
  }
}
