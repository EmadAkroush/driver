<template>
  <div>
    <AppSidebar v-if="isAuthenticated" />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader v-if="isAuthenticated" />
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
      <AppFooter v-if="isAuthenticated" />
    </div>
  </div>
</template>
<script>
import {CContainer} from '@coreui/vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    }
  }
}
</script>
