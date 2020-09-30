<template>
  <div>
    <h2>tree-zTree</h2>
    <c-a
      href="http://www.treejs.cn/v3/main.php#_zTreeInfo"
      text="zTree"
    /><br>
    <c-a
      href="https://github.com/tower1229/Vue-Giant-Tree"
      text="Vue-Giant-Tree"
    />
    <hr>
    <tree
      :setting="setting"
      :nodes="nodes"
    />
  </div>
</template>

<script>
import data from './data.json'
import CA from '@/components/basic/A/c-a.vue'
import tree from "@/components/content//TreeView/zTree/c-zTree.vue"

export default {
  name: 'TreeZTreeDemo',
  components: { CA, tree },
	data() {
    return {
      showIndex: 0,
      ztreeObj: null,
      // nodes: [
      //   { id: 1, pid: 0, name: "随意勾选 1", open: true },
      //   { id: 11, pid: 1, name: "随意勾选 1-1", open: true },
      //   { id: 111, pid: 11, name: "随意勾选 1-1-1" },
      //   { id: 112, pid: 11, name: "随意勾选 1-1-2" },
      //   { id: 12, pid: 1, name: "随意勾选 1-2", open: true },
      //   { id: 121, pid: 12, name: "随意勾选 1-2-1" },
      //   { id: 122, pid: 12, name: "随意勾选 1-2-2" },
      //   { id: 2, pid: 0, name: "随意勾选 2", checked: true, open: true },
      //   { id: 21, pid: 2, name: "随意勾选 2-1" },
      //   { id: 22, pid: 2, name: "随意勾选 2-2", open: true },
      //   { id: 221, pid: 22, name: "随意勾选 2-2-1", checked: true },
      //   { id: 222, pid: 22, name: "随意勾选 2-2-2" },
      //   { id: 23, pid: 2, name: "随意勾选 2-3" }
      // ],
      nodes: data.data,
      // nodes: this.dataMaker(500),
      setting: {
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true,
            pIdKey: "pid"
          }
        },
        view: {
          showIcon: true,
          addHoverDom: this.addHoverDom,
          removeHoverDom: this.removeHoverDom,
        },
      },
    }
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
