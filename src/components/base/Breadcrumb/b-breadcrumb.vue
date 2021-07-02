<template>
  <nav :style="`--bs-breadcrumb-divider: '${divider}';`" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="breadcrumb-item"
        :class="{active: item.active}"
        :aria-current="item.active ? 'page' : ''"
      >
        <slot>
          <base-a v-if="!item.active" :href="item.path || '#'">
            {{ item.label }}
          </base-a>
          <template v-else>{{ item.label }}</template>
        </slot>
      </li>
    </ol>
  </nav>
</template>
<script>
import util from "@/components/util/index.js"

import BaseA from "@/components/basic/A/basic-a.vue"
export default {
  name: "BBreadcrumb",
  components: { BaseA },
  props: {
    list: util.props.String,
    divider: {
      ...util.props.String,
      default: '>',
    },
  }
};
</script>
