<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">
              Oops!
            </h1>
            <h4 class="pt-3">
              Unavailable Page
            </h4>
            <p class="text-medium-emphasis float-start">
              The page you are looking for was not availabe on demo versions.
            </p>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Demo',
}
</script>
