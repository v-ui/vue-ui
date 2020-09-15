import { createPopper } from '@popperjs/core'

export default {
  base: {
    data () {
      return {
        popper: null,
        refElement: null,
        popperElement: null,
        popperOpts: { placement: 'bottom-start', },
      }
    },

    beforeDestroy() {
      if (!this.popper) return
      this.popper.destroy()
      this.popper = null
    },
    watch: {
      refElement() {
        this.initPopper()
      },
      popperElement: function() {
        this.initPopper()
      }
    },
    methods: {
      initPopper: async function() {
        if (this.refElement && this.popperElement) {
          await this.$nextTick()
          this.popper = await createPopper(this.refElement, this.popperElement, this.popperOpts)
        }
      },
    },
  },
}
