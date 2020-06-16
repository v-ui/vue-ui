/*
 * mixins
 * 通用混入
**/

import tools from '@/tools/index.js'
import props from '@/components/util/props.js'
import filters from '@/components/util/filters.js'

export default {
  form: {
    base: {
      props: {
        color: {
          ...props.color,
          default: 'transparent',
        },
        textColor: props.textColor,
        textAlign: props.setX,
        size: props.size,
        border: {
          ...props.Boolean,
          default: true,
        },
        tempClass: props.String,
      },
      computed: {
        objClass: function () {
            let size = this.size ? `form-control-${this.size}` : ''
            let border = !this.border ? 'border-0' : ''
            return `${this.tempClass} bg-${this.color} text-${this.textColor} ${size} ${border} text-${this.textAlign}`
        },
        inputListeners: function () {
          var vm = this
          // `Object.assign` 将所有的对象合并为一个新对象
          return Object.assign({},
            // 我们从父级添加所有的监听器
            this.$listeners,
            // 然后我们添加自定义监听器，
            // 或覆写一些监听器的行为
            {
              // 这里确保组件配合 `v-model` 的工作
              input: function (event) {
                vm.$emit('input', event.target.value)
              }
            }
          )
        },
      },
    }, // base
    btn: {
      filters: { ...filters },
      props: {
        value: {
          ...props.value,
          default: `Button`,
        },
        color: props.color,
        textColor: props.textColor,
        size: props.size,
        href: {
          ...props.href,
          default: '',
        },
        active: props.Boolean,
        disabled: props.Boolean,
        outline: props.Boolean,
        block: props.Boolean,
      },
      computed: {
        objClass: function () {
          return `btn-${this.outline ? 'outline-' : ''}${this.color}
                        ${this.textColor ? `text-${this.textColor}` : ''}
                        ${this.size ? `btn-${this.size}` : ''}
                        ${this.block ? 'btn-block' : ''}
                        ${this.active ? 'active' : ''}
                        ${(this.disabled && this.href) ? 'disabled' : ''}`
        },
        fillsrMsg: function () {
          return this.srMsg ? this.color : this.srMsg
        },
      },
    }, // btn
    validator: {
      props: {
        required: props.Boolean,
        minlength: props.UInt,
        maxlength: {
          ...props.UInt,
          default: 64,
        },
        pattern: [String, RegExp],
        validInfo: props.String,
        invalidInfo: props.String,
        unvalid: props.Boolean,
      },
      methods: {
        validator: function (e, regex = this.pattern) {
          if (this.unvalid) return // 不做验证
          if (this.readonly) return // readonly 时不校验
          if (this.disabled) return // disabled 时不校验
          // 验证函数不会对传入的数据进行处理
          const value = e.target ? e.target.value.trim() : e.value.trim()
          // 移除可能的 is-valid
          tools.dom.removeClass(e.target, 'is-valid')
          // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
          if (!this.validateRequired(value)) { tools.dom.addClass(e.target, 'is-invalid'); return }
          // 长度验证（传入字符串长度为 0、minlength 小于 0、minlength 大于 maxlength 不做校验直接返回 true，验证通过返回 true）
          if (!this.validateLength(value)) { tools.dom.addClass(e.target, 'is-invalid'); return }
          // 正则校验（传入字符串长度为 0、无正则表达式 不做校验直接返回 true，验证通过返回 true）
          if (!this.validateRange(value, regex)) { tools.dom.addClass(e.target, 'is-invalid'); return }
          tools.dom.removeClass(e.target, 'is-invalid') // 移除可能的 is-invalid
          // 当存在 valid slot 或 validInfo 时
          if (this.$slots.valid || this.validInfo) tools.dom.addClass(e.target, 'is-valid')
          this.$emit('valid')
        },
        // 非空验证（验证通过返回 true）
        validateRequired: function (value) {
          // required 为 false 不做校验直接返回 true
          if (this.required && value.length == 0) {
            this.$emit('invalid', 'required')
            return false
          }
          return true
        },
        // 长度验证（验证通过返回 true）
        validateLength: function (value) {
          let minlength = Number(this.minlength) || 0
          let maxlength = Number(this.maxlength) || 0
          // 传入字符串长度为 0、minlength 小于 0、minlength 大于 maxlength 不做校验直接返回 true
          if (value.length == 0 || minlength < 0 || minlength >= maxlength) return true
          const length = tools.string.codePointLength(value)
          if (length < minlength) {
            this.$emit('invalid', 'short')
            return false
          }
          if (length > maxlength) {
            this.$emit('invalid', 'long')
            return false
          }
          return true
        },
        // 正则校验（验证通过返回 true）
        validateRange: function (value, regex) {
          // 传入字符串长度为 0、无正则表达式 不做校验直接返回 true
          if (value.length == 0 || !regex) return true
          var patternRegex = new RegExp(regex);
          if (!value.match(patternRegex)) {
            this.$emit('invalid', 'regex')
            return false
          }
          return true
        },
      },
    }, // validator
    readonly: {
      props: {
        readonly: props.readonly,
        disabled: props.disabled,
      },
      computed: {
        readonlyClass: function () {
          return this.readonly ? 'form-control-plaintext' : ''
        },
      },
    }, // readonly
  }, // form
  grid: {
    thead: {
      data() {
        return {
          theadData: [],
          theadRowCount: 1,
        }
      },
      mounted() {
        this.theadRowCount = this.getTheadRowCount(this.head)
      },
      methods: {
        // head
        getLastColumns: function (head = this.head) {
          let arr = []
          head.forEach(e => {
            e.children ? arr.push(...this.getLastColumns(e.children)) : arr.push(e)
          })
          return arr
        },
        // head
        initHead: function () {
          this.theadRowCount =
            this.initHeadData(this.head)
          this.getHeadData(this.head)
        },
        // head
        getTheadRowCount: function (arr = [], count = 1) {
          return Math.max(...arr.map(e => e.children ? this.getTheadRowCount(e.children, count + 1) : count))
        },
        // head
        initHeadData: function (head = [], index = 0) {
          if (!head || head.length == 0) return []
          let vm = this
          let hasChildren = head.some(e => e.children)
          index += hasChildren ? 1 : 0
          head.forEach(e => {
            let colspan = vm.getCellColCount(e)
            let rowspan = vm.getCellRowCount(e, hasChildren ? index - 1 : index)
            e.colspan = colspan > 1 ? colspan : null
            e.rowspan = rowspan > 1 ? rowspan : null
            if (e.children) {
              if (e.sort) e.sort = false
              vm.initHeadData(e.children, index)
            }
          })
        },
        // head
        getCellRowCount: function (obj = {}, index) {
          return obj.children && obj.children.length > 0 ? 1 : this.theadRowCount - index
        },
        // head
        getCellColCount: function (obj = {}, count = 1) {
          return obj.children
            ? obj.children.filter(e => !e.children).length + obj.children.filter(e => e.children).reduce((acc, cur) => acc + this.getCellColCount(cur), 0)
            : count
        },
        // head
        getHeadData: function (head = []) {
          if (!head || head.length == 0) return []
          this.theadData.push([...head])
          // ie 和 edge 不支持 flat
          // this.getHeadData(head.filter(e => e.children).map(e => e.children).flat())
          // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#替代方案
          this.getHeadData(head.filter(e => e.children).map(e => e.children).reduce((acc, val) => acc.concat(val), []))
        },
      }
    }, // thead
  }, // grid - grid view & table
}
