<template>
  <vue-giant-tree
    :setting="setting"
    :nodes="nodes"
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
    // 节点被展开
    onExpand: async function(evt) {
      await this.$nextTick()
      await this.initIcon(
        evt.target.getElementsByClassName('ico_open'),
        evt.target.getElementsByClassName('ico_close'),
        evt.target.getElementsByClassName('ico_docu'),
      )
    },
    // 节点被折叠
    onCollapse: async function(evt, treeId, treeNode) {
      await this.$nextTick()
      if (this.setting && this.setting.view && this.setting.view.showIcon)
        await tools.dom.addClasses(document.getElementById(treeNode.tId +'_ico'), this.icon.folder)
      await this.$nextTick()
    },
    handleCreated: function(ztreeObj) {
      this.ztreeObj = ztreeObj;
      // onCreated 中操作ztreeObj对象展开第一个节点
      // ztreeObj.expandNode(ztreeObj.getNodes()[0], true);
    },
  },
}
</script>
