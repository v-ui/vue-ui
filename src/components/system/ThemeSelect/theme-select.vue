<template>
  <b-dropdown
    v-if="list.length > 0"
    v-model="theme"
    trigger="Theme"
    :list="list"
  />
</template>

<script>
import BDropdown from "@/components/base/Dropdown/b-dropdown.vue";

export default {
  name: "ThemeSelect",
  components: { BDropdown },
  data() {
    return {
      list: [],
      theme: localStorage.theme
    };
  },
  watch: {
    theme: function(value) {
      this.$theme.setTheme(value && value.value || value);
    }
  },
  async created() {
    let themeList = await JSON.parse(await this.$theme.getThemesList());
    this.list = themeList.map && themeList.map(e => ({ value: e.name }));
    this.list.unshift({ value: this.$theme.defaultTheme });
  },
};
</script>
