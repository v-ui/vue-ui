import props from '@/components/util/props.js'

export default {
  base: {
    props: {
      type: {
        type: String,
        default: 'button',
        validator: value => ['button', 'submit', 'reset'].includes(value)
      },
      value: {
        ...props.String,
        default: `Button`,
      },
      color: {
        ...props.color,
        validator: value => 'link' === value || props.color.validator(value)
      },
      size: props.size,
      href: {
        ...props.href,
        default: '',
      },
      active: props.Boolean,
      disabled: props.Boolean,
      outline: props.Boolean,
    },
    computed: {
      btnType: function() {
        if (this.href) {
          return this.href ? 'Button' : this.type
        }
      },
      objClass: function () {
        let btnStyle = `btn-${this.outline ? 'outline-' : ''}${this.color}`
        let size = `${this.size ? `btn-${this.size}` : ''}`
        let active = `${this.active ? 'active' : ''}`
        return `${btnStyle} ${size} ${active}`
      },
      toggle: function() {
        return this.active ? 'button' : null
      },
    },
  }, // btn
}
