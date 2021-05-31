import tools from '@/tools/index.js'
import props from '@/components/util/props.js'

const install = function(selected, multiple) {
  return multiple
    ? tools.obj.type.isArray(selected) ? selected : []
    : tools.obj.isTrue(selected) ? selected : ''
}

const label = function(selected, list, multiple, name, key) {
  return multiple
    ? selected && selected.map && selected.map(e => getDisplay(getItem(e, list, key), name, key)) || null
    : getDisplay(getItem(selected, list, key), name, key) || null
}

const map = function(selected, multiple, key) {
  return multiple
    ? selected && selected.map && selected.map(e => getValue(e, key))
    : getValue(selected, key)
}

const isSelected = function(map, item, multiple, key) {
  if (!tools.obj.isTrue(map)) return false
  return multiple
    ? map && map.includes && map.includes(getValue(item, key))
    : getValue(item, key) === map
}

const getValue = function(item, key) {
  return item && item[key] || item
}

const getDisplay = function(item, name, key) {
  return item && (item[name] || item[key]) || item
}

const getItem = function(selected, list, key) {
  return list && list.find && list.find(e => getValue(e, key) === getValue(selected, key))
}

const basic = {
  props: {
    primaryKey: {
      ...props.String,
      default: 'value',
    },
    displayName: {
      ...props.String,
      default: 'label',
    },
    selected: [String, Number, Array, Object, Date, ],
    multiple: props.Boolean,
  },
  methods: {
    getValue: function(item, key = this.primaryKey) {
      return getValue(item, key)
    },
    getDisplay: function(item, name = this.displayName, key = this.primaryKey) {
      return getDisplay(item, name, key)
    },
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
      displayKey: this.displayName,
      selectedValue: null,
      nullValue: '<Place select...>',
    }
  },
  created() {
    this.initSelectedValue()
  },
  computed: {
    showLabel: function() {
      return this.label || label(this.selectedValue, this.list, this.isMultiple, this.displayName, this.key)
    },
    selectedMap: function () {
      return map(this.selectedValue, this.isMultiple, this.key)
    },
  },
  watch: {
    primaryKey: function(value) {
      this.key = value
    },
    displayName: function(value) {
      this.displayKey = value
    },
    multiple: function(value) {
      this.isMultiple = value
    },
    selected: function (value) {
      this.selectedValue = value
    },
    selectedValue: function (value) {
      this.$emit('selected:change', value)
    },
  },
  methods: {
    initSelectedValue: function() {
      this.selectedValue = install(this.selected, this.isMultiple)
    },
    getValue: function(item, key = this.key) {
      return getValue(item, key)
    },
    getDisplay: function(item, name = this.displayKey, key = this.key) {
      return getDisplay(item, name, key)
    },
  },
}

export default {
  check: {
    mixins: [ base, ],
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
