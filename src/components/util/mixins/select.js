import tools from '@/tools/index.js'
import props from '@/components/util/props.js'

const install = function(selected, multiple) {
  return multiple
    ? selected && tools.obj.type.isArray(selected) ? selected : []
    : selected && (tools.obj.type.isObject(selected) || tools.obj.type.isString(selected)) ? selected : ''
}

const label = function(selected, multiple, primaryKey) {
  return multiple
    ? selected && selected.map && selected.map(e => e && (e.label || e[primaryKey] || e.value) || e) || null
    : selected && (selected && (selected.label || selected[primaryKey] || selected.value) || selected) || null
}

const map = function(selected, multiple, primaryKey) {
  return multiple
    ? selected && selected.map && selected.map(e => e && e[primaryKey || 'value'] || e)
    : selected && selected[primaryKey || 'value'] || selected
}

const isSelected = function(map, item, multiple, primaryKey) {
  if (!map) return false
  return multiple
    ? map.includes && map.includes(item[primaryKey || 'value'] || item)
    : (item && item[primaryKey || 'value'] || item) === map
}

export default {
  check: {
    model: {
      prop: 'checked',
      event: 'check:change',
    },
    props: {
      list: {
        ...props.Array,
        validator: value => !tools.obj.type.isNull(value) && !tools.obj.type.isUndefined(value),
      },
      primaryKey: {
        ...props.String,
        default: null,
      },
      checked: [String, Number, Array, Object, Date, ],
      label: [ Array, String, Number, Object, Date, ],
      multiple: props.Boolean,
    },
    data() {
      return {
        isMultiple: this.multiple,
        nullValue: '<Place select...>',
        checkedValues: null,
      }
    },
    created() {
      this.checkedValues = install(this.checked, this.isMultiple)
    },
    watch: {
      checked: function (value) {
        this.checkedValues = value
      },
      checkedValues: function (value) {
        this.$emit('check:change', value)
      },
    },
    computed: {
      showLabel: function() {
        return this.label || label(this.checkedValues, this.isMultiple, this.primaryKey)
      },
      checkedMap: function () {
        return map(this.checkedValues, this.isMultiple, this.primaryKey)
      },
    },
    methods: {
      isChecked: function(item) {
        return isSelected(this.checkedMap, item, this.isMultiple, this.primaryKey)
      },
    },
  },
  select: {
    model: {
      prop: 'selected',
      event: 'select:selected',
    },
    props: {
      list: props.Array,
      primaryKey: {
        ...props.String,
        default: null,
      },
      selected: [String, Number, Array, Object],
      label: [ Array, String, Number, Object, Date, ],
      multiple: props.Boolean,
    },
    data() {
      return {
        isMultiple: this.multiple,
        nullValue: '<Place select...>',
        selectedValues: null,
      }
    },
    created() {
      this.selectedValues = install(this.selected, this.isMultiple)
    },
    watch: {
      selected: function (value) {
        this.selectedValues = value
      },
      selectedValues: function (value) {
        this.$emit('select:selected', value)
      },
    },
    computed: {
      showLabel: function() {
        return this.label || label(this.selectedValues, this.isMultiple, this.primaryKey)
      },
    },
  },
  selectItem: {
    props: {
      item: {
        type: [String, Number, Array, Object],
        validator: value => !tools.obj.type.isNull(value) && !tools.obj.type.isUndefined(value),
      },
      primaryKey: {
        ...props.String,
        default: null,
      },
      selected: [String, Number, Array, Object],
      multiple: props.Boolean,
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
