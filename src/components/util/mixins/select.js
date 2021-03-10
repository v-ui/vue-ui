import tools from '@/tools/index.js'
import props from '@/components/util/props.js'

const install = function(selected, multiple) {
  return multiple
    ? tools.obj.type.isArray(selected) ? selected : []
    : tools.obj.isTrue(selected) ? selected : ''
}

const label = function(selected, multiple, key) {
  return multiple
    ? selected && selected.map && selected.map(e => e && (e.label || e[key] || e.value) || e) || null
    : selected && ((selected.label || selected[key] || selected.value) || selected) || null
}

const map = function(selected, multiple, key) {
  return multiple
    ? selected && selected.map && selected.map(e => e && e[key || 'value'] || e)
    : selected && selected[key || 'value'] || selected
}

const isSelected = function(map, item, multiple, key) {
  if (!tools.obj.isTrue(map)) return false
  return multiple
    ? map && map.includes && map.includes(item && item[key || 'value'] || item)
    : (item && item[key || 'value'] || item) === map
}

const basic = {
  props: {
    primaryKey: {
      ...props.String,
      default: null,
    },
    selected: [String, Number, Array, Object, Date, ],
    multiple: props.Boolean,
  },
}

const base = {
  mixins: [ basic ],
  model: {
    prop: 'selected',
    event: 'selected:change',
  },
  props: {
    list: props.Array,
    label: [ Array, String, Number, Object, Date, ],
  },
  data() {
    return {
      isMultiple: this.multiple,
      key: this.primaryKey,
      selectedValue: null,
      nullValue: '<Place select...>',
    }
  },
  created() {
    this.selectedValue = install(this.selected, this.isMultiple)
  },
  computed: {
    showLabel: function() {
      return this.label || label(this.selectedValue, this.isMultiple, this.key)
    },
  },
  watch: {
    primaryKey: function(value) {
      this.key = value
    },
    selected: function (value) {
      this.selectedValue = value
    },
    selectedValue: function (value) {
      this.$emit('selected:change', value)
    },
  },
}

export default {
  check: {
    mixins: [ base, ],
    computed: {
      selectedMap: function () {
        return map(this.selectedValue, this.isMultiple, this.key)
      },
    },
    methods: {
      isSelected: function(item) {
        return isSelected(this.selectedMap, item, this.isMultiple, this.key)
      },
    },
  },
  select: {
    mixins: [ base, ],
  },
  selectItem: {
    mixins: [ basic, ],
    props: {
      item: {
        type: [String, Number, Array, Object, Date],
        validator: value => tools.obj.isTrue(value)
      },
    },
    computed: {
      selectedMap: function () {
        return map(this.selected, this.multiple, this.primaryKey)
      },
      isSelected: function () {
        return isSelected(this.selectedMap, this.item, this.multiple, this.primaryKey)
      },
    },
  },
}
