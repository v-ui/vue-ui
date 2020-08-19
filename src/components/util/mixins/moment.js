import moment from 'moment'

export default {
  base: {
    data () {
      return {
        moment,
      }
    },
    async created () {
      await this.$nextTick()
      await this.moment.locale(this.$i18n.locale)
    },
    watch: {
      '$i18n.locale': function(value) {
        this.moment.locale(value)
      },
    },
  },
}
