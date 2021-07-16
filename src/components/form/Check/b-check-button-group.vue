<template>
  <div>
    <div
      class="btn-group"
      :class="groupClass"
      role="group"
    >
      <template v-for="(item, index) in list">
        <b-check
          :key="'check-'+index"
          :id="`${id}-${index}`"
          :type="type"
          class="btn-check"
          :name="name"
          autocomplete="off"
          :checked="isSelected(item)"
          :value="getKey(item)"
          :disabled="disabled || item.disabled"
          @input.native="click(item)"
        />
        <label
          :key="'label-'+index"
          :for="`${id}-${index}`"
          class="btn"
          :class="btnClass"
        >
          {{ getDisplay(item) }}
        </label>

      </template>
    </div>
    <b-info :info="info" />
  </div>
</template>

<script>
import tool from "@/tools/index.js"
import util from "@/components/util/index.js";

import BCheck from "./b-check.vue"
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BCheckButtonGroup",
  components: { BCheck, BInfo },
  mixins: [ util.mixins.select.check, ],
  props: {
    list: util.props.Array,
    type: {
      type: String,
      default: 'radio',
      validator: value => ['radio', 'checkbox'].includes(value),
    },
    size: util.props.size,
    color: util.props.color,
    outline: util.props.Boolean,
    info: util.props.String,
    disabled: util.props.Boolean,
    name: {
      ...util.props.String,
      required: true
    },
    id: {
      type: String,
      default: function() {
        return "check-button-group-" + tool.random.getRandomString();
      }
    },
  },
  data() {
    return {
      isMultiple: this.type !== 'radio',
    }
  },
  computed: {
    groupClass: function() {
      let size = this.size ? `btn-group-${this.size}` : ''
      return `${size}`
    },
    btnClass: function() {
      return `btn-${this.outline ? 'outline-' : ''}${this.color}`
    },
  },
  methods: {
    click: function(item) {
      if (this.isMultiple) {
        const value = this.getKey(item)
        let index = this.selectedMap.indexOf(value)
        index >= 0
          ? this.selectedValue.splice(index, 1)
          : this.selectedValue.push(item)
      } else {
        this.selectedValue = item
      }
    },
  },
};
</script>
