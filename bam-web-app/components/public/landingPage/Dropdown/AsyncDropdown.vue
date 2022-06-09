<template>
  <div :class="[{ 'error-margin': !hasError }]">
    <div class="label-container">
      <label :class="[{ 'disabled-label': disabled }]" class="label">
        {{ label }}
      </label>
      <label v-if="required" class="label">{{ $t('label-required') }}</label>
    </div>

    <Dropdown class="dropdown">
      <template v-slot:trigger>
        <p>{{ loading ? 'Loading...' : $t(selection) }}</p>
      </template>
      <template v-slot:default>
        <div v-for="(item, index) in items" :key="index.toString()">
          <p
            v-if="item[displayKey].trim()"
            @click="makeSelection(item)"
            class="dropdown-item"
          >
            {{ $t(item[displayKey]) }}
          </p>
        </div>
      </template>
    </Dropdown>

    <p v-if="hasError" class="help error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Dropdown from '~/components/public/landingPage/Dropdown/Dropdown'
export default {
  components: {
    Dropdown
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    required: {
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
    },
    value: {
      type: [Number, String],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    getItems: {
      type: Function,
      required: false,
      default: undefined
    },
    url: {
      type: String,
      required: false,
      default: undefined
    },
    displayKey: {
      type: String,
      required: false,
      default: undefined
    },
    returnKey: {
      type: String,
      required: false,
      default: undefined
    }
  },
  data() {
    return {
      items: [],
      selection: null,
      loading: true
    }
  },
  async mounted() {
    // may need to persist this list in a store.
    // for now -- this seems like enough
    try {
      if (this.getItems) {
        this.items = await this.getItems()
      } else {
        const {
          data: {
            data: { items }
          }
        } = await this.$axios.get(this.$props.url)
        this.items = items

        const { returnKey, value } = this.$props

        if (value && returnKey) {
          const selectedItem = this.items.find(
            item => item[returnKey] === value
          )
          this.makeSelection(selectedItem)
        } else if (value) {
          this.selection = value
        }
      }
    } catch (error) {
      return false
    } finally {
      this.loading = false
    }
  },
  methods: {
    makeSelection(item) {
      const { displayKey, returnKey } = this.$props
      this.selection = item[displayKey]
      this.$emit('change', returnKey ? item[returnKey] : item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
.dropdown {
  width: 100%;
  border: 1px solid transparent;
  &.is-danger {
    border-color: $_red;
  }
}
.error-margin {
  margin-bottom: 27.5px !important;
}
.error-message {
  height: 25px;
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
</style>
