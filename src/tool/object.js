

const getTypeString = function (o) {
  let s = Object.prototype.toString.call(o);
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

export default {
  assign: (objs) => {
    return Object.assign(...objs)
  },
  type,
}
