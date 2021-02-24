<template>
  <div>
    <h2>tree-zTree</h2>
    <b-a
      href="http://www.treejs.cn/v3/main.php#_zTreeInfo"
      text="zTree"
    /><br>
    <b-a
      href="https://github.com/tower1229/Vue-Giant-Tree"
      text="Vue-Giant-Tree"
    />
    <hr>
    <b-tree
      :setting="setting"
      :nodes="nodes"
    />
  </div>
</template>

<script>
import util from "@/components/util/index.js";

import BA from '@/components/basic/A/basic-a.vue'
import BTree from "@/components/content/Tree/zTree/b-zTree.vue"

export default {
  name: 'BZTreeDemo',
  components: { BA, BTree },
  mixins: [ util.mixins.address.level ],
	data() {
    return {
      nodes: [],
      // nodes: this.dataMaker(500),
      setting: {
        view: {
          showIcon: true,
        },
      },
    }
  },
  mounted() {
    this.nodes = this.level
  },
  methods: {
    dataMaker: function(count) {
			var nodes = [], pId = -1,
			min = 10, max = 90, level = 0, curLevel = [], prevLevel = [], levelCount,
			i = 0,j,l,m,n;

			while (i<count) {
				if (level == 0) {
					pId = -1;
					levelCount = Math.round(Math.random() * max) + min;
					for (j=0; j<levelCount && i<count; j++, i++) {
						n = {id:i, pId:pId, name:"Big-" +i};
						nodes.push(n);
						curLevel.push(n);
					}
				} else {
					for (l=0, m=prevLevel.length; l<m && i<count; l++) {
						pId = prevLevel[l].id;
						levelCount = Math.round(Math.random() * max) + min;
						for (j=0; j<levelCount && i<count; j++, i++) {
							n = {id:i, pId:pId, name:"Big-" +i};
							nodes.push(n);
							curLevel.push(n);
						}
					}
				}
				prevLevel = curLevel;
				curLevel = [];
				level++;
			}
			return nodes;
		}
  },
}
</script>
