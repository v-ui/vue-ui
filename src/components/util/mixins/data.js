import props from '../props'

const base = {
  props: {
    list: props.Array,
    hideHeader: props.Boolean,
  },
  data() {
    return {
      dataList: [],
      defaultData: null,
    }
  },
  destroyed() {
    this.$emit('async:changed', this.dataList)
  },
  watch: {
    dataList: {
      handler: function(value) {
        this.$emit('sync:changed', value)
      },
      deep: true,
    },
  },
  methods: {
    add: function() {
      let item = this.list[0]
      this.dataList.push({ value: item, data: this.defaultData })
    },
    del: function(index) {
      this.dataList.splice(index, 1)
    },
  },
}

export default {
  base,
}
