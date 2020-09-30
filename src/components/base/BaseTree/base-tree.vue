<template>
  <div>
    <p>(You can double click on an item to turn it into a folder.)</p>

    <!-- the demo root element -->
    <ul id="demo">
      <item
        class="item"
        :model="treeData"
      />
    </ul>
  </div>
</template>

<script>
export default {
  name: "BaseTree",
  components: {
    item: () => import("./base-tree-item.vue")
  },
  data: function() {
    return {
      treeData: {
        name: "My Tree",
        children: [
          { name: "hello" },
          { name: "wat" },
          {
            name: "child folder",
            children: [
              {
                name: "child folder",
                children: [{ name: "hello" }, { name: "wat" }]
              },
              { name: "hello" },
              { name: "wat" },
              {
                name: "child folder",
                children: [{ name: "hello" }, { name: "wat" }]
              }
            ]
          }
        ]
      }
    };
  }
};
</script>
