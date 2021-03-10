

const getTypeString = function (o) {
  // https://juejin.im/post/6888702006962814990
  let s = Object.prototype.toString.call(o); // Function.prototype.call.bind(o)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

let type = {};

[
  'Null',
  'Undefined',
  'String',
  'Array',
  'Number',
  'Boolean',
  'RegExp',
  'Object',
  'Function',
  'Arguments'
].forEach(t => {
  type['is' + t] = o => {
    return getTypeString(o) === t.toLowerCase()
  }
})

// 特殊判断
Object.assign(type, {
  isNaN: isNaN,
  isFinite: isFinite,
})

const isTrue = function(value) {
  return !type.isNull(value) && !type.isUndefined(value)
}

export default {
  assign: (objs) => {
    return Object.assign(...objs)
  },
  type,
  isTrue,
}
