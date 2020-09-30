<template>
  <div>
    <!-- TODO: debug with item.label and item.value -->
    <div
      v-for="(item, index) in list"
      :key="index"
    >
      <h6
        v-if="item.header"
        class="dropdown-header mb-0"
      >
        <slot>{{ item.header }}</slot>
        <b-info :info="item.info" />
      </h6>
      <div
        v-else-if="item.divider"
        class="dropdown-divider"
      />
      <b-dropdown-item
        v-else-if="item.value"
        :label="item.label || item.value"
        :href="item.href"
        :info="item.info"
        :active="select ? select == item.value : item.active"
        :disabled="disabled || item.disabled"
        @click.native="$emit('click', item)"
      />
      <b-dropdown-item-text
        v-else-if="item.text"
        :text="item.text"
        :info="item.info"
      />
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BDropdownItem from "./b-dropdown-item.vue";
import BDropdownItemText from "./b-dropdown-item-text.vue";

import BInfo from "@/components/basic/basic-info.vue"

export default {
  name: "BDropdownMenu",
  components: {
    BDropdownItem,
    BDropdownItemText,
    BInfo,
  },
  props: {
    list: util.props.Array,
    select: util.props.String,
    disabled: util.props.Boolean,
  }
};
</script>
