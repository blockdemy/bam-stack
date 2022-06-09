<template>
  <no-ssr>
    <div class="date-picker-container error-margin">
      <div class="label-container">
        <label :class="[{ 'disabled-label': disabled }, labelClass]">{{
          label
        }}</label>
        <p
          v-if="required"
          :class="{ 'disabled-label': disabled }"
          class="label small required"
        >
          {{ $t('label-required') }}
        </p>
      </div>
      <div class="date-picker-input-container">
        <div class="date-picker-input">
          <vue-pikaday
            v-model="now"
            :class="{ 'is-danger': hasErr }"
            :options="pikadayOptions"
            :disabled="disabled"
            @blur="$emit('change', date)"
            @input="checkValue"
            class="input datepicker"
          />
          <div class="date-picker-input-icon">
            <Icon
              :size="15"
              :class="{ 'date-picker-input-icon-disabled': disabled }"
              icon-name="calendar"
              class="icon"
            />
          </div>
        </div>
      </div>

      <div v-if="hasErr" class="error-container">
        <Icon icon-name="error" />
        <p class="help nv-m-left-5">{{ errorMessage }}</p>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import {
  getDateStartOfDayFromUTC,
  getISOStringFromData
} from '../../../../utils/dates'
import Icon from '~/components/public/landingPage/Icon/Icon'

export default {
  components: {
    Icon
  },
  props: {
    required: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: null
    },
    labelClass: {
      type: String,
      default: 'label'
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
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      now: this.value ? getDateStartOfDayFromUTC(this.value) : null,
      pikadayOptions: {
        format: 'DD/MM/YYYY',
        ...this.$props.options,
        i18n: {
          previousMonth: this.$t('date-picker-previous-month'),
          nextMonth: this.$t('date-picker-next-month'),
          months: this.$t('date-picker-months'),
          weekdays: this.$t('date-picker-weekdays'),
          weekdaysShort: this.$t('date-picker-weekdays-short')
        }
      },
      hasOwnErr: null
    }
  },
  computed: {
    date() {
      return this.now ? getISOStringFromData(this.now) : ''
    },
    hasErr() {
      return this.$props.hasError || this.hasOwnErr
    }
  },
  methods: {
    checkValue(_) {
      this.hasOwnErr = this.required && !this.now
    }
  }
}
</script>

<style lang="scss">
@import '~/node_modules/@enrian/vue-pikaday/dist/vue-pikaday.css';
@import '~assets/styles/_screen-sizes';
@import '~assets/styles/colors';

$datepicker-width: 288px;
$datepicker-padding: 15px;
$icon-size: 15px;
$accommodate-icon: -1 * $icon-size;
$input-horizontal-margins: 8px;
$accommodate-padding: -1 * $input-horizontal-margins;
$date-picker-z-index: 2;
$icon-z-index: 1;

.label-container {
  .disabled-label {
    color: $_gray5;
  }
}

input {
  &.datepicker {
    &:focus {
      border: 1px solid $color-input-focus-border !important;
    }
  }
}

.error-container {
  display: flex;
  align-items: center;
  color: $color-error;
}

.date-picker-container {
  margin-bottom: 28px;

  .date-picker-input-container {
    height: 40px;
    background-color: $color-input-field;
    .date-picker-input {
      width: 100%;
      display: flex;
      flex-direction: 'row';
      align-items: center;
      background-color: transparent;

      .input.datepicker {
        width: 100%;
        height: 40px;
        border: none;
        box-shadow: none;
        z-index: $date-picker-z-index;
        display: flex;
        background-color: transparent;
        margin-right: $accommodate-icon;
        padding: 0px 8px;
        font-family: 'Open Sans', sans-serif;
        font-size: 1.2rem;

        &.is-danger {
          border: 1px solid $_red;
          border-radius: 2px;
        }
      }

      .date-picker-input-icon {
        margin-left: $accommodate-padding;
        z-index: $icon-z-index;
        display: flex;

        &-disabled {
          color: $_gray5;
        }
      }
    }

    &:focus {
      background-color: #f6f7f9;
      border-color: #007dc3;
      box-shadow: none;
    }
  }

  &:focus {
    background-color: #f6f7f9;
    border-color: #007dc3;
    box-shadow: none;
  }
}

@media (min-width: $mobile-size + 1) {
  .pika-single {
    width: $datepicker-width;
  }
}
// table style overrides

.pika-single {
  border: none;

  .pika-lendar {
    float: none;
    width: 100%;
    padding: $datepicker-padding;
    margin: 0px;

    .pika-label {
      font-size: 1.5rem;
      text-transform: uppercase;
      font-family: 'Open Sans';
      color: $color-datepicker-text;
    }

    .pika-table {
      border-collapse: collapse;
      border-spacing: 0;
      border: 0;

      th {
        color: $color-datepicker-days-text;
        font-size: 1.5rem;
        line-height: 20px;
        padding-bottom: 15px;
        padding-top: 25px;

        abbr {
          padding-left: 5px;
          text-decoration: none;
        }
      }

      .pika-button {
        cursor: pointer;
        display: block;
        outline: none;
        border: 0;
        padding: 0px;
        margin: 5px;
        width: 25px;
        height: 25px;
        color: $color-text;
        font-weight: bold;
        font-size: 1.2rem;
        line-height: normal;
        background: transparent;
      }

      .is-disabled .pika-button,
      .is-inrange .pika-button {
        background: transparent;
      }

      td {
        button {
          &.pika-button {
            text-align: center;
          }
          &:hover {
            color: $color-datepicker-hover-text;
            opacity: 1;
            font-weight: bold;
            background: $color-datepicker-hover;
            box-shadow: none;
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
        }

        &.is-today {
          button {
            &.pika-button {
              text-align: center;
              &.pika-day {
                opacity: 1;
                padding-bottom: 3px;
                color: $color-text;
                font-weight: bold;
                &::after {
                  content: ' ';
                  transform: translate(-8px, 1rem);
                  height: 5px;
                  margin-top: 10px;
                  position: absolute;
                  width: 5px;
                  border-radius: 50%;
                  background-color: $color-datepicker-today;
                }
              }
            }
          }
          &.is-selected {
            button {
              &.pika-button {
                &.pika-day {
                  &::after {
                    visibility: hidden;
                  }
                }
              }
            }
          }
        }

        &.is-selected {
          button {
            &.pika-button {
              &.pika-day {
                color: $color-datepicker-selected-text;
                font-weight: bold;
                background: $color-datepicker-selected;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                box-shadow: none;
                &:hover {
                  color: $color-datepicker-selected-text;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
