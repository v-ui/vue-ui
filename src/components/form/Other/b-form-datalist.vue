<template functional>
  <datalist
    :id="props.id"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <template v-for="(value, index) in props.datalist">
      <option
        :key="index"
        :value="value"
      />
    </template>
  </datalist>
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "BFormDatalist",
  props: {
    id: {
      type: String,
      required: true
    },
    datalist: util.props.Array
  }
};
</script>
