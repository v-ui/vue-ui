<template>
  <datalist :id="id" >
    <template v-for="(value, index) in datalist">
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
