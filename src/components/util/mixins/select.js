import tools from '@/tools/index.js'
import props from '@/components/util/props.js'

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
      checked: {
        type: [String, Number, Array, Object, Date, ],
      },
      primaryKey: {
        ...props.String,
        default: null,
      },
    },
    data() {
      return {
        isMultiple: false,
        checkedValues: null,
      }
    },
    mounted() {
      this.checkedValues = this.isMultiple
        ? this.checked && tools.obj.type.isArray(this.checked) ? this.checked : []
        : this.checked && (tools.obj.type.isObject(this.checked) || tools.obj.type.isString(this.checked)) ? this.checked : null
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
      checkedMap: function () {
        const self = this
        return this.isMultiple
          ? this.checkedValues && this.checkedValues.map && this.checkedValues.map(e => (e && e[self.primaryKey || 'value'] || e))
          : this.checkedValues && this.checkedValues[this.primaryKey] || this.checkedValues
      },
    },
    methods: {
      isChecked: function(item) {
        if (!this.checkedMap || this.checkedMap && this.checkedMap.length === 0) return false
        return this.isMultiple
          ? this.checkedMap.includes && this.checkedMap.includes(item[this.primaryKey || 'value'] || item)
          : (item && item[this.primaryKey || 'value'] || item) === this.checkedMap
      },
    },
  },
  select: {
    model: {
      prop: 'selected',
      event: 'select:selected',
    },
    props: {
      primaryKey: {
        ...props.String,
        default: null,
      },
      list: props.Array,
      selected: [String, Number, Array, Object],
      multiple: props.Boolean,
    },
    data() {
      return {
        isMultiple: this.multiple,
        nullValue: '<Place select...>',
        selectedValues: this.selected || (this.multiple ? [] : ''),
      }
    },
    watch: {
      selected: function (value) {
        this.selectedValues = value
      },
      selectedValues: function (value) {
        this.$emit('select:selected', value)
      },
    },
  },
  selectItem: {
    props: {
      primaryKey: {
        ...props.String,
        default: null,
      },
      item: {
        type: [String, Number, Array, Object],
        validator: value => !tools.obj.type.isNull(value) && !tools.obj.type.isUndefined(value),
      },
      selected: [String, Number, Array, Object],
      isMultiple: props.Boolean,
    },
    computed: {
      selectedMap: function () {
        const self = this
        return this.isMultiple
          ? this.selected && this.selected.map && this.selected.map(e => e && e[self.primaryKey || 'value'] || e)
          : this.selected && this.selected[this.primaryKey] || this.selected
      },
      isSelected: function () {
        if (!this.selectedMap || this.selectedMap && this.selectedMap.length === 0) return false
        return this.isMultiple
          ? this.selectedMap.includes && this.selectedMap.includes(this.item[this.primaryKey || 'value'] || this.item)
          : (this.item && this.item[this.primaryKey || 'value'] || this.item) === this.selectedMap
      },
    },
  },
}
