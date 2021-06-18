<template>
  <div>
    <div
      class="btn-group"
      :class="groupClass"
      role="group"
    >
      <template v-for="(item, index) in list">
        <b-radio
          :key="'radio-'+index"
          :id="`${id}-${index}`"
          class="btn-check"
          :name="name"
          autocomplete="off"
          :checked="isSelected(item)"
          :value="getKey(item)"
          :disabled="disabled || item.disabled"
        />
        <label
          :key="'label-'+index"
          :for="`${id}-${index}`"
          class="btn"
          :class="`btn-${item.color || color}`"
          @click="click(item)"
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

import BRadio from "./b-radio.vue"
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BRadioButtonGroup",
  components: { BRadio, BInfo },
  mixins: [ util.mixins.select.check, ],
  props: {
    size: util.props.size,
    color: util.props.color,
    info: util.props.String,
    disabled: util.props.Boolean,
    name: {
      ...util.props.String,
      required: true
    }
  },
  data() {
    return {
      id: 'radio-buton' + tool.random.getRandomString()
    }
  },
  computed: {
    groupClass: function() {
      let size = this.size ? `btn-group-${this.size}` : ''
      return `${size}`
    },
  },
  methods: {
    click: function(item) {
      this.selectedValue = item
    },
  },
};
</script>
