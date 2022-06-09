<template>
  <div :class="{ 'error-margin': !hasError }">
    <label
      v-if="label"
      :class="{ 'disabled-label': disabled }"
      class="label-container"
    >
      <p class="label l2">{{ label }}</p>
      <p v-if="required" class="label required is-marginless">
        {{ $t('label-required') }}
      </p>
    </label>
    <div class="control input select-container">
      <span :class="{ 'is-disabled': disabled }" class="chev-icon">
        <Icon :size="10" icon-name="down-chevron" />
      </span>

      <no-ssr>
        <v-select
          :class="{ 'is-error': hasError }"
          :disabled="disabled"
          :multiple="multiple"
          :options="vueSelectOptions"
          :value="vueSelectValue"
          :clearable="clearable"
          @input="onChange($event)"
        />
      </no-ssr>
      <span v-if="hasError" class="error-icon">
        <Icon icon-name="error" />
      </span>
    </div>
    <p v-if="hasError" class="help">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Icon from '~/components/private/masterPage/Icon/Icon'

export default {
  components: {
    Icon
  },
  props: {
    asyncGetOptions: {
      type: Function,
      required: false,
      default: null
    },
    clearable: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Array],
      required: false,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loadedOptions: null
    }
  },
  computed: {
    vueSelectOptions() {
      return this.loadedOptions || this.options
    },
    optionsByValue() {
      return this.vueSelectOptions.reduce(
        (res, current) => ({
          ...res,
          [current.value]: current
        }),
        {}
      )
    },
    vueSelectValue() {
      if (!this.value) return undefined

      const value = Array.isArray(this.value)
        ? this.value
            .map(value => this.optionsByValue[value])
            .filter(value => value)
        : this.optionsByValue[this.value]

      return value
    }
  },
  async mounted() {
    try {
      this.isLoading = true

      if (this.asyncGetOptions)
        this.loadedOptions = await this.asyncGetOptions()
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    onChange($event) {
      const value =
        $event &&
        (Array.isArray($event)
          ? $event.map(({ value }) => value)
          : $event.value)

      this.$emit('change', value)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/colors';

//keeps a consisting margin regardless of error message visibility
.error-margin {
  margin-bottom: 28px;
}

.is-error {
  border: 1px solid $color-error;
}

.chev-icon {
  position: absolute;
  pointer-events: none;
  z-index: 1;
  right: 9px;
  color: $color-input-text;

  &.is-disabled {
    color: $color-input-disabled;
  }
}

.disabled-label {
  color: $color-input-disabled;
}

.field:not(:last-child) {
  margin-bottom: 0px;
}

.error-icon {
  position: absolute;
  pointer-events: none;
  top: 12px;
  right: 26px;
  color: $color-error;
}

.label {
  margin-bottom: 6px;
}

.select {
  width: 100%;
}

.select-container {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
