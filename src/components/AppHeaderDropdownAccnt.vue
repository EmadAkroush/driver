<template>
  <CDropdown>
    <CDropdownToggle
      placement="bottom-end"
      class="py-0"
      style="border:none"
      :caret="false"
    >
      <CAvatar
        :src="avatar"
        size="md"
      />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-light fw-semibold py-2"
      >
        {{ $t('Settings') }}
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon icon="cil-user" />
        {{ $t('Profile') }}
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-settings" />
        {{ $t('Settings') }}
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem
        style="cursor:pointer;"
        @click="logout"
      >
        <CIcon icon="cil-lock-locked" />
        {{ $t('Logout') }}
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/blank.jpeg'

export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
