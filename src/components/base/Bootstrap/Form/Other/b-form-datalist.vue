<template functional>
  <datalist :id="props.id" v-bind="data.attrs" v-on="listeners">
    <template v-for="(value, index) in props.datalist">
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
    datalist: util.props.Array
  }
};
</script>
