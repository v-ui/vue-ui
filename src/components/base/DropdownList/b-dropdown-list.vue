<template>
  <div class="p-0">
    <b-dropdown-picker
      ref="dropdownlist"
      class="form-control"
      menu-width
      :selected="label"
      :placeholder="placeholder || nullValue"
      :disabled="disabled"
      :multiple="isMultiple"
      @delete:item="deleteItem"
    >
      <template #trigger>
        <slot name="trigger" />
      </template>
      <template #icon>
        <slot name="icon" />
      </template>
      <slot>
        <b-dropdown-menu
          v-model="selectedValue"
          :list="list"
          :search="search"
          :primary-key="key"
          :display-name="display"
          :multiple="isMultiple"
          :hide-null="hideNull || isMultiple"
          @item:click="validator($refs.dropdownlist.$el, selectedValue)"
        >
          <template #item="{ item }">
            <slot
              name="item"
              :item="item"
            />
          </template>
        </b-dropdown-menu>
      </slot>
    </b-dropdown-picker>
    <b-valid
      v-if="$slots.valid || validInfo"
      state="valid"
    >
      <slot name="valid">
        {{ validInfo }}
      </slot>
    </b-valid>
    <b-valid
      v-if="$slots.invalid || invalidInfo"
      state="invalid"
    >
      <slot name="invalid">
        {{ invalidInfo }}
      </slot>
    </b-valid>
    <b-info :info="info" />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BDropdownPicker from "@/components/base/DropdownPicker/b-dropdown-picker.vue";
import BDropdownMenu from '@/components/base/Dropdown/b-dropdown-menu.vue'

import BValid from "@/components/form/Other/b-form-valid.vue";
import BInfo from "@/components/basic/basic-info.vue";

export default {
  name: "BDropdownList",
  components: {
    BDropdownPicker,
    BDropdownMenu,
    BValid,
    BInfo
  },
  mixins: [
    util.mixins.form.validator,
    util.mixins.select.select,
    util.mixins.select.tools,
  ],
  props: {
    list: util.props.Array,
    info: util.props.String,
    search: util.props.Boolean,
    disabled: util.props.Boolean,
    placeholder: util.props.String,
    hideNull: util.props.Boolean,
  },
  data() {
    return {
      menuHeight: "0px",
    };
  },
  computed: {
    label: function() {
      return util.mixins.select.tools.getLabel(this.selectedValue, this.list, this.isMultiple, this.display, this.key)
    },
  },
  methods: {
    deleteItem: function(index) {
      if (index >= 0) this.selectedValue.splice(index, 1)
      this.validator(this.$refs.dropdownlist.$el, this.selectedValue)
    },
  }
};
</script>
