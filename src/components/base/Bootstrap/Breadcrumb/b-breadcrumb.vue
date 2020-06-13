<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(obj, index) in content"
        :key="index"
        class="breadcrumb-item"
        :class="{active: obj.isActive}"
        :aria-current="obj.isActive ? 'page' : ''"
      >
        <slot>
          <base-a :href="obj.path">{{obj.name}}</base-a>
        </slot>
      </li>
    </ol>
  </nav>
</template>
<script>
import util from "@/components/util/index.js"

import BaseA from "@/components/base/Content/A/c-a.vue"
export default {
  name: "b-breadcrumb",
  components: { BaseA },
  props: {
    content: util.props.String,
  }
};
</script>
