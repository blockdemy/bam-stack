<template>
  <div
    :class="[{ 'error-margin': !hasErr }, inputClass]"
    class="input-container"
  >
    <div class="label-container">
      <label :class="[{ 'disabled-label': disabled }, labelClass]">{{
        label
      }}</label>
      <label v-if="required" class="label small required">
        {{ $t('label-required') }}
      </label>
    </div>
    <div class="control">
      <textarea
        v-if="multiline"
        v-model="textValue"
        :maxlength="maxlength"
        :class="{ 'is-danger': hasErr, 'no-border': readOnly }"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :required="required"
        :disabled="disabled"
        :readonly="readOnly"
        @keyup="$emit('keyup', $event)"
        @input="$emit('input', $event)"
        @blur="$emit('blur', $event)"
        @change="checkValue"
        class="textarea"
      ></textarea>
      <input
        v-else
        v-model="textValue"
        :class="{ 'is-danger': hasErr, 'no-border': readOnly }"
        :type="type"
        :min="min"
        :max="max"
        :placeholder="placeholder"
        :name="name"
        :required="required"
        :disabled="disabled"
        :readonly="readOnly"
        :maxlength="maxlength"
        @keyup="$emit('keyup', $event)"
        @input="$emit('input', $event)"
        @blur="$emit('blur', $event)"
        @change="checkValue"
        class="input"
      />
    </div>
    <span v-if="hasErr" class="error-icon">
      <Icon icon-name="error" />
    </span>
    <p v-if="hasErr" class="help error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Icon from '~/components/private/masterPage/Icon/Icon'
export default {
  components: {
    Icon
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    labelClass: {
      type: String,
      default: 'label'
    },
    inputClass: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: [String, Number],
      default: ''
    },
    max: {
      type: [String, Number],
      default: ''
    },
    maxlength: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    multiline: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: function() {
        return this.$t('error-has-occurred')
      }
    }
  },
  data() {
    const insideHasError = this.hasError
    const textValue = this.$props.value
    return { insideHasError, textValue }
  },
  computed: {
    hasErr() {
      return this.hasError || this.insideHasError
    }
  },
  watch: {
    value: function(val) {
      this.textValue = val
    }
  },
  methods: {
    checkValue(e) {
      this.insideHasError = this.required && !e.target.value
      this.$emit('change', e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
.input-container {
  position: relative;
}
.error-margin {
  margin-bottom: 27.5px !important;
}
.error-message {
  height: 25px;
}
.input-year {
  max-width: 160px;
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
.no-border {
  border-color: $color-input-field;
}
</style>
