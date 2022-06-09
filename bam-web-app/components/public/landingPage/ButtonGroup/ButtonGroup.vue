<template>
  <div>
    <div v-for="group in groups" :key="group.id" class="nv-m-bottom-20">
      <div v-if="!multiOption" class="column is-full group-radio">
        <div class="round-radio">
          <fieldset>
            <div class="radio">
              <input
                :id="`${group.name}`"
                v-model="selectedGroup"
                :name="group.name"
                :value="group.value"
                @change="clearSelection"
                type="radio"
              />
              <label :for="`${group.name}`">{{ group.label }}</label>
            </div>
          </fieldset>
        </div>
      </div>

      <label v-else class="label">{{ group.label }}</label>

      <div
        :class="{ 'button-group-margin': !multiOption }"
        class="columns buttons button-group-container"
      >
        <div
          v-for="(item, index) in group.items"
          :key="index"
          class="button select-box-outer"
        >
          <fieldset>
            <label class="select-box">
              <input
                v-if="!multiOption"
                :id="`${group.name}-${index}`"
                v-model="selectedValue"
                :value="item.value"
                :disabled="item.disabled"
                :name="item.name"
                @change="selectGroup(group.value, item.value)"
                type="radio"
              />
              <input
                v-else
                :id="`${group.name}-${index}`"
                v-model="group.id"
                :value="item.value"
                :disabled="item.disabled"
                :name="item.name"
                @change="selectGroup(group.value, item.value)"
                type="radio"
              />
              <div>{{ item.text }}</div>
            </label>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
      default: () => []
    },
    checkedGroup: {
      type: Number,
      default: 0
    },
    isMultiOption: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: null
    }
  },
  data() {
    const multiOption = this.$props.isMultiOption
    const groupOptions = this.$props.groups
    const selectedGroup = groupOptions[this.$props.checkedGroup].value
    const selectedValue = ''
    return { selectedValue, selectedGroup, multiOption }
  },
  methods: {
    selectGroup: function(selectedGroup, selectedValue) {
      this.selectedGroup = selectedGroup
      this.selectedValue = selectedValue
      this.onChange({ selectedGroup, selectedValue })
    },
    changeValue: function(newValue) {
      this.selectedValue = newValue
    },
    clearSelection: function() {
      this.selectedValue = ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/colors';

.button-group-margin {
  margin-left: 3rem;
}

.button-group-container {
  padding-top: 18px;
  margin-bottom: 24px;

  .select-box-outer {
    width: 144px;
    height: 54px;
    padding: 0;
    margin: 0;
    background-color: $_gray7;
    border-radius: 0;
    border: none;
    margin-bottom: 15px;
    margin-right: 15px !important;
    text-align: center;
    white-space: normal;
    word-wrap: break-word;
    font-size: 1rem;
    font-weight: bold;
    color: $_black;
    text-transform: none;

    fieldset {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
    }
  }

  .select-box {
    width: 100%;
    height: 100%;
    .button-text {
      font-size: 1rem;
      font-weight: bold;
      color: $_black;
      text-transform: none;
    }
  }

  .select-box > input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  .select-box > input + div {
    padding: 13px 10px;
    cursor: pointer;
    width: 100%;
    height: 100%;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .select-box > input:checked + div {
    width: 100%;
    height: 100%;
    background-color: $_bam-navy;
    color: white;
  }
}

.round-radio {
  .radio {
    margin: 0px 25px;
  }

  label {
    position: relative;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    text-transform: none;
    letter-spacing: 0.1px;
    color: $color-input-text;
    cursor: pointer;
    &::before {
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

  input[type='radio'] {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    &[disabled] + label::before {
      border-color: $color-input-disabled;
    }
    &[disabled] + label {
      color: $color-input-disabled;
      cursor: default;
      pointer-events: none;
    }
    &:checked + label::before {
      border-color: $color-input-selected-border;
    }
    &:checked + label::after {
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
    &:checked[disabled] + label::before {
      border-color: $color-input-disabled;
    }
    &:checked[disabled] + label::after {
      background-color: $color-input-disabled;
      box-shadow: none;
    }
  }
}
</style>
