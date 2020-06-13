<template>
  <div aria-live="polite" aria-atomic="true" class="position-fixed" style="max-height: 500px;">
    <!-- Position it -->
    <div class="position-absolute overflow-auto pr-2" style="max-height: 480px; top: 0; right: 0;">
      <b-toast
        v-for="(item, index) in list"
        :key="index"
        :href="item.href"
        :time="item.time"
        :icon="item.icon"
        :delay="item.delay"
        :titke="item.title"
        :status="item.status"
        :content="item.content"
        :autohide="item.autohide"
      />
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BToast from "./b-toast";

export default {
  name: "b-toasts",
  components: { BToast },
  props: {
    list: util.props.Array,
  }
};
</script>
