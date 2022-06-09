<template>
  <div class="contact-item">
    <div class="contact-name">
      <Avatar :initials="representativeInitials" :size="48" :font-size="14" />
      <div class="contact-name-container">
        <h4 class="name contact-text">{{ representativeName }}</h4>
        <p class="contact-text small">{{ contactType }}</p>
      </div>
    </div>
    <div class="contact-methods">
      <div class="method-container">
        <p class="contact-icon">
          <Icon :size="12" icon-name="call" />
        </p>
        <p class="contact-text small">{{ phoneNumber }}</p>
      </div>
      <div class="method-container">
        <p class="contact-icon">
          <Icon :size="12" icon-name="email" />
        </p>
        <p class="contact-text small">{{ email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/private/masterPage/Icon/Icon'
import Avatar from '~/components/private/masterPage/Avatar/Avatar'
import { toTitleCase } from '~/utils/strings'
export default {
  components: {
    Icon,
    Avatar
  },
  props: {
    contactType: {
      type: String,
      default: ''
    },
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    phoneNumber: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    }
  },
  computed: {
    representativeInitials() {
      return this.firstName.charAt(0) + this.lastName.charAt(0)
    },
    representativeName() {
      const fullName = `${this.firstName} ${this.lastName}`
      return this.toTitleCase(fullName)
    }
  },
  methods: {
    toTitleCase
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';

.contact-item {
  padding: 24px 24px 32px;
  &:not(:last-of-type) {
    padding-bottom: 31px;
    border-bottom: 1px solid $_gray6;
  }
}

.contact-name {
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.contact-name-container {
  display: grid;
  margin-left: 24px;

  .name {
    font-size: 1.4rem;
    padding-bottom: 0px;
    font-weight: 600;
    border: none;
  }
}

.contact-text {
  font-family: 'Open Sans';
  color: $color-contact-card-text;
}

.contact-methods {
  display: grid;
  grid-row-gap: 10px;

  .method-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    .contact-icon {
      color: $color-contact-card-icon;
      padding-right: 16px;
    }
  }
}
</style>
