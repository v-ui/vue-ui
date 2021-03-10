export default {
  thead: {
    data() {
      return {
        theadData: [],
        theadRowCount: 1,
      }
    },
    mounted() {
      this.theadRowCount = this.getTheadRowCount(this.head)
    },
    methods: {
      // head
      getLastColumns: function(head = this.head) {
        let arr = []
        head.forEach(e => e.children ? arr.push(...this.getLastColumns(e.children)) : arr.push(e))
        return arr
      },
      // head
      initHead: function() {
        this.theadRowCount = this.initHeadData(this.head)
        this.getHeadData(this.head)
      },
      // head
      getTheadRowCount: function(arr = [], count = 1) {
        return Math.max(...arr.map(e => e.children ? this.getTheadRowCount(e.children, count + 1) : count))
      },
      // head
      initHeadData: function (head = [], index = 0) {
        if (!head || head.length == 0) return []
        let vm = this
        let hasChildren = head.some(e => e.children)
        index += hasChildren ? 1 : 0
        head.forEach(e => {
          let colspan = vm.getCellColCount(e)
          let rowspan = vm.getCellRowCount(e, hasChildren ? index - 1 : index)
          e.colspan = colspan > 1 ? colspan : null
          e.rowspan = rowspan > 1 ? rowspan : null
          if (e.children) {
            if (e.sort) e.sort = false
            vm.initHeadData(e.children, index)
          }
        })
      },
      // head
      getCellRowCount: function (obj = {}, index) {
        return obj.children && obj.children.length > 0 ? 1 : this.theadRowCount - index
      },
      // head
      getCellColCount: function (obj = {}, count = 1) {
        return obj.children
          ? obj.children.filter(e => !e.children).length + obj.children.filter(e => e.children).reduce((acc, cur) => acc + this.getCellColCount(cur), 0)
          : count
      },
      // head
      getHeadData: function (head = []) {
        if (!head || head.length == 0) return []
        this.theadData.push([...head])
        // ie 和 edge 不支持 flat
        // this.getHeadData(head.filter(e => e.children).map(e => e.children).flat())
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#替代方案
        this.getHeadData(head.filter(e => e.children).map(e => e.children).reduce((acc, val) => acc.concat(val), []))
      },
    }
  }, // thead
}
