<template>
  <div class="bg-light min-vh-100 d-flex flex-row">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol>
          <div style="height:480px; width:100%">
            <l-map
              ref="map"
              :zoom="zoom"
              :center="center"
            >
              <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
              />
            </l-map>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import {LMap, LTileLayer} from "@vue-leaflet/vue-leaflet";

export default {
  name: 'ManageSites',
  components: {LMap, LTileLayer,},
  setup() {
    const center = [38.02562, 46.36563];
    // const center = [-74.044502, 40.689247];
    const zoom = 15;

    return {center, zoom};
  },
}
</script>
