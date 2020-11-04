import v from './variables'
import tools from '@/tools/index.js'

const validators = {
  String: value => tools.obj.type.isString(value),
  Number: value => tools.obj.type.isNumber(value) || tools.obj.type.isString(value) && !isNaN(value),
  UNumber: value => tools.obj.type.isNumber(value) || tools.obj.type.isString(value) && !isNaN(value) && Number(value) >= 0,
  Int: value => tools.obj.type.isNumber(value) || tools.obj.type.isString(value) && !isNaN(value) && Number(value) % 1 === 0,
  UInt: value => tools.obj.type.isNumber(value) || tools.obj.type.isString(value) && !isNaN(value) && Number(value) % 1 === 0 && Number(value) >= 0,
  Boolean: value => tools.obj.type.isBoolean(value),
  Array: value => tools.obj.type.isArray(value),
  Object: value => tools.obj.type.isObject(value),
  Function: value => tools.obj.type.isFunction(value),
  RegExp: value => tools.obj.type.isRegExp(value),
}

let type = {}

for (let [key, value] of Object.entries(validators)) {
  type['valid' + key] = value
}

export default {
  theme: {
    type: String,
    default: '',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.themes.includes(value)
    }
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.color.bg.includes(value) || value === null
    }
  },
  textColor: {
    type: String,
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.color.text.includes(value)
    }
  },
  borderColor: {
    type: String,
    default: 'secondary',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.border.color.includes(value)
    }
  },
  size: {
    type: String,
    default: '',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.size.includes(value)
    },
  },
  set: {
    type: String,
    default: 'down',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.set.default.includes(value)
    },
  },
  setX: {
    type: String,
    default: 'left',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.set.x.includes(value)
    },
  },
  popperSet: {
    type: String,
    default: "top",
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.set.popperSet.includes(value)
    },
  },
  position: {
    type: String,
    default: 'top-center',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.position.default.includes(value)
    },
  },
  justify: {
    type: String,
    default: '',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.justify.includes(value)
    },
  },
  baseStatus: {
    type: String,
    default: '',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.status.base.includes(value)
    },
  },
  messageStatus: {
    type: String,
    default: '',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.status.message.includes(value)
    },
  },
  methodStatus: {
    type: String,
    default: '',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return v.base.status.method.includes(value)
    },
  },
  width: {
    type: Number,
    default: 50,
    validator: (value) => {
      return value > 0 && value <= 100
    }
  },
  href: String,
  src: String,

  // text: [String, Number, Array,],
  // value: [String, Number, Array,],
  // label: [String, Number, Array,],
  // message: String,
  // success: String,
  // error: String,
  // list: {
  //   type: Array,
  //   default: () => [],
  // },
  // item: Object,
  // show: Boolean,
  // disabled: Boolean,
  // readonly: Boolean,
  // active: Boolean,
  // function: Function,
  // srMsg: String,

  // type
  String: { type: [Number, String], default: '', validator: value => type.validString(value) || type.validNumber(value) },
  Number: { type: [Number, String], default: 0, validator: value => type.validNumber(value) },
  UNumber: { type: [Number, String], default: 0, validator: value => type.validUNumber(value) },
  Int: { type: [Number, String], default: 0, validator: value => type.validInt(value) },
  UInt: { type: [Number, String], default: 0, validator: value => type.validUInt(value) },
  Boolean: { type: Boolean, default: false, validator: value => type.validBoolean(value) },
  Array: { type: Array, default: () => [], validator: value => type.validArray(value) },
  Object: { type: Object, default: () => ({}), validator: value => type.validObject(value) },
  Function: { type: Function, validator: value => type.validFunction(value) },
  // RegExp: { type: [String, Number, RegExp], default: () => new RegExp(), validator: value => type.validRegExp(value) },
}

export { type }
