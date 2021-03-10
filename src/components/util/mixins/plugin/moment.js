import moment from 'moment'

export default {
  base: {
    data () {
      return {
        moment,
      }
    },
    async created () {
      this.moment.locale(this.$i18n.locale || 'en-US')
    },
    watch: {
      '$i18n.locale': function(value) {
        this.moment.locale(value)
      },
    },
  },
}
