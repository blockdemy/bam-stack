<template>
  <div>
    <nuxt-link
      v-if="buttonType === 'link'"
      :to="url"
      :class="{
        'is-primary': buttonStyle === 'primary',
        'is-text': buttonStyle === 'tertiary'
      }"
      :tabindex="tabIndex"
      :disabled="disabled"
      class="button"
    >
      {{ buttonLabel }}
      <div v-if="buttonStyle === 'tertiary'" class="tertiary-arrow">
        <Icon :size="10" icon-name="right-arrow" />
      </div>
    </nuxt-link>

    <nuxt-link
      v-else-if="buttonStyle === 'accent'"
      :to="`${localePath(buttonRoute)}`"
    >
      <button :disabled="disabled" class="accent">
        <Icon :size="16" class="icon" icon-name="add" />
        {{ buttonLabel }}
      </button>
    </nuxt-link>

    <nuxt-link
      v-else-if="buttonType === 'route'"
      :to="{
        path: `${localePath(buttonRoute)}`,
        ...(query && { query: { query } })
      }"
      class="local-link"
    >
      <button
        :class="{
          'is-primary': buttonStyle === 'primary',
          'is-text': buttonStyle === 'tertiary',
          'light-theme': lightTheme === true
        }"
        :disabled="disabled"
        type="button"
        class="button"
      >
        <div v-if="isBackButton" class="tertiary-arrow">
          <Icon :size="10" icon-name="left-arrow" />
        </div>
        {{ buttonLabel }}
        <div
          v-if="!isBackButton && buttonStyle === 'tertiary'"
          class="tertiary-arrow"
        >
          <Icon :size="10" icon-name="right-arrow" />
        </div>
      </button>
    </nuxt-link>

    <div
      v-else-if="buttonType === 'input'"
      :class="{
        'is-text': buttonStyle === 'tertiary',
        'is-disabled': disabled
      }"
      class="input-button"
    >
      <input
        v-model="buttonLabel"
        :class="{
          'is-primary': buttonStyle === 'primary',
          'is-text': buttonStyle === 'tertiary'
        }"
        :disabled="disabled"
        type="button"
        class="button"
        @click.prevent="$emit('on-press')"
      />
      <div v-if="buttonStyle === 'tertiary'" class="tertiary-arrow">
        <Icon :size="10" icon-name="right-arrow" />
      </div>
    </div>

    <button
      v-else
      :class="{
        'is-primary': buttonStyle === 'primary',
        'is-text': buttonStyle === 'tertiary'
      }"
      :disabled="disabled"
      class="button"
      @click.prevent="$emit('on-press')"
      @click="$emit('click')"
    >
      <div v-if="isBackButton" class="tertiary-arrow">
        <Icon :size="10" icon-name="left-arrow" />
      </div>
      {{ buttonLabel }}
      <div
        v-if="!isBackButton && buttonStyle === 'tertiary'"
        class="tertiary-arrow"
      >
        <Icon :size="10" icon-name="right-arrow" />
      </div>
    </button>
  </div>
</template>

<script>
import Icon from '~/components/public/landingPage/Icon/Icon'

export default {
  components: {
    Icon
  },
  props: {
    buttonStyle: {
      type: String,
      validator: prop =>
        ['primary', 'secondary', 'tertiary', 'accent'].includes(prop),
      default: 'secondary'
    },
    buttonType: {
      type: String,
      validator: prop => ['input', 'link', 'button', 'route'].includes(prop),
      default: 'button'
    },
    url: {
      type: String,
      default: '#'
    },
    buttonRoute: {
      type: String,
      default: '#'
    },
    query: {
      type: String,
      required: false,
      default: null
    },
    lightTheme: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isBackButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // Use the text from the first node in the slot as the button label
    const buttonLabel = this.$slots.default[0].text
    return { buttonLabel }
  },
  computed: {
    // prevent a "disabled" link from being focused
    tabIndex() {
      if (this.disabled) {
        return '-1'
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';

.input-button {
  display: inline-block;
}

.local-link {
  display: flex;
  padding: 0;
  border: none;
  background-color: transparent;
}

.light-theme {
  color: $color-landing-text !important;
}

a.button.is-text,
button.is-text,
.input-button.is-text {
  display: inline-flex;
  align-items: center;
  background: none;
  white-space: normal;
  max-width: 240px;
  height: 100%;
  text-align: left;

  .tertiary-arrow {
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 1px;
  }
}

.input-button.is-text {
  .tertiary-arrow {
    margin-left: 3px;
    line-height: 0;
    color: $color-button-default;
  }

  input:hover + .tertiary-arrow {
    color: $color-button-hover;
  }
  input:active + .tertiary-arrow {
    color: $color-button-active;
  }
  input[disabled] + .tertiary-arrow {
    color: $color-button-disabled;
  }
}

.accent {
  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.33;
  letter-spacing: 0.037em;
  text-transform: uppercase;
  height: 72px;
  width: 240px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $_white;
  background-color: $color-landing-button-quote;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  .icon {
    margin-right: 18px;
  }
}
</style>
