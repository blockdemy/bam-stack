// This code will be injected before initializing the root App
import Vue from 'vue'
import VueTelInput from 'vue-tel-input'

Vue.component('vue-tel-input', VueTelInput)

// Activate plugin
Vue.use(VueTelInput)

export default VueTelInput
