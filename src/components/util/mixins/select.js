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
      primaryKey: {
        ...props.String,
        default: null,
      },
      checked: [String, Number, Array, Object, Date, ],
      multiple: props.Boolean,
    },
    data() {
      return {
        isMultiple: this.multiple,
        nullValue: '<Place select...>',
        checkedValues: null,
      }
    },
    mounted() {
      this.checkedValues = this.isMultiple
        ? this.checked && tools.obj.type.isArray(this.checked) ? this.checked : []
        : this.checked && (tools.obj.type.isObject(this.checked) || tools.obj.type.isString(this.checked)) ? this.checked : ''
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
        return this.isMultiple
          ? this.checkedValues && this.checkedValues.map && this.checkedValues.map(e => (e && e[this.primaryKey || 'value'] || e))
          : this.checkedValues && this.checkedValues[this.primaryKey || 'value'] || this.checkedValues
      },
    },
    methods: {
      isChecked: function(item) {
        if (!this.checkedMap) return false
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
      list: props.Array,
      primaryKey: {
        ...props.String,
        default: null,
      },
      selected: [String, Number, Array, Object],
      multiple: props.Boolean,
    },
    data() {
      return {
        isMultiple: this.multiple,
        nullValue: '<Place select...>',
        selectedValues: null,
      }
    },
    mounted() {
      this.selectedValues = this.isMultiple
        ? this.selected && tools.obj.type.isArray(this.selected) ? this.selected : []
        : this.selected && (tools.obj.type.isObject(this.selected) || tools.obj.type.isString(this.selected)) ? this.selected : ''
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
        return this.multiple
          ? this.selected && this.selected.map && this.selected.map(e => e && e[this.primaryKey || 'value'] || e)
          : this.selected && this.selected[this.primaryKey || 'value'] || this.selected
      },
      isSelected: function () {
        if (!this.selectedMap) return false
        return this.multiple
          ? this.selectedMap.includes && this.selectedMap.includes(this.item[this.primaryKey || 'value'] || this.item)
          : (this.item && this.item[this.primaryKey || 'value'] || this.item) === this.selectedMap
      },
    },
  },
}
