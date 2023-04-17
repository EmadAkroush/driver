<template>
  <CToaster
    :autohide="3000"
    style="top: 0;left: 0;"
  >
    <CToast
      v-for="(err, index) in notifications.errors"
      :key="'toast' + index"
      :show="true"
      color="danger"
    >
      <CToastHeader
        close-button="{toast.closeButton}"
        class="d-flex justify-content-between"
      >
        {{ err.title }}
      </CToastHeader>
      <CToastBody>
        {{ err.detail }}
      </CToastBody>
    </CToast>
    
    <!-- success -->
    <CToast
      v-for="(msg, index) in notifications.success"
      :key="'toast' + index"
      :show="true"
      color="success"
    >
      <CToastHeader
        close-button="{toast.closeButton}"
        class="d-flex justify-content-between"
      >
        {{ msg.title }}
      </CToastHeader>
      <CToastBody>
        {{ msg.detail }}
      </CToastBody>
    </CToast>

    <!-- warning -->
    <CToast
      v-for="(msg, index) in notifications.warning"
      :key="'toast' + index"
      :show="true"
      color="warning"
    >
      <CToastHeader
        close-button="{toast.closeButton}"
        class="d-flex justify-content-between"
      >
        {{ msg.title }}
      </CToastHeader>
      <CToastBody>
        {{ msg.detail }}
      </CToastBody>
    </CToast>


    <!-- info -->
    <CToast
      v-for="(msg, index) in notifications.info"
      :key="'toast' + index"
      :show="true"
      color="info"
    >
      <CToastHeader
        close-button="{toast.closeButton}"
        class="d-flex justify-content-between"
      >
        {{ msg.title }}
      </CToastHeader>
      <CToastBody>
        {{ msg.detail }}
      </CToastBody>
    </CToast>

  </CToaster>
</template>

<script>
export default {
  name: 'Notifications',
  props: {
    notifications: Object,
  },
}
</script>
