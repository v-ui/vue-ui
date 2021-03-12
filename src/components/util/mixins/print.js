import { print } from './plugin/print'

export default {
  computed: {
    opts: function() {
      return null
    }
  },
  methods: {
    print: function() {
      print(this.opts);
    },
  },
}
