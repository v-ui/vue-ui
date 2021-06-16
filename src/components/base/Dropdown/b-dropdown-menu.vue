<template>
  <div>
    <b-dropdown-header v-if="header || $slots.header">
      <slot name="header">
        <b-label
          :label="header && header.text || header"
          :info="header && header.info"
          :icon="header && header.icon"
        />
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
        :icon="item.icon"
      />
      <b-dropdown-item
        v-else
        :label="getDisplay(item)"
        :href="item.href"
        :info="item.info"
        :icon="item.icon"
        :active="isSelected(item)"
        :disabled="disabled || item.disabled"
        @click.native="itemClick(item)"
      >
        <slot
          name="item"
          :item="item"
        />
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

import BLabel from '@/components/basic/basic-label.vue'

export default {
  name: "BDropdownMenu",
  components: {
    BDropdownHeader,
    BDropdownDivider,
    BDropdownItem,
    BDropdownText,
    BLabel,
  },
  mixins: [ util.mixins.select.check, ],
  props: {
    showNull: util.props.Boolean,
    header: [ String, Number, Object ],
    disabled: util.props.Boolean,
  },
  methods: {
    itemClick: function(item) {
      if (this.isMultiple) {
        const value = this.getKey(item)
        let index = this.selectedMap.indexOf(value)
        index >= 0
          ? this.selectedValue.splice(index, 1)
          : this.selectedValue.push(item)
      } else {
        this.selectedValue = item
      }
      this.$emit('item:click', this.selectedValue)
    },
  },
};
</script>
