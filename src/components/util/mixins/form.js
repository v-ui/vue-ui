import tools from '@/tools/index.js'
import props from '@/components/util/props.js'
import filters from '@/components/util/filters.js'

export default {
  base: {
    props: {
      color: {
        ...props.color,
        default: null,
      },
      textColor: props.textColor,
      textAlign: props.setX,
      size: props.size,
      border: {
        ...props.Boolean,
        default: true,
      },
    },
    computed: {
      cClass: function () {
        let size = ''
        if (!this.sizeClass) {
          size = this.size ? `form-control-${this.size}` : ''
        }
        let border = !this.border ? 'border-0' : ''
        let color = this.color ? `bg-${this.color}` : ''
        let textColor = this.textColor ? `text-${this.textColor}` : ''
        let textAlign = this.textAlign ? `text-${this.textAlign}` : ''
        return `${color} ${textColor} ${size} ${border} ${textAlign}`
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
    props: {
      value: {
        ...props.String,
        default: `Button`,
      },
      color: {
        ...props.color,
        validator: value => 'link' === value || props.color.validator(value)
      },
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
      loading: props.Boolean,
    },
    computed: {
      objClass: function () {
        let c = `btn-${this.outline ? 'outline-' : ''}${this.color}
                ${this.textColor ? `text-${this.textColor}` : ''}
                ${this.size ? `btn-${this.size}` : ''}
                ${this.block ? 'btn-block' : ''}
                ${this.active ? 'active' : ''}
                ${(this.disabled && this.href) ? 'disabled' : ''}`
        if (this.color === 'link') c += ' text-decoration-none'
        return c
      },
      fillsrMsg: function () {
        return this.srMsg ? this.color : this.srMsg
      },
      isDisabled: function () {
        return this.disabled || this.loading
      },
    },
  }, // btn
  validator: {
    props: {
      unvalid: props.Boolean,
      required: props.Boolean,
      minlength: props.Int,
      maxlength: props.UInt,
      pattern: [String, RegExp],
      valid: props.Function,
      validInfo: props.String,
      invalidInfo: props.String,
    },
    data() {
      return {
        validClass: 'is-valid',
        inValidClass: 'is-invalid',
      }
    },
    methods: {
      validator: function (e, data = null, resetCallback = null, validateCallback = null, inValidateCallback = null) {
        if (this.unvalid) return // 不做验证
        if (this.readonly) return // readonly 时不校验
        if (this.disabled) return // disabled 时不校验
        // 验证函数不会对传入的数据进行处理
        const elm = e.target || e
        const hasData = !tools.obj.type.isNull(data)
        const value = hasData ? (data.trim ? data.trim() : data) : (elm.value && elm.value.trim && elm.value.trim() || '')
        // 开始验证时 复位 之前的状态
        this.validateReset(elm, resetCallback)
        // 验证失败
        if (!this.validating(value)) { this.inValidateDone(elm, inValidateCallback); return }
        // 验证成功
        // 当存在 valid slot 或 validInfo 时
        if (this.$slots.valid || this.validInfo) this.validateDone(elm, validateCallback)
        this.$emit('valid')
      },
      // 开始验证时 复位 之前的状态
      validateReset: function (e, resetCallback = null) {
        if (tools.obj.type.isFunction(resetCallback)) {
          resetCallback()
        } else {
          this.removeValidClass(e) // 移除可能的 is-valid
          this.removeInValidClass(e) // 移除可能的 is-invalid
        }
      },
      // 验证集合 通过返回 true，不通过返回 false
      validating: function (value) {
        // 非空验证（required 为 false 不做校验直接返回 true，验证通过返回 true）
        if (!this.validateRequired(value)) return false
        // 长度验证（传入字符串长度为 0、minlength 小于 0、minlength 大于 maxlength 不做校验直接返回 true，验证通过返回 true）
        if (!this.validateLength(value)) return false
        // 正则校验（传入字符串长度为 0、无正则表达式 不做校验直接返回 true，验证通过返回 true）
        if (!this.validateRange(value)) return false
        // 自定义验证（用户自定义验证函数，验证通过返回 true）
        if (!this.validateCustomize(value, this.valid)) return false
        // 验证成功
        return true
      },
      // 验证成功后 执行的方法
      validateDone: function (e, validateCallback = null) {
        validateCallback ? validateCallback() : this.addValidClass(e)
      },
      // 验证失败后 执行的方法
      inValidateDone: function (e, inValidateCallback = null) {
        inValidateCallback ? inValidateCallback() : this.addInValidClass(e)
      },
      // 验证成功后 添加 class
      addValidClass: function (e) {
        this.removeInValidClass(e) // 添加前 移除可能的 失败验证 class
        tools.dom.addClass(e, this.validClass)
      },
      // 移除 验证成功 的 class
      removeValidClass: function (e) {
        tools.dom.removeClass(e, this.validClass)
      },
      // 验证失败后 添加 class
      addInValidClass: function (e) {
        this.removeInValidClass(e) // 添加前 移除可能的 成功验证 class
        tools.dom.addClass(e, this.inValidClass)
      },
      // 移除 验证失败 的 class
      removeInValidClass: function (e) {
        tools.dom.removeClass(e, this.inValidClass)
      },
      // 非空验证（验证通过返回 true）
      validateRequired: function (value) {
        // required 为 false 不做校验直接返回 true
        if (!this.required) return true
        if ((tools.obj.type.isString(value) || tools.obj.type.isArray(value)) && value.length === 0) {
          this.$emit('invalid', 'required')
          return false
        }
        if (tools.obj.type.isBoolean(value) && !value) {
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
        if (value.length === 0 || minlength < 0 || minlength >= maxlength) return true
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
      validateRange: function (value, regex = this.defaultRegex || this.pattern) {
        // 传入字符串长度为 0、无正则表达式 不做校验直接返回 true
        if (value.length === 0 || !regex) return true
        var patternRegex = new RegExp(regex);
        if (!value.match(patternRegex)) {
          this.$emit('invalid', 'regex')
          return false
        }
        return true
      },
      // 自定义验证（用户自定义验证函数，验证通过返回 true）
      validateCustomize: function (value, valid) {
        // 传入的字符串为空，无自定义验证函数，不做校验直接返回 true
        if (value.length === 0 || !valid) return true
        if (!valid(value)) {
          this.$emit('invalid', 'valid')
          return false
        }
        return true
      }
    },
  }, // validator
  readonly: {
    props: {
      readonly: props.Boolean,
      disabled: props.Boolean,
    },
    computed: {
      readonlyClass: function () {
        return this.readonly ? 'form-control-plaintext' : 'form-control'
      },
    },
  }, // readonly
}
