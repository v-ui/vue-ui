<template>
  <div />
</template>

<script>
import { fs, path } from "filer";

export default {
  name: "BFileBrowser",
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log(fs);
      fs.stat(path.dirname("/"), (error, stat) => {
        if (stat.isDirectory()) {
          fs.readdir("/", (error, files) => {
            console.log(files);
          });
        }
      });
    }
  }
};
</script>
