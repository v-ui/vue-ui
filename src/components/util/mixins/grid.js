import props from "../props";
import mixinsSelect from "../mixins/select"

const lastCol = {
  methods: {
    getLastColumns: function(head) {
      let arr = []
      head.forEach(e => e.children ? arr.push(...this.getLastColumns(e.children)) : arr.push(e))
      return arr
    },
  },
}

const col = {
  mixins: [ lastCol, ],
  data() {
    return {
      colgroup: [],
      columns: [],
    }
  },
  methods: {
    initCol: function(head = this.dataHead) {
      if (this.hideHead) return;
      this.columns = this.getLastColumns(head);

      this.columns.forEach(e => {
        this.intColgroup(e)
        // this.initColumns(e)
      })
    },
    intColgroup: function(e) {
      this.colgroup.push({ class: e.colClass, style: e.colStyle });
    },
    initColumns: function(e) {
      this.columns.push({
        field: e.field,
        format: e.format,
        cellStyle: e.cellStyle
      });
    },
  },
}

const thead = {
  props: {
    head: props.Array,
  },
  data() {
    return {
      theadData: [],
    }
  },
  computed: {
    dataHead: function() {
      return this.head || []
    },
    theadRowCount: function() {
      return this.getTheadRowCount(this.dataHead)
    },
  },
  methods: {
    // head
    initHead: function(head = this.dataHead) {
      // 根据 head 的层级关系（依赖于 children 属性），添加 colSpan 和 rowSpan 属性
      this.initHeadData(head)
      // 将 head 展平为单层的数组集合，将同一行的数据放在一个数组中
      this.getHeadData(head)
    },
    // head
    getTheadRowCount: function(arr = [], count = 1) {
      return Math.max(...arr.map(e => e.children ? this.getTheadRowCount(e.children, count + 1) : count))
    },
    // head - init colSpan and rowSpan
    initHeadData: function (head = [], index = 0) {
      if (!head || head.length == 0) return []
      let hasChildren = head.some(e => e.children)
      index += hasChildren ? 1 : 0
      head.forEach(e => {
        let colSpan = this.getCellColCount(e)
        let rowSpan = this.getCellRowCount(e, hasChildren ? index - 1 : index)
        e.colSpan = colSpan > 1 ? colSpan : null
        e.rowSpan = rowSpan > 1 ? rowSpan : null
        if (e.children) {
          // 非最底层的表头不允许进行排序操作
          if (e.sort) e.sort = false
          this.initHeadData(e.children, index)
        }
      })
    },
    // head - flat this.dataHead then add to this.theadData
    getHeadData: function (head = []) {
      if (!head || head.length === 0) return []
      this.theadData.push([...head])
      // ie 和 edge 不支持 flat
      // this.getHeadData(head.filter(e => e.children).map(e => e.children).flat())
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#替代方案
      this.getHeadData(head.filter(e => e.children).map(e => e.children).reduce((acc, val) => acc.concat(val), []))
    },
    // head
    getCellColCount: function (obj = {}, count = 1) {
      return obj.children
        ? obj.children.filter(e => !e.children).length + obj.children.filter(e => e.children).reduce((acc, cur) => acc + this.getCellColCount(cur), 0)
        : count
    },
    // head
    getCellRowCount: function (obj = {}, index) {
      return obj.children && obj.children.length > 0 ? 1 : this.theadRowCount - index
    },
  }
} // thead

const operate = {
  props: {
    operate: props.Object,
  },
  computed: {
    dataHead: function() {
      let arr = Array.from(this.head || []);
      if (
        !this.isActive &&
        this.operate &&
        this.operate.index >= 0 &&
        this.operate.value &&
        this.operate.value.length > 0
      ) {
        let index = this.operate.index >= 0
          ? this.operate.index
          : this.head.length;
        let n = Math.min(index, ...this.head.map((e, index) => e.children ? index : Infinity))

        arr.splice(n, 0, {
          field: '_operate',
          label: 'Operate',
          canNotSort: true,
          colClass: "text-center",
          colStyle: `width: ${Math.max(5, 2.3 * this.operate.value.length, 2.3 * this.operate.value.length + 1)}em;`,
        });
      }
      return arr;
    },
  },
}

const sort = {
  props: {
    sort: props.Array,
  },
  data() {
    return {
      dataSort: this.sort || [],
    };
  },
  watch: {
    sort: {
      handler: function(value) {
        this.dataSort = value
      },
      deep: true,
    },
  },
  methods: {
    cellSort: function(cell) {
      let sort = 'asc'
      let field = cell.field
      let index = this.dataSort.findIndex && this.dataSort.findIndex(e => e && (e.value.field || e.value) === field)

      if (index >= 0) {
        let item = this.dataSort[index]
        sort = item && (item.data.value || item.data) === 'asc' ? 'desc' : 'asc'
        this.dataSort[index].value = cell
        this.dataSort[index].data = sort
      } else {
        this.dataSort.push({value: cell, data: sort})
      }

      this.list.sort((a, b) => {
        let sa = a && a[field]
        let sb = b && b[field]
        // TODO: 根据不同的数据类型进行排序，目前的方法不准确
        if (sort === 'asc') {
          return sa && sa.localeCompare && sb && sb.localeCompare
            ? sa.localeCompare(sb)
            : sa - sb
        } else {
          return sa && sa.localeCompare && sb && sb.localeCompare
            ? sb.localeCompare(sa)
            : sb - sa
        }
      })
    },
  },
}

const enumSelect = {
  data() {
    return {
      enumSelect: {
        default: null,
        check: 'check',
        select: 'select',
      },
    }
  },
}

const select = {
  mixins: [ enumSelect, mixinsSelect.check, ],
  props: {
    selectStatus: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      check: { field: "_check", label: 'Check', colStyle: 'width: 35px;', canNotSort: true, }
    }
  },
  computed: {
    hideCheck: function() {
      return !(this.selectStatus === this.enumSelect.check || this.selectStatus === this.enumSelect.select)
    },
  },
  mounted() {
    this.initSelect()
    this.initSelectedValue()
  },
  methods: {
    initSelect: function() {
      switch(this.selectStatus) {
        case this.enumSelect.check:
          this.isMultiple = false
          break;
        case this.enumSelect.select:
          this.isMultiple = true
          break;
      }
    },
    multiSelect: function(checked, item) {
      if (checked) {
        this.selectedValue.push(item);
      } else {
        const value = this.getKey(item)
        let index = this.selectedMap.indexOf(value);
        if (index >= 0) this.selectedValue.splice(index, 1);
      }
    },
    unMultiSelect: function(item) {
      this.selectedValue = item
    },
  },
}

export default {
  col,
  lastCol,
  thead,
  operate,
  sort,
  enumSelect,
  select,
}
