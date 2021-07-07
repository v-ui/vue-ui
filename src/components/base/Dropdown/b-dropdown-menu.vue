<template>
  <div>
    <b-dropdown-header v-if="search">
      <b-text
        v-model="query"
        class="cannt-hide"
        type="search"
        hide-icon
        size="sm"
      />
    </b-dropdown-header>
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
      v-if="showNull && !query"
      :label="nullValue"
      :disabled="disabled"
      @click.native="itemClick(null)"
    />
    <div
      v-for="(item, index) in queryList"
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
import BText from "@/components/form/b-text.vue";

export default {
  name: "BDropdownMenu",
  components: {
    BDropdownHeader,
    BDropdownDivider,
    BDropdownItem,
    BDropdownText,
    BLabel,
    BText,
  },
  mixins: [ util.mixins.select.check, ],
  props: {
    showNull: util.props.Boolean,
    header: [ String, Number, Object ],
    disabled: util.props.Boolean,
    search: util.props.Boolean,
  },
  data() {
    return {
      query: null,
    }
  },
  computed: {
    queryList: function() {
      return this.query
        ? this.list.filter(e => {
            if (e.divider || e.text) return false
            let value = this.getKey(e)
            let label = this.getDisplay(e)
            return value && value.toLowerCase && value.toLowerCase().includes(this.query.toLowerCase()) ||
                  label && label.toLowerCase && label.toLowerCase().includes(this.query.toLowerCase())
          })
        : this.list
    },
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
