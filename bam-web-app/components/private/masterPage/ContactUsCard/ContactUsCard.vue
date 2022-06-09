<template>
  <div class="box">
    <h4 class="header-text contact-text">{{ $t('contact-us-header') }}</h4>
    <ContactUsItem
      :contact-type="$t('representative-title')"
      v-bind="representativeContact"
    ></ContactUsItem>
    <ContactUsItem
      v-if="showOperationalContact"
      :contact-type="$t('operational-contact')"
      v-bind="operationalContact"
    ></ContactUsItem>
    <ContactUsItem
      v-if="showTechnicalContact"
      :contact-type="$t('technical-contact')"
      v-bind="technicalContact"
    ></ContactUsItem>
  </div>
</template>

<script>
import ContactUsItem from './ContactUsItem'
export default {
  components: {
    ContactUsItem
  },
  props: {
    representativeEmail: {
      type: String,
      default: 'jwaltonmedia+admin@gmail.com' // TODO: confirm that we're setting a default representative when users are created.  Setting fallback here for now.
    },
    operationalEmail: {
      type: String,
      default: ''
    },
    technicalEmail: {
      type: String,
      default: ''
    },
    isViewContract: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      representativeContact: undefined,
      operationalContact: undefined,
      technicalContact: undefined
    }
  },
  computed: {
    header() {
      return this.$t('contact-us-header')
    },
    showOperationalContact() {
      return (
        this.isViewContract && this.operationalEmail && this.operationalContact
      )
    },
    showTechnicalContact() {
      return this.isViewContract && this.technicalEmail && this.technicalContact
    }
  },
  watch: {
    async representativeEmail(email) {
      this.representativeContact = await this.getContactDetail(email)
    },
    async operationalEmail(email) {
      this.operationalContact = await this.getContactDetail(email)
    },
    async technicalEmail(email) {
      this.technicalContact = await this.getContactDetail(email)
    }
  },
  async mounted() {
    this.representativeContact = await this.getContactDetail(
      this.$props.representativeEmail
    )
  },
  methods: {
    async getContactDetail(contactEmail) {
      try {
        const encodedQuery = encodeURIComponent(contactEmail)

        const {
          data: {
            data: { phone_number: phoneNumber, ...contactDetail }
          }
        } = await this.$axios.get(`/user/search?email=${encodedQuery}`)

        return { ...contactDetail, phoneNumber }
      } catch (error) {
        return error
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';

.box {
  border-radius: 0;
  box-shadow: 0 4px 12px $color-card-box-shadow;
  padding: 0;
  width: 288px;
  margin-bottom: 0px;
}

.header-text {
  text-transform: capitalize;
  border-bottom: none;
  padding: 24px;
  padding-bottom: 0;
}

.contact-text {
  font-family: 'Open Sans';
  color: $color-contact-card-text;
}
</style>
