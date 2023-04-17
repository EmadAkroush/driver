<template>
  <router-view />
</template>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>

<style>
.vpd-input-group input {
  border-left: none !important;
  border-right: 1px solid #dadada !important;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0.375rem !important;
  border-bottom-right-radius: 0.375rem !important;
}

.vpd-input-group .vpd-clear-btn {
  right: 0;
  left: unset !important;
}
</style>