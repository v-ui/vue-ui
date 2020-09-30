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
          <base-a :href="obj.path">
            {{ obj.label }}
          </base-a>
        </slot>
      </li>
    </ol>
  </nav>
</template>
<script>
import util from "@/components/util/index.js"

import BaseA from "@/components/basic/A/c-a.vue"
export default {
  name: "BBreadcrumb",
  components: { BaseA },
  props: {
    content: util.props.String,
  }
};
</script>
