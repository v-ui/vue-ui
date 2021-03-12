import props from '../props'

const base = {
  props: {
    list: props.Array,
  },
  data() {
    return {
      fillList: [],
      defaultData: null,
    }
  },
  destroyed() {
    this.$emit('async:changed', this.fillList)
  },
  watch: {
    fillList: {
      handler: function(value) {
        this.$emit('sync:changed', value)
      },
      deep: true,
    },
  },
  methods: {
    add: function() {
      let item = this.list[0]
      this.fillList.push({ value: item, data: this.defaultData })
    },
    del: function(index) {
      this.fillList.splice(index, 1)
    },
  },
}

export default {
  base,
}
