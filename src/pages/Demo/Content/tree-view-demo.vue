<template>
  <tree-view :list="list" status="1" v-model="selected" />
</template>

<script>
import TreeView from "@/components/base/Content/TreeView/tree-view.vue";

export default {
  name: "tree-view-demo",
  components: { TreeView },
  data() {
    return {
      selected: {},
      list: [
        {
          id: "1-a",
          value: "1-a",
          open: true,
          children: [
            { id: "2-a", value: "2-a" },
            { id: "2-b", value: "2-b", disabled: true },
            { id: "2-c", value: "2-c" },
            { id: "2-d", value: "2-d" }
          ]
        },
        {
          id: "1-b",
          value: "1-b",
          children: [
            { id: "3-a", value: "3-a" },
            {
              id: "3-b",
              value: "3-b",
              children: [
                { id: "3-1-0a", value: "3-1-0a" },
                { id: "3-1-0b", value: "3-1-0b" },
                { id: "3-1-0c", value: "3-1-0c" },
                { id: "3-1-0d", value: "3-1-0d" },
                { id: "3-1-0f", value: "3-1-0f" },
                { id: "3-1-0g", value: "3-1-0g" },
                { id: "3-1-0h", value: "3-1-0h" },
                { id: "3-1-0i", value: "3-1-0i" },
                { id: "3-1-0j", value: "3-1-0j" },
                { id: "3-1-0k", value: "3-1-0k" }
              ]
            },
            {
              id: "4-b",
              value: "4-b",
              children: [
                { id: "4-1-a", value: "4-1-a" },
                { id: "4-1-b", value: "4-1-b" },
                { id: "4-1-c", value: "4-1-c" },
                { id: "4-1-d", value: "4-1-d" }
              ]
            }
          ]
        }
      ],
      list2: [
        {
          id: "1-a",
          value: "1-a",
          inline: true,
          children: [
            { id: "2-a", value: "2-a" },
            { id: "2-b", value: "2-b" },
            { id: "2-c", value: "2-c" },
            { id: "2-d", value: "2-d" }
          ]
        },
        {
          id: "1-b",
          value: "1-b",
          children: [
            { id: "3-a", value: "3-a" },
            {
              id: "3-b",
              value: "3-b",
              children: [
                { id: "3-1-a", value: "3-1-a" },
                { id: "3-1-b", value: "3-1-b" },
                { id: "3-1-c", value: "3-1-c" },
                { id: "3-1-d", value: "3-1-d" }
              ]
            },
            { id: "3-c", value: "3-c" },
            { id: "3-d", value: "3-d" }
          ]
        },
        { id: "1-c", value: "1-c" },
        {
          id: "1-d",
          value: "1-d",
          children: [
            { id: "4-a", value: "4-a" },
            { id: "4-b", value: "4-b" },
            { id: "4-c", value: "4-c" },
            { id: "4-d", value: "4-d" }
          ]
        }
      ]
    };
  }
};
</script>
