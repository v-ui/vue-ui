<template>
  <div>
    <h2>b-collapse(v-coll)</h2>
    <hr>
    <a
      v-coll:control="`#${id}`"
      class="btn btn-primary"
      role="button"
    >Toggle first element</a>
    <button
      v-coll:control="`#${id}`"
      class="btn btn-primary"
      type="button"
    >
      Toggle second element
    </button>
    <b-collapse :id="id">
      content
    </b-collapse>
  </div>
</template>

<script>
import tools from "@/tools/index.js";

import BCollapse from "@/components/base/Collapse/index.js";

export default {
  name: "BCollapseDemo",
  components: { BCollapse, },
  props: {
    id: {
      type: String,
      default: function() {
        return "Collapse-" + tools.random.getRandomString();
      }
    }
  },
  data() {
    return {
      control: "control info",

    };
  }
};
</script>
