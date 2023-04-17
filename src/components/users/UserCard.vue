<template>
  <CCard class="mb-4">
    <CDropdown
      color="secondary"
      direction="dropstart"
      class="car-card-dropdown"
      style="position: absolute;top: 8px;right: 8px;z-index: 2;background: transparent;"
    >
      <CDropdownToggle style="padding: 0;">
        <CIcon
          :icon="cilCog"
          size="md"
          style="color:#000;"
        />
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem
          @click="onItemStatusSwitch(item)"
        >
          {{ item.active ? $t('Deactivate') : $t('Activate') }}
        </CDropdownItem>
        <CDropdownItem
          @click="onItemEdit(item)"
        >
          {{ $t('Edit') }}
        </CDropdownItem>
        <CDropdownItem
          @click="onItemDelete(item)"
        >
          {{ $t('Delete') }}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    <div class="card-body">
      <h5
        class="card-title user-title"
        style="white-space: nowrap"
      >
        <span
          class="user-status-badge"
          :class="item.active ? 'active' :''"
        />
        {{ item.first_name }} {{ item.last_name }}
      </h5>
      <h6 class="card-subtitle mb-4 text-muted">
        {{ item.username }}
      </h6>
      <span
        class="badge rounded-pill d-block"
        :class="item.is_admin?'text-bg-success':'text-bg-info'"
      >
        {{ item.is_admin ? $t('Admin') : $t('User') }}
      </span>
      <span class="badge rounded-pill d-block text-bg-primary">{{ registeredAt }}</span>
    </div>
  </CCard>
</template>

<script>
import {cilClock, cilCog} from '@coreui/icons';
import {CIcon} from "@coreui/icons-vue";

export default {
  name: 'UserCard',
  components: {
    CIcon
  },
  props: ['item'],
  setup() {
    return {
      cilClock,
      cilCog,
    }
  },
  data() {
    return {
      labelIcon: {
        labelOn: '\u2713',
        labelOff: '\u2715'
      },
    }
  },
  computed: {
    registeredAt() {
      return (new Date(this.item.created_at * 1000)).toLocaleString()
    }
  },
  methods: {
    onItemDelete() {
      this.$emit('onItemDelete');
    },
    onItemStatusSwitch(){
      this.$emit('onItemStatusSwitch')
    },
    onItemEdit(){
      this.$emit('onItemEdit')
    }
  }
}
</script>

<style scoped>
.user-status-badge {
  width: 10px;
  height: 10px;
  background: red;
  display: inline-block;
  border-radius: 5px;
}

.user-status-badge.active {
  background: green;
}

.user-title {
  width: calc(100% - 20px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
