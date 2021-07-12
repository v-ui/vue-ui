<template>
  <b-list>
    <label
      v-for="(item, index) in list"
      class="list-group-item"
      :key="index"
    >
      <b-check
        :type="type"
        :name="name"
        class="me-1"
        :checked="isSelected(item)"
        :value="getKey(item)"
        :disabled="disabled || item.disabled"
        @input.native="input(item)"
      />
      <slot>{{ getDisplay(item) }}</slot>
    </label>
  </b-list>
</template>

<script>
import util from "@/components/util/index.js";

import BList from './b-list.vue';
import BCheck from "@/components/form/Check/b-check.vue"
export default {
  name: 'BCheckList',
  components: { BList, BCheck },
  mixins: [ util.mixins.select.check,],
  props: {
    list: util.props.Array,
    type: {
      type: String,
      default: 'radio',
      validator: value => ['radio', 'checkbox'].includes(value),
    },
    name: util.props.String,
    color: {
      ...util.props.color,
      default: "white"
    },
    numbered: util.props.Boolean,
    disabled: util.props.Boolean,
    flush: util.props.Boolean,
    inline: util.props.Boolean,
    fill: util.props.Boolean,
  },
  data() {
    return {
      isMultiple: this.type !== 'radio',
    }
  },
   methods: {
    input: function(item) {
      if (this.isMultiple) {
        const key = this.getKey(item)
        let index = this.selectedMap.indexOf(key)
        index >= 0
          ? this.selectedValue.splice(index, 1)
          : this.selectedValue.push(item)
      } else {
        this.selectedValue = item
      }
    },
  },
}
</script>
