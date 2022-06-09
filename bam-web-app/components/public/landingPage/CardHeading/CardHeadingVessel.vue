<template>
  <div>
    <div>
      <label class="l1">{{ $t('add-vessel-card-subtitle') }}</label>
    </div>
    <div class="group-container">
      <div class="title-container">
        <h2 class="vessel-text">{{ title }}</h2>
        <VesselStatus v-if="vessel" :vessel="vessel" />
      </div>
      <div v-if="vessel" class="archive-container">
        <button
          id="test_open_archive_vessel_modal"
          class="button is-primary"
          :disabled="isDisabled"
          @click="toggleArchive()"
        >
          {{
            isArchived
              ? $t('reactivate-vessel-button')
              : $t('archive-vessel-button')
          }}
        </button>
      </div>
    </div>
    <div class="column is-three-quarters-desktop nv-m-top-10">
      <p v-if="isOfflineNotesExists" class="small offline-reason">
        {{ vessel.offlineNotes }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { dayToString } from '~/utils/dates'
import VesselStatus from '~/components/public/landingPage/Inventory/VesselStatus'
import { vesselStatuses } from '~/store/vessel'

export default {
  components: {
    VesselStatus
  },
  props: {
    title: {
      default: '',
      type: String
    },
    vessel: {
      type: Object,
      default: null
    }
  },
  computed: {
    isArchived() {
      return this.vessel.status === vesselStatuses.OFFLINE
    },
    isDisabled() {
      return this.vessel.status === vesselStatuses.IN_SERVICE
    },
    isOfflineNotesExists() {
      return this.vessel && this.isArchived && this.vessel.offlineNotes
    }
  },
  methods: {
    dayToString,
    ...mapMutations({
      showModal: 'modal/show'
    }),
    ...mapActions({
      reactivate: 'vessel/reactivate'
    }),
    toggleArchive() {
      if (this.isArchived) {
        this.reactivate(this.vessel.id)
      } else {
        this.showModal({
          modalName: 'ArchiveVesselModal'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/colors';

.offline-reason {
  color: $_gray3;
}

.l1 {
  color: $color-label-head;
}

.content h2:not(:last-child) {
  margin: 0;
}

.group-container {
  display: flex;
  justify-content: space-between;

  .title-container {
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 20px;
    padding-right: 30px;

    .vessel-text {
      white-space: nowrap;
      overflow: hidden;
      max-width: 500px;
      margin-bottom: 0px;
      text-overflow: ellipsis;
      margin-top: 20px;
      margin-right: 30px;
    }
  }

  .tag {
    margin-top: 20px;
    padding: 0 40px;
  }

  .archive-date {
    margin-left: 30px;
    color: $color-label-head;
  }
}

@media only screen and (max-width: 1023px) {
  .group-container {
    display: block;
  }
}
</style>
