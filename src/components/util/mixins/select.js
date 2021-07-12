
import tools from '@/tools/index.js'
import props from '@/components/util/props.js'

// 数据初始化/合法性校验
const install = function(selected, multiple) {
  return multiple
    ? tools.obj.type.isArray(selected) ? selected : []
    : tools.obj.isTrue(selected) ? selected : ''
}

// 获取用于展示的数据
const getLabel = function(selected, list, multiple, name, key) {
  return multiple
    ? selected && selected.map && selected.map(e => getDisplay(getItem(e, list, key), name, key)) || null
    : getDisplay(getItem(selected, list, key), name, key) || null
}

// 获取选中1的 key
const getMap = function(selected, multiple, key) {
  return multiple
    ? selected && selected.map && selected.map(e => getKey(e, key))
    : getKey(selected, key)
}

// 判断是否选中
const isSelected = function(map, item, multiple, key) {
  if (!tools.obj.isTrue(map)) return false
  return multiple
    ? map && map.includes && map.includes(getKey(item, key))
    : getKey(item, key) === map
}

// 获取单个 item 的 key
const getKey = function(item, key) {
  return item && (tools.obj.isTrue(item[key]) ? item[key] : item) || item
}

// 获取单个 item 的 displayName
const getDisplay = function(item, name, key) {
  return item && (tools.obj.isTrue(item[name]) ? item[name] : tools.obj.isTrue(item[key]) ? item[key] : item) || item
}

// 根据选中获取 item
const getItem = function(selected, list, key) {
  return list && list.find && list.find(e => getKey(e, key) === getKey(selected, key))
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
    getKey: function(item, key = this.primaryKey) {
      return getKey(item, key)
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
    return: {
      type: props.String,
      default: null,
      validator: value => [ null, 'primaryKey', 'displayName' ].includes(value)
    },
  },
  data() {
    return {
      isMultiple: this.multiple,
      key: this.primaryKey,
      display: this.displayName,
      selectedValue: null,
      nullValue: '<Place select...>',
    }
  },
  created() {
    this.initSelectedValue()
  },
  computed: {
    selectedMap: function () {
      return getMap(this.selectedValue, this.isMultiple, this.key)
    },
  },
  watch: {
    primaryKey: function(value) {
      this.key = value
    },
    displayName: function(value) {
      this.display = value
    },
    multiple: function(value) {
      this.isMultiple = value
    },
    selected: function (value) {
      this.selectedValue = value
    },
    selectedValue: function (value) {
      let data = value
      switch (this.return) {
        case 'primaryKey':
          data = this.getKey(value)
          break;
        case 'displayName':
          data = this.getDisplay(value)
          break;
      }
      this.$emit('selected:change', data)
    },
  },
  methods: {
    initSelectedValue: function() {
      this.selectedValue = install(this.selected, this.isMultiple)
    },
    getKey: function(item, key = this.key) {
      return getKey(item, key)
    },
    getDisplay: function(item, name = this.display, key = this.key) {
      return getDisplay(item, name, key)
    },
  },
}

export default {
  tools: {
    install,
    getMap,
    getKey,
    getItem,
    getLabel,
    getDisplay,
    isSelected,
  },
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
        return getMap(this.selected, this.multiple, this.primaryKey)
      },
      isSelected: function () {
        return isSelected(this.selectedMap, this.item, this.multiple, this.primaryKey)
      },
    },
  },
}
