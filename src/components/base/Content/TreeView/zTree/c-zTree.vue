<template>
  <vue-giant-tree
    :setting="setting"
    :nodes="nodes"
    @onClick="onClick"
    @onCheck="onCheck"
    @onCreated="handleCreated"
    @onCollapse="onCollapse"
    @onExpand="onExpand"
  />
</template>

<script>
// http://www.treejs.cn/v3/main.php#_zTreeInfo
// https://github.com/tower1229/Vue-Giant-Tree

import tools from '@/tools'
import config from "@/config";
import util from "@/components/util";
import VueGiantTree from "vue-giant-tree"

export default {
  name: 'CZTree',
  components: { VueGiantTree, },
  props: {
    nodes: util.props.Array,
    setting: util.props.Object,
  },
  data() {
    return {
      showIndex: 0,
      ztreeObj: null,
    }
  },
  computed: {
    icon: function() {
      return config.ui.icon;
    },
  },
  mounted() {
    this.initIcon(
      document.getElementsByClassName('ico_open'),
      document.getElementsByClassName('ico_close'),
      document.getElementsByClassName('ico_docu'),
    )
  },
  methods: {
    initIcon: async function(ico_open, ico_close, ico_docu) {
      if (this.setting && this.setting.view && this.setting.view.showIcon) {
        await this.$nextTick()
        this.addClasses(ico_open, this.icon.folderOpen)
        this.addClasses(ico_close, this.icon.folder)
        this.addClasses(ico_docu, this.icon.fileAlt)
      }
    },
    addClasses: function(es, className) {
      for (let i = 0; i < es.length; i++) {
        tools.dom.addClasses(es[i], className)
      }
    },
    // addHoverDom(treeid, treeNode) {
    //   const item = document.getElementById(`${treeNode.tId}_a`);
    //   if(item && !item.querySelector('.tree_extra_btn')){
    //     const btn = document.createElement('sapn');
    //     btn.id = `${treeid}_${treeNode.id}_btn`;
    //     btn.classList.add('tree_extra_btn');
    //     btn.innerText = '删除';
    //     btn.addEventListener('click', (e) => {
    //       e.stopPropagation()
    //       this.clickRemove(treeNode)
    //     })
    //     item.appendChild(btn);
    //   }

    // },
    // removeHoverDom(treeid, treeNode) {
    //   const item = document.getElementById(`${treeNode.tId}_a`);
    //   if(item){
    //     const btn = item.querySelector('.tree_extra_btn');
    //     if(btn){
    //       item.removeChild(btn)
    //     }
    //   }
    // },
    clickRemove(treeNode) {
      console.log('remove', treeNode)
      this.ztreeObj && this.ztreeObj.removeNode(treeNode)
    },
    // 节点被展开
    onExpand: async function(evt, treeId, treeNode) {
      // if (this.setting && this.setting.view && this.setting.view.showIcon)
      //   await tools.dom.addClasses(document.getElementById(treeNode.tId +'_ico'), this.icon.folderOpen)
      this.initIcon(
        evt.target.getElementsByClassName('ico_open'),
        evt.target.getElementsByClassName('ico_close'),
        evt.target.getElementsByClassName('ico_docu'),
      )
      await this.$nextTick()
      console.log(evt.type, treeNode);
    },
    // 节点被折叠
    onCollapse: async function(evt, treeId, treeNode) {
      if (this.setting && this.setting.view && this.setting.view.showIcon)
        await tools.dom.addClasses(document.getElementById(treeNode.tId +'_ico'), this.icon.folder)
      await this.$nextTick()
      console.log(evt.type, treeNode);
    },
    onClick: function(evt, treeId, treeNode) {
      // 点击事件
      console.log(evt.type, treeNode);
    },
    onCheck: function(evt, treeId, treeNode) {
      // 选中事件
      console.log(evt.type, treeNode);
    },
    handleCreated: function(ztreeObj) {
      this.ztreeObj = ztreeObj;
      // onCreated 中操作ztreeObj对象展开第一个节点
      ztreeObj.expandNode(ztreeObj.getNodes()[0], true);
    },
    update: function() {
      // 更新示例数据
      this.showIndex = this.showIndex === 0 ? 1 : 0;
    }
  },
}
</script>
