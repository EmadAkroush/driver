<template>
  <Notifications :notifications="notifications" />
  <div class="row mb-4">
    <div class="col-12">
      <CCard>
        <CCardBody
          class="d-block d-lg-flex"
          style="align-items: center;"
        >
          <div
            class="me-2"
            style="display: inline-block;"
          >
            <CButton
              v-show="filtersChanged"
              color="success"
              style="color:white"
              @click="applyFilters"
            >
              {{ $t('Apply Filters') }}
            </CButton>
            <CButton
              v-show="!filtersChanged"
              color="primary"
              style="white-space: nowrap;"
              @click="toggleFilters"
            >
              {{ $t('filters') }}
              <CIcon
                :icon="cilFilter"
                size="sm"
                style="margin-right: 4px;background: transparent !important;"
              />
            </CButton>
            <div
              v-show="showFilters"
              style="position: absolute;top: 60px;z-index: 10;max-width: 360px;width: 90%;"
            >
              <CAccordion
                :active-item-key="1"
                always-open
              >
                <CAccordionItem
                  :item-key="1"
                  open
                >
                  <CAccordionBody>
                    <CInputGroup>
                      <CFormInput
                        style="width: 139px;"
                        placeholder="-"
                        aria-label="From date"
                        class="custom-input-from-date"
                      />
                      <CInputGroupText>{{ $t('to') }}</CInputGroupText>
                      <CFormInput
                        style="width: 139px;"
                        placeholder="-"
                        aria-label="To date"
                        class="custom-input-to-date"
                      />
                    </CInputGroup>

                    <date-picker
                      :key="'date-picker'+filters.from_date"
                      v-model="filters.from_date"
                      format="YYYY-M-D"
                      locale="en"
                      :placeholder="$t('From date')"
                      clearable
                      custom-input=".custom-input-from-date"
                    />

                    <date-picker
                      :key="'date-picker'+filters.to_date"
                      v-model="filters.to_date"
                      format="YYYY-M-D"
                      locale="en"
                      :placeholder="$t('To date')"
                      clearable
                      custom-input=".custom-input-to-date"
                    />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem
                  :item-key="2"
                  open
                >
                  <CAccordionHeader>
                    {{ $t('Color filter') }}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <treeselect
                      :key="'treeselect_'+filters.color_id"
                      v-model="filters.color_id"
                      :multiple="true"
                      open-direction="bottom"
                      :options="colors_tree"
                    />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem :item-key="3">
                  <CAccordionHeader>
                    {{ $t('Class filter') }}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <treeselect
                      :key="'treeselect_'+filters.class_id"
                      v-model="filters.class_id"
                      :multiple="true"
                      open-direction="bottom"
                      :options="classes_tree"
                    />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem :item-key="4">
                  <CAccordionHeader>
                    {{ $t('Violation filter') }}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <treeselect
                      :key="'treeselect_'+filters.violation_id"
                      v-model="filters.violation_id"
                      :multiple="true"
                      open-direction="bottom"
                      :options="violations_tree"
                    />
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem :item-key="5">
                  <CAccordionHeader>
                    {{ $t('Site filter') }}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <treeselect
                      :key="'treeselect_'+filters.site_id"
                      v-model="filters.site_id"
                      :multiple="true"
                      open-direction="bottom"
                      :options="sites_tree"
                    />
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </div>
          </div>

          <CDropdown variant="btn-group me-2">
            <CDropdownToggle
              color="light"
              @click="showFilters=false"
            >
              {{ $t('Order') }}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                v-for="(v, i) in orderByList"
                :key="'orderByList_'+i"
                :class="orderBy === v ? 'active' : ''"
                @click="setOrderBy(v)"
              >
                {{ v }}
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem
                :class="order === 'asc' ? 'active' : ''"
                @click="setOrder('asc')"
              >
                {{ $t('Ascending') }}
              </CDropdownItem>
              <CDropdownItem
                :class="order === 'desc' ? 'active' : ''"
                @click="setOrder('desc')"
              >
                {{ $t('Descending') }}
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <div class="d-flex flex-column flex-lg-row">
            <div
              v-if="(filters.from_date!==undefined && filters.from_date !== '') || (filters.to_date!==undefined && filters.to_date !== '')"
              class="filter-badge-holder mt-2 mt-lg-0 me-2"
            >
              {{ $t('Date') }}:
              <CBadge
                v-if="filters.from_date!==undefined && filters.from_date !== ''"
                class="ms-1"
              >
                <CIcon
                  :icon="cilX"
                  size="sm"
                  class="me-1"
                  @click="removeFromDateFilter()"
                />
                {{ filters.from_date }}
              </CBadge>
              <CBadge
                v-if="filters.to_date!==undefined && filters.to_date !== ''"
                class="ms-1"
              >
                <CIcon
                  :icon="cilX"
                  size="sm"
                  class="me-1"
                  @click="removeToDateFilter()"
                />
                {{ filters.to_date }}
              </CBadge>
            </div>
            <div
              v-if="filters.color_id!==undefined && filters.color_id.length !== 0"
              class="filter-badge-holder mt-2 mt-lg-0 me-2"
            >
              {{ $t('Colors') }}:
              <CBadge
                v-for="color in filteredColors"
                :key="'color_'+color.title"
                class="ms-1"
              >
                <CIcon
                  :icon="cilX"
                  size="sm"
                  class="me-1"
                  @click="removeColorFromFilterList(color.id)"
                />
                {{ color.title }}
              </CBadge>
            </div>
            <div
              v-if="filters.class_id!==undefined && filters.class_id.length !== 0"
              class="filter-badge-holder mt-2 mt-lg-0 me-2"
            >
              {{ $t('Classes') }}:
              <CBadge
                v-for="classObj in filteredClasses"
                :key="'class_'+classObj.title"
                class="ms-1"
              >
                <CIcon
                  :icon="cilX"
                  size="sm"
                  class="me-1"
                  @click="removeClassFromFilterList(classObj.id)"
                />
                {{ classObj.title }}
              </CBadge>
            </div>
            <div
              v-if="filters.violation_id!==undefined && filters.violation_id.length !== 0"
              class="filter-badge-holder mt-2 mt-lg-0 me-2"
            >
              {{ $t('Violations') }}:
              <CBadge
                v-for="violation in filteredViolations"
                :key="'violation_'+violation.title"
                class="ms-1"
              >
                <CIcon
                  :icon="cilX"
                  size="sm"
                  class="me-1"
                  @click="removeViolationFromFilterList(violation.id)"
                />
                {{ violation.title }}
              </CBadge>
            </div>
            <div
              v-if="filters.site_id!==undefined && filters.site_id.length !== 0"
              class="filter-badge-holder mt-2 mt-lg-0 me-2"
            >
              {{ $t('Sites') }}:
              <CBadge
                v-for="site in filteredSites"
                :key="'site_'+site.title"
                class="ms-1"
              >
                <CIcon
                  :icon="cilX"
                  size="sm"
                  class="me-1"
                  @click="removeSiteFromFilterList(site.id)"
                />
                {{ site.title }}
              </CBadge>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  </div>
  <div class="row mb-4">
    <template
      v-if="loading"
    >
      <div class="col-12">
        <CCard>
          <CCardBody>
            <p class="text-center w-100 mb-0">
              {{ $t('Loading data') }} ...
            </p>
          </CCardBody>
        </CCard>
      </div>
    </template>
    <template
      v-else-if="list.length===0"
    >
      <div class="col-12">
        <CCard>
          <CCardBody>
            <p class="text-center w-100 mb-0">
              {{ $t('No Results Found') }}.
              <span
                v-if="isFiltered"
                style="cursor: pointer"
                class="text-info"
                @click="clearFilters"
              >[{{ $t('clear filters') }}]</span>
            </p>
          </CCardBody>
        </CCard>
      </div>
    </template>
    <template
      v-for="(item, index) in list"
      v-else
      :key="index"
    >
      <div class="col-12 col-xl-2 col-lg-3 col-md-3 col-sm-4">
        <VehicleCard
          :item="item"
          @onItemDelete="showDeleteConfirm"
          @onShowDetails="showDetails"
        />
      </div>
    </template>
  </div>

  <div class="row mb-4">
    <div class="col-12">
      <CCard>
        <CCardBody class="p-0">
          <div class="row">
            <div class="col-12 col-xl-6 col-lg-6">
              <paginate
                v-model="pagination.current_page"
                :page-count="pagination.last_page"
                :click-handler="setPage"
                :prev-text="$t('Prev')"
                :next-text="$t('Next')"
                :container-class="'className ms-3 mt-3 pagination'"
              />
            </div>
            <div class="col-12 col-xl-6 col-lg-6 d-flex justify-content-start justify-content-lg-end py-3 ms-lg-0 ms-3">
              <span style="line-height: 38px;margin-right: 10px;">
                {{ $t('Showing') }} {{ pagination.from }} {{ $t('to') }} {{ pagination.to }} {{
                  $t('of')
                }} {{ pagination.total }} {{ $t('items') }}
              </span>
              <CDropdown variant="btn-group">
                <CDropdownToggle
                  color="light"
                  @click="showFilters=false"
                >
                  {{ perPage }}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    v-for="(v, i) in perPageList"
                    :key="'perPageList_'+i"
                    :class="perPage === v ? 'active' : ''"
                    @click="setPerPage(v)"
                  >
                    {{ v }}
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <span
                class="me-3"
                style="line-height: 38px;margin-left: 10px;"
              >
                {{ $t('records per page') }}
              </span>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  </div>
  <CModal
    :visible="showDeleteConfirmModal"
    @close="() => { showDeleteConfirmModal = false }"
  >
    <CModalHeader>
      <CModalTitle>{{ $t('Delete') }}</CModalTitle>
    </CModalHeader>
    <CModalBody>{{ $t('Are you sure you want to delete this?') }}</CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="() => { showDeleteConfirmModal = false }"
      >
        {{ $t('Cancel') }}
      </CButton>
      <CButton
        color="danger"
        @click="deleteItem()"
      >
        {{ $t('Delete') }}
      </CButton>
    </CModalFooter>
  </CModal>
  <CModal
    :visible="showDetailsModal"
    size="lg"
    @close="() => { showDetailsModal = false }"
  >
    <CModalHeader>
      <CModalTitle>{{ vehicle.class_id }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <img
        class="rounded"
        :src="vehicle.car_img"
        style="width: 100%;"
      >
      <h5 class="card-title py-2">
        <span v-text="vehicle.class_title" />
        <span
          class="color-badge"
          :style="'background:'+vehicle.color_value"
        />
      </h5>
      <ul style="padding: 0;margin-bottom: 0;list-style: none">
        <li style="font-size: 12px;">
          <CIcon
            :icon="cilClock"
            size="sm"
            style="margin-right: 4px;"
          />
          {{ vehicleDate }}
        </li>
      </ul>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="() => { showDetailsModal = false }"
      >
        {{ $t('Cancel') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import Notifications from '@/components/Notifications'
import {mapActions, mapGetters} from 'vuex'
import VehicleCard from "@/components/vehiecles/VehicleCard";
import Treeselect from 'vue3-treeselect'
import 'vue3-treeselect/dist/vue3-treeselect.css'
import {CIcon} from '@coreui/icons-vue';
import {cilFilter, cilX, cilClock} from '@coreui/icons';
import Paginate from "vuejs-paginate-next";

export default {
  name: 'Traffic',
  components: {VehicleCard, Notifications, Treeselect, CIcon,
    paginate: Paginate,},
  setup() {
    return {
      cilFilter,
      cilX,
      cilClock,
    }
  },
  data() {
    return {
      vehicleData: null,
      detailsModal: false,
      selectedFilter: '',
      showFilters: false,
      filtersChanged: false,
      showDeleteConfirmModal: false,
      showDetailsModal: false,
      orderByList: [
        'Color',
        'Class',
        'Site',
        'Violation',
        'Time',
      ],
      perPageList: [
        12, 24, 48
      ],
      filters: {
        color_id: undefined,
        class_id: undefined,
        site_id: undefined,
        violation_id: undefined,
        from_date: undefined,
        to_date: undefined,
      }
    }
  },
  methods: {
    ...mapActions('vehicles', [
      'setPage',
      'setPerPage',
      'setOrder',
      'setOrderBy',
    ]),
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    showDetailModal(vehicle) {
      this.vehicleData = vehicle
      this.detailsModal = true
    },
    applyFilters() {
      // closing filters dropdown
      this.showFilters = false;

      // refresh data
      this.$store.dispatch('vehicles/index', this.filters).then(() => this.filtersChanged = false)
    },
    clearFilters() {
      let cleanFilters = {
        ...this.filters
      };
      for (let prop in cleanFilters) {
        cleanFilters[prop] = undefined;
      }

      this.filters = cleanFilters;

      this.applyFilters();
    },
    shadeColor(color, amount) {
      return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    },
    invertColor(hex, bw = true) {
      if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
      }
      var r = parseInt(hex.slice(0, 2), 16),
          g = parseInt(hex.slice(2, 4), 16),
          b = parseInt(hex.slice(4, 6), 16);
      if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
      }
      // invert color components
      r = (255 - r).toString(16);
      g = (255 - g).toString(16);
      b = (255 - b).toString(16);
      // pad each with zeros and return
      return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
    },
    padZero(str, len) {
      len = len || 2;
      var zeros = new Array(len).join('0');
      return (zeros + str).slice(-len);
    },
    removeColorFromFilterList(id) {
      this.filters.color_id = this.filters.color_id.filter(i => i !== id);
      if (this.filters.color_id.length === 0) {
        this.filters.color_id = undefined;
      }
      this.applyFilters();
    },
    removeClassFromFilterList(id) {
      this.filters.class_id = this.filters.class_id.filter(i => i !== id);
      if (this.filters.class_id.length === 0) {
        this.filters.class_id = undefined;
      }
      this.applyFilters();
    },
    removeSiteFromFilterList(id) {
      this.filters.site_id = this.filters.site_id.filter(i => i !== id);
      if (this.filters.site_id.length === 0) {
        this.filters.site_id = undefined;
      }
      this.applyFilters();
    },
    removeViolationFromFilterList(id) {
      this.filters.violation_id = this.filters.violation_id.filter(i => i !== id);
      if (this.filters.violation_id.length === 0) {
        this.filters.violation_id = undefined;
      }
      this.applyFilters();
    },
    removeFromDateFilter() {
      this.filters.from_date = undefined;
      this.applyFilters();
    },
    removeToDateFilter() {
      this.filters.to_date = undefined;
      this.applyFilters();
    },
    showDetails(object) {
      this.vehicle = object;
      this.showDetailsModal = true;
    },
    showDeleteConfirm(object) {
      this.vehicle = object;
      this.showDeleteConfirmModal = true;
    },
    deleteItem() {
      this.$store.dispatch('vehicles/remove', this.vehicle)
          .then(() => {
            this.showDeleteConfirmModal = false;
          })
    },
    previousPage() {
      if (this.pagination.current_page === 1 || !this.list.length) {
        return;
      }
      this.setPage(Math.max(this.pagination.current_page - 1, 1))
    },
    nextPage() {
      if (this.pagination.current_page === this.pagination.last_page || !this.list.length) {
        return;
      }
      this.setPage(Math.min(this.pagination.current_page + 1, this.pagination.last_page))
    },
  },
  created() {
    this.$store.commit('vehicles/clearNotifications')
  },
  mounted() {
    this.$store.dispatch('vehicles/index')
    this.$store.dispatch('colors/index')
    this.$store.dispatch('classes/index')
    this.$store.dispatch('sites/index')
    this.$store.dispatch('violations/index')
  },
  computed: {
    ...mapGetters('vehicles', {
      notifications: 'notifications',
      list: 'list',
      pagination: 'listPagination',
      loading: 'isLoading',
      orderBy: 'orderBy',
      order: 'order',
      page: 'page',
      perPage: 'perPage',
      data: 'data',
    }),
    ...mapGetters('colors', {
      colors: 'list',
    }),
    ...mapGetters('violations', {
      violations: 'list',
    }),
    ...mapGetters('sites', {
      sites: 'list',
    }),
    ...mapGetters('classes', {
      classes: 'list',
    }),
    vehicle: {
      get() {
        return this.data
      },
      set(value) {
        if (value)
          this.$store.commit('vehicles/setData', value)
        else
          this.$store.commit('vehicles/clearData')
      }
    },
    vehicleDate() {
      return (new Date(this.vehicle.date * 1000)).toLocaleString()
    },
    isFiltered() {
      return !Object.values(this.filters).every(el => el === undefined)
    },
    pagination_visible_buttons() {
      let elements = [];
      let maxNumbersCount = 5; // must be odd


      if (this.pagination.last_page <= maxNumbersCount) {
        for (let i = 1; i <= this.pagination.last_page; i++) {
          elements.push(i);
        }

        return elements;
      }

      let t = Math.floor(maxNumbersCount / 2);
      if (this.pagination.last_page < t) {
        // Case without any breaks
        for (let i = 1; i <= this.pagination.last_page; i++) {
          elements.push(i);
        }
      } else if (this.pagination.current_page >= this.pagination.last_page - t) {
        // Case with breaks at beginning
        elements.push(1)
        elements.push('.');
        for (let i = this.pagination.current_page - t; i <= this.pagination.last_page; i++) {
          elements.push(i);
        }
      } else if (this.pagination.current_page <= t + 1) {
        // Case with breaks at end
        for (let i = 1; i <= this.pagination.current_page + t; i++) {
          elements.push(i);
        }
        elements.push('.');
        elements.push(this.pagination.last_page);
      } else {
        // Case with breaks at beginning and end
        elements.push(1)
        elements.push('.');
        for (let i = this.pagination.current_page - t; i <= this.pagination.current_page + t; i++) {
          elements.push(i);
        }
        elements.push('.');
        elements.push(this.pagination.last_page);
      }
      return elements;
    },
    colors_tree() {
      return this.colors.map(c => {
        return {
          id: c.id,
          label: c.title,
        }
      })
    },
    classes_tree() {
      return this.classes.map(c => {
        return {
          id: c.id,
          label: c.title,
        }
      })
    },
    violations_tree() {
      return this.violations.map(c => {
        return {
          id: c.id,
          label: c.title,
        }
      })
    },
    sites_tree() {
      return this.sites.map(c => {
        return {
          id: c.id,
          label: c.title,
        }
      })
    },
    selectedFilterTypeCount() {
      let count = 0;
      Object.values(this.filters).map(el => {
        if (el !== undefined) {
          count++;
        }
      })
      return count === 6 ? 5 : count;
    },
    filteredColors() {
      if (this.filters.color_id === undefined) {
        return [];
      }
      return this.colors.filter(f => this.filters.color_id.indexOf(f.id) > -1);
    },
    filteredClasses() {
      if (this.filters.class_id === undefined) {
        return [];
      }
      return this.classes.filter(f => this.filters.class_id.indexOf(f.id) > -1);
    },
    filteredViolations() {
      if (this.filters.violation_id === undefined) {
        return [];
      }
      return this.violations.filter(f => this.filters.violation_id.indexOf(f.id) > -1);
    },
    filteredSites() {
      if (this.filters.site_id === undefined) {
        return [];
      }
      return this.sites.filter(f => this.filters.site_id.indexOf(f.id) > -1);
    },
  },
  watch: {
    filters: {
      handler() {
        this.filtersChanged = true;
      },
      deep: true,
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

.filter-badge-holder {
  height: 38px !important;
  padding: 0 6px 0 8px;
  margin-top: -2px;
  line-height: 38px;
  background: rgb(89, 161, 213);
  color: #fff;
  border-radius: 0.375rem;
  position: relative;
  vertical-align: middle;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.filter-badge-holder .badge {
  background: #2c6493 !important;
  padding: 6px 8px !important;
}

.filter-badge-holder .badge .icon {
  color: #fefefe !important;
  cursor: pointer;
}

svg.icon {
  background: #1c486e;
  padding: 2px;
  border-radius: 3px;
}
</style>