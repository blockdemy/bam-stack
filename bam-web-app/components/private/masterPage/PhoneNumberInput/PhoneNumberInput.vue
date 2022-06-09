<template>
  <div class="phone-container column">
    <div
      :class="[
        {
          'error-margin': !hasErr,
          'horizontal-form-item': isFormHorizontal
        }
      ]"
    >
      <div class="label-container">
        <label :class="[{ 'disabled-label': disabled }, labelClass]">{{
          $t('label-country-code')
        }}</label>
        <label v-if="required" class="label small required">
          {{ $t('label-required') }}
        </label>
      </div>
      <div class="label-container-phone">
        <label
          :class="[{ 'disabled-label': disabled }, labelClass]"
          class="label-phone"
          >{{ $t('label-phone') }}</label
        >
      </div>
      <no-ssr>
        <div>
          <vue-tel-input
            v-model="phone"
            :default-country="defaultCountry"
            :input-classes="{
              'error-border': hasErr,
              'horizontal-form-item-input': isFormHorizontal
            }"
            v-bind="bindProps"
            :input-options="{ showDialCode: true, tabindex: 0 }"
            :disabled="disabled"
            @input="change"
            @blur="blur"
            class="has-danger"
          />
        </div>
      </no-ssr>
      <p v-if="hasErr" class="help error-message">{{ errMessage }}</p>
    </div>
    <span v-if="hasErr" class="error-icon">
      <Icon icon-name="error" />
    </span>
  </div>
</template>

<script>
import Icon from '~/components/private/masterPage/Icon/Icon'
export default {
  components: {
    Icon
  },
  props: {
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelClass: {
      type: String,
      default: 'label'
    },
    required: {
      type: Boolean,
      default: false
    },
    defaultProp: {
      type: String,
      default: 'US'
    },
    preferredProp: {
      type: Array,
      default: () => ['MX', 'US']
    },
    defaultCountry: {
      type: String,
      default: 'MX'
    },
    isFormHorizontal: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    const insideHasError = this.$props.hasError
    const insideHasErrorMsg = this.$props.errorMessage
    const defaultProp = this.$props.defaultProp
    const preferredProp = this.$props.preferredProp
    const phone = this.$props.value

    return {
      insideHasError,
      insideHasErrorMsg,
      phone,
      isDirty: false,
      temp: {
        value: '',
        country: '',
        isValid: false
      },
      bindProps: {
        defaultCountry: defaultProp,
        preferredCountries: preferredProp,
        placeholder: '',
        validCharactersOnly: true
      }
    }
  },
  computed: {
    hasErr() {
      return this.hasError || this.insideHasError
    },
    errMessage() {
      return this.errorMessage || this.insideHasErrorMsg
    }
  },
  methods: {
    change(value, { country, isValid }) {
      this.temp = { value, country, isValid }
    },
    blur() {
      const { value, country, isValid } = this.temp
      this.checkValue(value, country, isValid)
    },
    checkValue(value, country, isValid) {
      const hasCountryChanged = value.slice(1) === country.dialCode
      if (hasCountryChanged) return

      this.isDirty = true
      const strValue = value.replace(/\s/g, '')
      this.insideHasError = this.required && !isValid
      if (this.insideHasError) {
        this.insideHasErrorMsg = ''
      } else {
        this.$emit('change', strValue)
      }
    }
  }
}
</script>

<style lang="scss">
@import 'vue-tel-input/dist/vue-tel-input.css';
@import '~assets/styles/colors';
@mixin input-field {
  color: $color-input-text;
  background-color: $color-input-field;
  border-color: $color-input-field;
  border: 1px solid transparent;
  border-radius: 2px;
}
.vue-tel-input[data-v-2d80c464] {
  border: 0 transparent;
  height: 40px;
  position: relative;

  &:focus-within {
    outline: none;
    box-shadow: none;
  }
  .dropdown {
    @include input-field;
    min-width: 72px;
    padding: 10px;
    &:focus-within {
      outline: none;
      box-shadow: none;
    }
  }
  .selection[data-v-2d80c464] {
    justify-content: space-between;
  }
  ul[data-v-2d80c464] {
    top: 40px;
    font-weight: normal;
    background-color: $color-input-background;
    box-shadow: 0px 2px 8px $color-input-shadow;
    color: $color-input-text;
    border: 0;
    width: 385px;
    .dropdown-item {
      border-bottom: solid 1px $color-dropdown-divider;
      font-weight: normal;
      span[data-v-2d80c464] {
        padding-left: 10px;
      }
    }
    .last-preferred {
      border-bottom: solid 1px $color-dropdown-preferred;
    }
    li {
      padding: 15px 10px;
      font-size: 1.2rem;
      letter-spacing: 0.01em;
    }
    strong {
      color: $color-input-text;
      font-weight: normal;
    }
  }
  .error-border {
    border-color: $color-error !important;
  }
  .dropdown-arrow[data-v-2d80c464] {
    visibility: hidden;
    position: absolute;
    right: 9px;
    top: 9px;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    &::after {
      content: '';
      visibility: visible;
      position: absolute;
      top: 5px;
      right: 3px;
      width: 10px;
      height: 10px;
      background-image: url('../../assets/icons/down-chevron.svg');
    }
  }
  .horizontal-form-item-input {
    @include input-field;
    min-width: 190px !important;
  }
  input[type='tel'] {
    @include input-field;
    margin-left: 22px;
    padding-left: 8px;
    font-size: 1.2rem;
    &:focus {
      outline: none;
      box-shadow: none;
    }
    &::placeholder {
      color: $color-input-text-form;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '~assets/styles/colors';
.phone-container {
  width: 100%;
  position: relative;
  .error-margin {
    margin-bottom: 27.5px !important;
  }
  .error-message {
    height: 25px;
  }
  .field:not(:last-child) {
    margin-bottom: 0px;
  }
  .disabled-label {
    color: $color-input-disabled;
  }
  .error-icon {
    position: absolute;
    pointer-events: none;
    top: 31px;
    right: 8px;
    color: $color-error;
  }
  .label-container-phone {
    position: relative;
    .label-phone {
      position: absolute;
      top: -20px;
      left: 94px;
    }
  }
}
.horizontal-form-item {
  min-width: 295px;
  margin: 15px;
  display: flex;
  flex-direction: column;
}
</style>
