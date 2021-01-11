<template>
  <div>
    <!-- TODO: debug with item.label and item.value -->
    <b-dropdown-header v-if="header || $slots.header">
      <slot name="header">
        {{ header && header.text || header }}
        <b-info v-if="header && header.info" :info="header.info" />
      </slot>
    </b-dropdown-header>
    <b-dropdown-item
      v-if="showNull"
      :label="nullValue"
      :disabled="disabled"
      @click.native="itemClick(null)"
    />
    <div
      v-for="(item, index) in list"
      :key="index"
    >
      <b-dropdown-divider v-if="item.divider" />
      <b-dropdown-text
        v-else-if="item.text"
        :text="item.text"
        :info="item.info"
      />
      <b-dropdown-item
        v-else-if="item.value"
        :label="item.label || item.value"
        :href="item.href"
        :info="item.info"
        :active="isChecked(item)"
        :disabled="disabled || item.disabled"
        @click.native="itemClick(item)"
      >
        <slot name="item" :item="item" />
      </b-dropdown-item>
    </div>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BDropdownHeader from './b-dropdown-header'
import BDropdownDivider from './b-dropdown-divider'
import BDropdownItem from "./b-dropdown-item.vue";
import BDropdownText from "./b-dropdown-text.vue";

import BInfo from "@/components/basic/basic-info.vue"

export default {
  name: "BDropdownMenu",
  components: {
    BDropdownHeader,
    BDropdownDivider,
    BDropdownItem,
    BDropdownText,
    BInfo,
  },
  mixins: [ util.mixins.select.check, ],
  props: {
    nullValue: util.props.String,
    showNull: util.props.Boolean,
    multiple: util.props.Boolean,
    header: [ String, Number, Object ],
    disabled: util.props.Boolean,
  },
  data() {
    return {
      isMultiple: this.multiple,
    }
  },
  methods: {
    itemClick: function(item) {
      if (this.isMultiple) {
        const value = item && item[this.primaryKey || 'value'] || item
        let index = this.checkedMap.indexOf(value)
        index >= 0
          ? this.checkedValues.splice(index, 1)
          : this.checkedValues.push(item)
      } else {
        this.checkedValues = item
      }
      this.$emit('item:click', this.checkedValues)
    },
  },
};
</script>
