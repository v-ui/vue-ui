<template>
  <datalist :id="id">
    <template v-for="(value, index) in datalist">
      <option :value="value" :key="index" />
    </template>
  </datalist>
</template>
<script>
import util from "@/components/util/index.js";

export default {
  name: "b-form-datalist",
  props: {
    id: {
      type: String,
      required: true
    },
    datalist: util.props.list
  }
};
</script>
