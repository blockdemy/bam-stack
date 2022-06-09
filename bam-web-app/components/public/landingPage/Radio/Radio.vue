<template>
  <div :class="{ 'is-vertical': isVertical }" class="wrapper">
    <label v-for="item in items" :key="item.value" class="radio">
      <input
        v-model="insideValue"
        :name="name"
        :value="item.value"
        :disabled="disabled"
        @change="change()"
        type="radio"
      />
      <span class="label-text">{{ item.label }}</span>
    </label>
    <p v-if="hasError && errorMessage" class="help">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Number, String],
      default: () => null
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      insideValue: this.value
    }
  },
  methods: {
    change() {
      this.$emit('input', this.insideValue)
      this.$emit('change', this.insideValue)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';

.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  &.is-vertical {
    display: flex;
    flex-direction: column;

    .radio + .radio {
      margin-top: 10px;
    }
  }

  .radio {
    position: relative;
    font-size: 12px;
    line-height: 18px;
    margin-left: 25px;
    margin-right: 32px;

    & input {
      display: none;

      &[disabled] + .label-text::before {
        border-color: $color-input-disabled;
      }

      &[disabled] + .label-text {
        color: $color-input-disabled;
        cursor: default;
        pointer-events: none;
      }

      &:checked + .label-text::before {
        border-color: $color-input-selected-border;
      }

      &:checked + .label-text::after {
        position: absolute;
        width: 10px;
        height: 10px;
        top: 3px;
        left: -21px;
        background-color: $color-input-selected;
        box-shadow: 0px 0px 4px rgba(0, 176, 255, 0.4);
        border-radius: 8px;
        content: '';
      }

      &:checked[disabled] + .label-text::before {
        border-color: $color-input-disabled;
      }

      &:checked[disabled] + .label-text::after {
        background-color: $color-input-disabled;
        box-shadow: none;
      }
    }

    .label-text::before {
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: -24px;
      background: $color-input-background;
      border: 1px solid $color-input-active-border;
      border-radius: 8px;
      content: '';
    }
  }
}

@media (max-width: $mobile-size) {
  .wrapper {
    .radio {
      margin-right: 16px;
    }
  }
}
</style>
