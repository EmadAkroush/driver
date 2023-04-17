<template>
  <Notifications :notifications="notifications" />
  <div class="row mb-4">
    <div class="col-12">
      <CCard>
        <CCardBody
          class="d-block d-lg-flex"
          style="align-items: center;"
        >
          <CDropdown variant="btn-group me-2">
            <CDropdownToggle
              color="light"
              @click="showFilters = false"
            >
              {{ $t('Order') }}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                v-for="(v, i) in orderByList"
                :key="'orderByList_' + i"
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
          <CButton @click="test()" variant="primary">Add</CButton>
        </CCardBody>
      </CCard>
    </div>
  </div>

  <div class="row mb-4">
    <template v-if="loading">
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
    <template v-else-if="list.length === 0">
      <div class="col-12">
        <CCard>
          <CCardBody>
            <p class="text-center w-100 mb-0">
              {{ $t('No Results Found') }}.
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
      <div class="col-12 col-xl-3 col-lg-3 col-md-3 col-sm-4">
        <UserCard
          :item="item"
          @onItemDelete="showDeleteConfirm(item)"
          @onItemStatusSwitch="switchUserStatus(item)"
          @onItemEdit="onItemEdit(item)"
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
                  @click="showFilters = false"
                >
                  {{ perPage }}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    v-for="(v, i) in perPageList"
                    :key="'perPageList_' + i"
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
    :visible="showUserForm"
    @close="() => { showUserForm = false }"
  >
    <CModalHeader>
      <CModalTitle>
        {{ user.id > 0 ? $t('Editing ') + user.first_name + ' ' + user.last_name : $t('New User') }}
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <form>
        <div class="mb-3">
          <label
            for="formGroupExampleInput"
            class="form-label"
          >{{ $t('First Name') }}</label>
          <input
            id="formGroupExampleInput"
            v-model="user.first_name"
            type="text"
            class="form-control"
          >
        </div>
        <div class="mb-3">
          <label
            for="formGroupExampleInput2"
            class="form-label"
          >{{ $t('Last Name') }}</label>
          <input
            id="formGroupExampleInput2"
            v-model="user.last_name"
            type="text"
            class="form-control"
          >
        </div>
      </form>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="() => { showUserForm = false }"
      >
        {{ $t('Cancel') }}
      </CButton>
      <CButton
        color="primary"
        @click="saveUser()"
      >
        {{ $t('Save') }}
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Notifications from "@/components/Notifications";
import UserCard from "@/components/users/UserCard";


export default {
  name: 'Clients',
  components: {
    UserCard,
    Notifications,
  },
  data() {
    return {
      showDeleteConfirmModal: false,
      showUserForm: false,
      orderByList: [
        'Name',
      ],
      perPageList: [
        12, 24, 48
      ],
    }
  },
  created() {
    this.$store.commit('users/clearNotifications')
  },
  mounted() {
    this.$store.dispatch('users/index')
  },
  methods: {
    test(){
      let payload = {first_name : "a", last_name :  "b", username : "c", password : 5, admin : "no" /*, roles*/}
      this.$store.dispatch('users/create' , payload);
    },
    ...mapActions('users', [
      'setPage',
      'setPerPage',
      'setOrder',
      'setOrderBy',
    ]),

    showDetails(object) {
      this.user = object;
      this.showDetailsModal = true;
    },
    showDeleteConfirm(object) {
      this.user = object;
      this.showDeleteConfirmModal = true;
    },
    switchUserStatus(object) {
      let payload = {
        id: object.id,
        active: !object.active
      }
      this.$store.dispatch('users/active', payload)
        .then(() => {
          object.active = !object.active
        })
    },
    onItemEdit(object) {
      this.user = object
      this.showUserForm = true;
    },
    deleteItem() {
      this.$store.dispatch('users/remove', this.user)
        .then(() => {
          this.showDeleteConfirmModal = false;
        })
    },
    saveUser() {
      if (this.user.id > 0) {
        //editing
        this.$store.dispatch('users/update', this.user)
          .then(() => {
            this.showUserForm = false;
          })
      }
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
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters('users', {
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
    user: {
      get() {
        return this.data
      },
      set(value) {
        if (value)
          this.$store.commit('users/setData', value)
        else
          this.$store.commit('users/clearData')
      }
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
  },
}
</script>