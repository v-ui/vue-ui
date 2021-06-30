import config from "@/config/index.js";
import props from '@/components/util/props.js'

const base = {
  props: {
    title: props.String,
    icon: props.String,
    status: props.baseStatus,
  },
  computed: {
    enumStatus: function() {
      return null
    },
    dataTitle: function() {
      return this.title || (this.enumStatus && this.enumStatus.value && this.enumStatus.value.title)
    },
    dataColor: function() {
      return this.enumStatus && this.enumStatus.value && this.enumStatus.value.color
    },
    dataIcon: function() {
      return this.icon || (this.enumStatus && this.enumStatus.value && this.enumStatus.value.icon)
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
      return Object.getOwnPropertyDescriptor(config.ui.status.message, this.status);
    },
  },
}

const method = {
  mixins: [ base, ],
  props: {
    status: props.methodStatus,
  },
  computed: {
    enumStatus: function() {
      return Object.getOwnPropertyDescriptor(config.ui.status.method, this.status);
    },
  },
}

export default {
  method,
  message,
}
