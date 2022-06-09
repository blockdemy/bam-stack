<template>
  <footer class="footer">
    <div class="columns is-mobile">
      <div class="column">
        <Logo :color="colorFooterLogo" class="footer-logo" />
        <div class="footer-text footer-margin">
          <p>
            {{ $t('company-address-street') }}<br />
            {{ $t('company-address-section') }}<br />
            {{ $t('company-address-city') }}<br />
            {{ $t('company-tel') }}<br />
            {{ $t('company-ext') }}
          </p>
        </div>
      </div>
      <div class="column has-text-right lang-condition">
        <LanguageSwitcher :is-dark-background="true" />
      </div>
    </div>
    <div class="columns footer-text">
      <p class="column is-two-fifths is-three-fifths-widescreen footer-link">
        {{ $t('company-name') }}
      </p>
      <br />
      <div class="column footer-link">
        <a href="mailto:who@bam.com.mx" rel="noopener noreferrer">{{
          $t('footer-contact')
        }}</a>
        <div>{{ $t('footer-terms') }}</div>
        <div>{{ $t('footer-privacy') }}</div>
      </div>
    </div>
  </footer>
</template>

<script>
import LanguageSwitcher from '~/components/public/landingPage/LanguageSwitcher/LanguageSwitcher'
import Logo from '~/components/public/landingPage/Logo/Logo'
import { colorFooterLogo } from '~/assets/styles/_colors.scss'

export default {
  components: {
    LanguageSwitcher,
    Logo
  },
  data() {
    return { colorFooterLogo }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
@import '~assets/styles/_screen-sizes';

.footer {
  padding: 47px 64px 30px 64px;
  background-color: $color-footer-bg;
  color: $color-footer-text;

  .footer-logo {
    width: 120px;
    margin-bottom: 58.5px;
  }

  .footer-text {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.4;
    letter-spacing: 0.01em;
    color: $color-footer-text;
  }

  .footer-margin {
    margin-bottom: 74px;
  }

  .footer-link {
    display: flex;
    justify-content: space-between;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: bold;
    font-size: 1.1rem;
    line-height: 1.45;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    & a {
      color: $color-footer-text;
    }
  }

  .lang-condition {
    display: none;
  }
}

@media (max-width: $mobile-size) {
  .footer {
    padding: 50px;
    background-color: $color-footer-bg;
    color: $color-footer-text;

    .footer-margin,
    .footer-logo {
      margin-bottom: 50px;
    }

    .footer-link {
      display: block;

      & a {
        display: block;
      }
    }

    .lang-condition {
      display: block;
    }
  }
}
</style>

<style lang="scss">
@import '~assets/styles/_screen-sizes';

@media (max-width: $mobile-size) {
  .footer {
    .dropdown-trigger {
      justify-content: flex-end;
      padding: 15px 0 15px 15px;
      margin-top: -10px;
    }
  }
}
</style>
