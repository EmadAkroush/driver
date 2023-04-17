<template>
  <CCard class="mb-4">
    <CDropdown
      color="secondary"
      direction="dropstart"
      class="car-card-dropdown"
      style="position: absolute;top: 8px;right: 8px;z-index: 2;background: transparent;"
    >
      <CDropdownToggle>
        <CIcon
          :icon="cilCog"
          size="md"
          style="color:#fff;box-shadow: 0 0 15px 8px rgba(0,0,0,0.5);"
        />
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem
          @click="showDetails(item)"
        >
          {{ $t('Details') }}
        </CDropdownItem>
        <CDropdownItem
          @click="deleteItem(item)"
        >
          {{ $t('Delete') }}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    <div
      class="card-img-top car-image-holder"
    >
      <img
        class="car-image-bg"
        :src="item.car_img_thumb"
      >
      <img
        class="car-image"
        :src="item.car_img_thumb"
      >
    </div>

    <CCardBody>
      <h5 class="card-title">
        <span v-text="item.class_title" />
        <span
          class="color-badge"
          :style="'background:'+item.color_value"
        />
      </h5>
      <ul style="padding: 0;margin-bottom: 0;list-style: none">
        <li style="font-size: 12px;">
          <CIcon
            :icon="cilClock"
            size="sm"
            style="margin-right: 4px;"
          />
          {{ date }}
        </li>
      </ul>
    </CCardBody>
  </CCard>
</template>
<script>
import {CIcon} from '@coreui/icons-vue';
import {cilClock, cilCog} from '@coreui/icons';

export default {
  name: "VehicleCard",
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
  computed: {
    date() {
      return (new Date(this.item.date * 1000)).toLocaleString()
    }
  },
  methods: {
    deleteItem(item) {
      this.$emit('onItemDelete', item);
    },
    showDetails(item) {
      this.$emit('onShowDetails', item);
    }
  }
}
</script>

<style scoped>
.color-badge {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 8px;
}

.car-image-holder {
  position: relative;
  width: 100%;
  height: 190px;
  overflow: hidden;
  text-align: center;
}

.car-image-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  filter: blur(10px);
  transform: scale(1.1);
}

.car-image {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  z-index: 1;
  left: 50%;
  transform: translate(-50%, -50%);
}

.car-card-dropdown .dropdown-toggle:before {
  content: none;
}
</style>