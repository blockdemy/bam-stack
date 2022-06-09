export const isEmptyValue = value =>
  Array.isArray(value)
    ? value.length === 0
    : ['', undefined, null].includes(value)

export const numberCheck = (min, max) => value => {
  if (isNaN(value)) return true
  if (min !== undefined && min > value) return true
  if (max !== undefined && max < value) return true
}

const createValidationState = (fields, validators) =>
  Object.keys(fields).reduce(
    (res, key) => {
      res.fields[key] = {
        required: validators[key] && validators[key].required,
        getError: () => {
          if (!validators[key]) return false

          const isRequired = validators[key].required
          const isFieldEmpty = isEmptyValue(fields[key])
          if (isRequired && isFieldEmpty) return true

          const getError = validators[key].getError
          if (getError) return getError(fields[key])
        }
      }
      return res
    },
    { isFormCorrect: true, fields: {} }
  )

/**
 *
 * Working example is in component components/EditVesselForm/EditVesselForm.vue
 *
 * For validationg form after rendering, use 'mounted' lifecycle method:
 *
 * @example
 *   mounted() {
 *     this.validateForm(true)
 *   }
 *
 */
export const createFormValidatorMixin = (getFields, getValidatorHandlers) => ({
  created() {
    this.fields = getFields(this)
    this.validator = createValidationState(
      this.fields,
      getValidatorHandlers(this)
    )
  },
  data: () => {
    return {
      fields: {},
      backendError: {},
      validator: {}
    }
  },
  watch: {
    error: function() {
      this.backendError = { ...this.error } || {}
      this.validateForm(true)
    }
  },
  methods: {
    onFieldChange() {},
    changeField(e) {
      const value = e.srcElement.value
      const fieldName = e.target.name
      this.changeFieldByName(fieldName, value)
    },
    changeFieldByName(fieldName, value) {
      this.fields[fieldName] = value
      this.backendError[fieldName] = null
      this.validate(fieldName)
      this.onFieldChange(fieldName, value)
    },
    __isFormCorrect() {
      return !Object.values(this.validator.fields).find(
        field => field.getError && field.getError()
      )
    },
    getBackendError(fieldName) {
      const error = this.backendError && this.backendError[fieldName]
      if (error) return this.$t(`error-${error.error}`)
    },
    validate(fieldName) {
      const validator = this.validator.fields[fieldName]

      const error = this.getBackendError(fieldName) || validator.getError()
      validator.hasError = !!error
      validator.message = error && error === true ? '' : error

      const wasFormCorrect = this.validator.isFormCorrect

      this.validator.isFormCorrect = validator.hasError
        ? false
        : this.__isFormCorrect()

      if (this.validator.isFormCorrect !== wasFormCorrect) {
        // emit only on validate state change
        this.$emit('validate', this.validator.isFormCorrect)
      }
    },
    validateForm(showErrors) {
      this.validator.isFormCorrect = this.__isFormCorrect()

      if (showErrors)
        Object.keys(this.validator.fields).forEach(fieldName =>
          this.validate(fieldName)
        )
    },
    getFieldData(name) {
      const v = this.validator.fields[name]

      return {
        value: this.fields[name],
        required: v.required,
        name,
        'has-error': v.hasError,
        'error-message': v.message || ''
      }
    }
  }
})
