import config from "@/config/index.js";
import props from '@/components/util/props.js'

const base = {
  props: {
    title: props.String,
    icon: props.String,
    status: props.String,
  },
  computed: {
    enumStatus: function() {
      return null
    },
    iconClass: function() {
      return this.icon
    },
    dataTitle: function() {
      return this.title
    },
  },
}

const message = {
  mixins: [ base, ],
  props: {
    status: props.messageStatus,
  },
  computed: {
    enumStatus: function() {
      return Object.getOwnPropertyDescriptor(config.ui.status, this.status);
    },
    dataColor: function() {
      return this.enumStatus && this.enumStatus.value && this.enumStatus.value.color
    },
    dataIcon: function() {
      return this.icon || (this.enumStatus && this.enumStatus.value && this.enumStatus.value.icon)
    },
    dataTitle: function() {
      return this.title || (this.enumStatus && this.enumStatus.value && this.enumStatus.value.title)
    },
    iconClass: function() {
      return `${this.dataIcon} text-${this.dataColor}`;
    },
    showIcon: function() {
      return this.dataIcon
    },
  },
}

const method = {
  mixins: [ base, ],
}

export default {
  method,
  message,
}
