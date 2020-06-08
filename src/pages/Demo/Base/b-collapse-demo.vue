<template>
  <div>
    <h2>b-collapse</h2>
    <hr>
    <a class="btn btn-primary" role="button" v-coll:control="`#${id}`">Toggle first element</a>
    <button class="btn btn-primary" type="button" v-coll:control="`#${id}`">Toggle second element</button>
    <b-collapse :id="id">content</b-collapse>
  </div>
</template>

<script>
import util from "@/util/index.js";

import BCollapse from "@/components/base/Bootstrap/Collapse/index.js";

export default {
  name: "b-collapse-demo",
  components: { BCollapse },
  props: {
    id: {
      type: String,
      default: function() {
        return "Collapse-" + util.random.getRandomString();
      }
    }
  },
  data() {
    return {
      control: "control info"
    };
  }
};
</script>
