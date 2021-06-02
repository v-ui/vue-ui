<template>
  <div class="list-group">
    <a
      v-for="(item, index) in list"
      :key="index"
      class="list-group-item list-group-item-action p-2 my-1"
    >
      <div class="d-flex justify-content-between">
        <h5 class="m-0 text-truncate">
          {{ `${index + 1}.` }}
          <slot>{{ item.title || 'Video Title' }}</slot>
        </h5>
        <small
          class="border-left ps-1 text-nowrap text-muted text-right align-self-center"
        >{{ item.durationTime || '1:00' }}</small>
      </div>
    </a>
  </div>
</template>

<script>
import util from "@/components/util/index.js";

export default {
  name: "BVideoList",
  props: {
    list: util.props.Array
  }
};
</script>
