<template>
  <!-- Position it -->
  <div
    class="toast-container position-absolute p-3"
    :class="objClass"
    style="max-height: 480px;"
  >
    <b-toast
      v-for="(item, index) in list"
      :key="index"
      :time="item.time"
      :icon="item.icon"
      :info="item.info"
      :delay="item.delay"
      :titke="item.title"
      :status="item.status"
      :content="item.content"
      :autohide="item.autohide"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BToast from "./b-toast";

export default {
  name: "BToasts",
  components: { BToast },
  props: {
    list: util.props.Array,
    placement: util.props.placement,
  },
  computed: {
    objClass: function() {
      let placement = 'top-0 end-0'
      switch (this.placement) {
        // top
        case 'top-start':
          placement = 'top-0 start-0'
          break
        case 'top-center':
          placement = 'top-0 start-50 translate-middle-x'
          break
        case 'top-end':
          placement = "top-0 end-0"
          break
        // middle
        case 'middle-start':
          placement = "top-50 start-0 translate-middle-y"
          break
        case 'middle-center':
          placement = "top-50 start-50 translate-middle"
          break
        case 'middle-end':
          placement = "top-50 end-0 translate-middle-y"
          break
        // bottom
        case 'bottom-start':
          placement = 'bottom-0 start-0'
          break
        case 'bottom-center':
          placement = 'bottom-0 start-50 translate-middle-x'
          break
        case 'bottom-end':
          placement = "bottom-0 end-0"
          break
      }
      return placement
    },
  },
};
</script>
