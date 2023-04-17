<template>
  <CHeader
    position="sticky"
    class="mb-4"
  >
    <CContainer fluid>
      <CHeaderToggler
        class="ps-1"
        @click="$store.commit('toggleSidebar')"
      >
        <CIcon
          icon="cil-menu"
          size="lg"
        />
      </CHeaderToggler>
      <CHeaderBrand
        class="mx-auto d-lg-none"
        to="/"
      >
        <CIcon
          style="padding-top: 10px;"
          :icon="logoNegative"
          height="35"
          alt="Logo"
        />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/dashboard"
          >
            {{ $t('dashboard') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/users"
          >
            {{ $t('users') }}
          </router-link>
        </li>
      </CHeaderNav>
      <CHeaderNav>
        <CDropdown
          ref="language_switcher"
          color="secondary"
          toggler-text="Dropdown button"
          direction="center"
        >
          <CDropdownToggle
            component="a"
          >
            {{ current_language.label }}
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              v-for="language in language_list"
              :key="'language_'+language.locale"
              @click="setLanguage(language)"
              v-text="language.label"
            />
          </CDropdownMenu>
        </CDropdown>
        <!--
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-list" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-envelope-open" size="lg" />
          </CNavLink>
        </CNavItem>
        -->
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import {logoNegative} from '@/assets/brand/logo-negative'

export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  setup() {
    return {
      logoNegative,
    }
  },
  data() {
    return {
      current_language: {},
      languages: [
        {
          label: 'English',
          locale: 'en',
          dir: 'ltr'
        },
        {
          label: 'فارسی',
          locale: 'fa',
          dir: 'rtl'
        },
        {
          label: 'عربی',
          locale: 'ar',
          dir: 'rtl'
        }
      ]
    }
  },
  computed: {
    language_list() {
      return this.languages.filter(l => l.locale !== this.current_language.locale);
    }
  },
  mounted() {
    this.current_language = this.$cookies.get('language_object') ?? {
      label: 'English',
      locale: 'en',
      dir: 'ltr'
    };
    this.setHtmlDirection(this.current_language);
  },
  methods: {
    setLanguage(language) {
      this.$cookies.set('language_object', language);
      this.current_language = language;
      this.setHtmlDirection(language);
    },
    setHtmlDirection(language) {
      let htmlEl = document.querySelector('html');
      htmlEl.setAttribute('dir', language.dir);
      htmlEl.setAttribute('lang', language.locale);
      this.$i18n.locale = language.locale
    }
  }
}
</script>
