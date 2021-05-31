// 参考：https://printjs.crabbly.com/
import printJS from "print-js"

const print = {
  computed: {
    opts: function() {
      return {}
    }
  },
  methods: {
    print: function(opts = this.opts) {
      printJS(opts);
    },
  },
}

export default {
  print,
}
