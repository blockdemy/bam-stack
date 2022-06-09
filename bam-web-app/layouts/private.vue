<template>
  <div class="private-page-wrapper">
    <no-ssr>
      <div class="nv-is-full-height columns">
        <!--<Topbar
          :is-admin-user="isAdminUser"
          :is-private-user="isPrivateUser"
          class="topbar"
        />-->
        <Topbar class="topbar" />
        <div class="column fb-auto">
          <div class="side-column menu is-hidden-mobile is-hidden-tablet-only">
            <!--<MainMenu
              :is-admin-user="isAdminUser"
              :is-private-user="isPrivateUser"
              :new-quote="() => newQuote()"
            />-->
            <MainMenu :new-quote="() => newQuote()" />
          </div>
          <div class="content-container">
            <div :class="containerStyle" class="column">
              <div class="columns is-desktop panels">
                <div class="column panel left-panel">
                  <nuxt />
                </div>
                <!--<div v-if="isPrivateUser" class="column panel right-panel">-->
                <!--<ContactUsCard
                    :representative-email="currentUser.representative"
                    :operational-email="operationalContact"
                    :technical-email="technicalContact"
                    :is-view-contract="isViewContract"
                  />-->
                <!--<ContactUsCard />-->
                <!--<div class="button-container">
                    <a :href="mailToLink" rel="noopener noreferrer">
                      <button class="feedback-button">
                        {{ this.$t('feedback-button-text') }}
                        <Icon :size="12" class="icon" icon-name="email" />
                      </button>
                    </a>
                  </div>-->
                <!--</div>-->
              </div>
            </div>
          </div>
        </div>
        <FooterPrivate />
        <!--<ImportModals />-->
      </div>
    </no-ssr>
  </div>
</template>

<script>
// import { mapState, mapMutations, mapGetters } from 'vuex'
// import MainMenu from '~/components/MainMenu/MainMenu'
// import Icon from '~/components/Icon/Icon'
// import Topbar from '~/components/Topbar/Topbar'
// import ImportModals from '~/components/Modal/ImportModals'
// import FooterPrivate from '~/components/Footer/FooterPrivate'
// import ContactUsCard from '~/components/ContactUsCard/ContactUsCard'

import { mapState } from 'vuex'
import MainMenu from '~/components/private/masterPage/MainMenu/MainMenu'
import Topbar from '~/components/private/masterPage/Topbar/Topbar'
import FooterPrivate from '~/components/private/masterPage/Footer/FooterPrivate'

export default {
  components: {
    MainMenu,
    Topbar,
    FooterPrivate
  },
  data() {
    const feedbackEmail = 'who@bam.com.mx'
    const feedbackSubject = this.$t('feedback-button-subject')
    const mailToLink = `mailto:${feedbackEmail}?Subject=${feedbackSubject}`
    return {
      mailToLink
    }
  },
  computed: {
    ...mapState('me', ['isAdminUser', 'isPrivateUser', 'currentUser']),
    /* ...mapState('contractDetails', ['isViewContract']),
    ...mapGetters('contractDetails', [
      'operationalContact',
      'technicalContact'
    ]), */
    containerStyle() {
      //  return this.isAdminUser ? 'admin-container' : 'private-container'
      return 'admin-container'
    }
  },
  methods: {
    // ...mapMutations('quoteRequest', ['clearState']),
    newQuote() {
      this.clearState()
      this.$router.push(this.localePath('nav-access-accounts'))
      // this.$router.push(this.localePath('request-quote'))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';
@import '~assets/styles/screen-sizes';
@import '~assets/styles/nv/layout';

$content-admin-horizontal-margin: 5%;
$content-admin-horizontal-margin-mobile: 2%;

.private-page-wrapper {
  height: 100vh;

  .menu {
    position: fixed;
    z-index: 3;
  }

  .topbar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    background-color: $color-navbar-background;
    border: 0.5px solid #dcdee0;
  }

  .side-column {
    flex: 0 0 $menu-width;
    height: 100vh;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    height: 100%;

    .panels {
      height: 100%;
      padding-top: 48px;
      padding-bottom: 130px;
    }

    .panel {
      margin-top: $navbar-height;
    }

    .admin-container {
      height: 100%;
    }

    .private-container {
      height: 100%;
      margin-right: 0px;

      .left-panel {
        flex: 1;
        padding-left: 0px;
      }

      .right-panel {
        flex-grow: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .button-container {
          display: flex;
          flex-direction: 'row';
          flex-direction: flex-end;
          margin-right: 24px;

          .feedback-button {
            border-radius: 0;
            width: 100%;
            background-color: #002f6c;
            height: 48px;
            min-width: 264px;
            font-weight: bold;
            font-size: 1rem;
            line-height: 1.45;
            padding: 0px 30px;
            color: #ffffff;
            border: 1px solid #002f6c;
            display: flex;
            justify-content: center;
            text-align: center;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            align-items: center;
          }

          .icon {
            margin-left: 14px;
          }
        }
      }
    }
  }
}

.fb-auto {
  flex-basis: auto;
}

@media (min-width: $mobile-size) {
  .content-container {
    padding-left: 0px;
  }
}

@media (min-width: $desktop-size) {
  .private-page-wrapper {
    .content-container {
      .panel {
        height: 100%;
      }
    }
  }

  .content-container {
    margin-left: $menu-width-small;
  }

  .panels {
    flex: 1;
    padding-left: 5%;
    padding-right: 0px;

    .right-panel {
      align-items: flex-end;
    }

    .left-panel {
      margin-right: 48px;
      overflow-x: auto;
    }

    .button-container {
      justify-content: flex-end;
    }
  }
}

@media (max-width: $desktop-size - 1px) {
  .panels {
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;

    .right-panel {
      align-items: flex-start;
    }
  }

  .button-container {
    justify-content: flex-start;
    margin-left: 0px;
    margin-top: 32px;
  }
}
</style>
