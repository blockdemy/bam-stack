<template>
  <div>
    <div class="column form-container">
      <h4 class="form-header">{{ $t('accounts-form-header') }}</h4>
      <hr class="form-header-line" />

      <div v-if="error" class="error-container">
        <p>
          <Icon :size="12" icon-name="error" />
          {{ error }}
        </p>
      </div>

      <div class="columns">
        <div class="column is-half">
          <div v-for="(item, index) in fieldsList" :key="index">
            <PhoneNumberInput
              v-if="item === 'phone_number'"
              :disabled="isDisabled(item)"
              v-bind="getFieldData(item)"
              @change="changeFieldByName(item, $event)"
              @keyup="changeField($event)"
              required
              name="phone_number"
            />
            <TextInput
              v-else-if="item === 'notes'"
              :label="$t(`label-notes`)"
              :maxlength="256"
              v-bind="getFieldData(item)"
              @keyup="setValue({ fieldName: item, value: $event.target.value })"
              name="notes"
              multiline
            />
            <div v-else-if="item === 'representative'">
              <AsyncDropdown
                v-if="!isAdminForm"
                :label="$t('label-account-representative')"
                :disabled="isDisabled(item)"
                :url="'/user/group/admins'"
                :display-key="'name'"
                :return-key="'email'"
                v-bind="getFieldData(item)"
                @change="value => setValue({ fieldName: item, value })"
              />
            </div>
            <TextInput
              v-else-if="isCompanyAdmin(item)"
              :label="$t(`label-${item}`)"
              :name="item"
              :value="$t('accounts-admin-company')"
              :disabled="true"
              v-bind="getFieldData(item)"
              required
              read-only
            />
            <TextInput
              v-else
              :key="index"
              :label="$t(`label-${item}`)"
              :name="item"
              :disabled="isDisabled(item)"
              v-bind="getFieldData(item)"
              @keyup="changeField($event)"
              required
            />
          </div>
        </div>
      </div>

      <div class="form-actions-container button-row">
        <Button
          button-type="route"
          button-route="accounts"
          button-style="secondary"
          >{{ $t('button-cancel') }}</Button
        >
        <Button
          :disabled="!isSubmitEnabled"
          @on-press="onSubmit"
          button-type="button"
          button-style="primary"
          >{{ $t('button-submit') }}</Button
        >
      </div>
    </div>
  </div>
</template>

<!--<script>
import { mapState } from 'vuex'
import { adminAccountFields, clientAccountFields } from './Fields'
import Icon from '~/components/private/masterPage/Icon/Icon'
import Button from '~/components/private/masterPage/Button/Button'
import AsyncDropdown from '~/components/private/masterPage/Dropdown/AsyncDropdown'
import TextInput from '~/components/private/masterPage/TextInput/TextInput'
import PhoneNumberInput from '~/components/private/masterPage/PhoneNumberInput/PhoneNumberInput'
import { createFormValidatorMixin } from '~/mixins/createFormValidatorMixin'
import { isEmailValid } from '~/utils/strings'
export default {
  components: {
    Icon,
    Button,
    AsyncDropdown,
    TextInput,
    PhoneNumberInput
  },
  mixins: [
    createFormValidatorMixin(
      self => {
        const fields = self.formFields.reduce((storage, next) => {
          storage[next.name] = next.value
          return storage
        }, {})
        if (self.user) {
          Object.keys(self.user).map(k => {
            if (fields.hasOwnProperty(k)) {
              fields[k] = self.user[k]
            }
          })
        }
        return fields
      },
      self => {
        return self.formFields.reduce((storage, next) => {
          storage[next.name] = {
            required: next.required,
            getError(value) {
              if (!value && next.required) {
                return self.$t('error-required')
              }
              if (next.name === 'email' && value && !self.isEmailValid(value)) {
                return self.$t('form-error-field-email-is-invalid')
              }
            }
          }
          return storage
        }, {})
      }
    )
  ],
  props: {
    user: {
      type: Object,
      default: () => null
    },
    setValue: {
      type: Function,
      required: true
    },
    onSubmit: {
      type: Function,
      required: true
    },
    isAdminForm: {
      type: Boolean,
      required: true,
      default: () => false
    },
    error: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      list: this.fields,
      dropdownSelection: '',
      dropdownItems: []
    }
  },
  computed: {
    ...mapState('account', ['values', 'isLoading']),
    fieldsList() {
      return Object.keys(this.fields)
    },
    formFields() {
      return this.$props.isAdminForm ? adminAccountFields : clientAccountFields
    },
    isSubmitEnabled() {
      const requiredKeys = this.formFields.filter(
        field => field.required === true
      )
      if (this.isLoading) {
        return false
      }
      return requiredKeys
        .filter(field => {
          if (this.isCompanyAdmin(field.name) || this.isRepAdmin(field.name)) {
            return false
          }
          return true
        })
        .every(field => this.values[field.name])
    }
  },
  methods: {
    isCompanyAdmin(field) {
      return field === 'company' && this.$props.isAdminForm
    },
    isRepAdmin(field) {
      return field === 'representative' && this.$props.isAdminForm
    },
    onFieldChange(fieldName, value) {
      this.setValue({ fieldName, value })
    },
    isEmailValid,
    isDisabled(item) {
      const getField = this.formFields.find(field => field.name === item)
      const { user } = this.$props
      return user ? !getField.isEditableOnUpdate : false
    }
  }
}
</script>-->

<style lang="scss" scoped>
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';

.form-container {
  width: 100%;
  margin-bottom: 48px;

  .form-header {
    border: none;
  }

  .form-header-line {
    margin: 5px 0px 32px 0px;
    padding: 0;
  }

  .error-container {
    p {
      color: $color-error;
      margin-bottom: 20px;
    }
  }

  .form-actions-container {
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    max-width: 392px;
    margin: auto;
    grid-gap: 32px;
  }

  @media (max-width: $mobile-size) {
    .form-actions-container {
      grid-gap: 24px;
    }
  }
}
</style>

<style lang="scss">
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';
.form-container {
  .dropdown {
    max-width: 100%;
  }

  .dropdown-trigger {
    background: $color-dropdown-background;
    width: 400px;
    min-width: unset;
    max-width: 100%;
    min-height: 40px;
    border-radius: 2px;
  }

  .dropdown-item {
    color: $color-dropdown-item;
  }

  .dropdown-item,
  .dropdown-trigger {
    font-weight: normal;
    font-size: 1.2rem;
    line-height: 1.5;
    letter-spacing: 0.006;
    text-transform: capitalize;
  }
}

.content p:not(:last-child) {
  margin-bottom: 0;
}
</style>
