import props from '../props'

const base = {
  model: {
    prop: 'list',
    event: 'data:changed',
  },
  props: {
    list: props.Array,
    column: props.Array,
    hideHeader: props.Boolean,
  },
  data() {
    return {
      dataList: this.list,
      defaultData: null,
    }
  },
  computed: {
    hideInfo: function() {
      return this.dataList && this.dataList?.length !== 0
    },
    disabledTrash: function() {
      return !this.hideInfo
    },
  },
  watch: {
    list: {
      handler: function(value) {
        this.dataList = value
      },
      deep: true,
    },
    dataList: {
      handler: function(value) {
        // v-model
        this.$emit('data:changed', value)
      },
      deep: true,
    },
  },
  methods: {
    add: function() {
      this.dataList.push({ value: this.column[0], data: this.defaultData })
    },
    del: function(index) {
      this.dataList.splice(index, 1)
    },
    clear: function() {
      this.dataList = []
    },
  },
}

export default {
  base,
}
