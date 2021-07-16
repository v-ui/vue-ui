<template>
  <b-dropdown
    v-if="langs.length > 0"
    v-model="locale"
    primary-key="code"
    trigger="language"
    :list="langs"
    hide-null
  />
</template>

<script>
import config from "@/config/index";
import { loadLanguageAsync } from "@/lang/index";
import BDropdown from '@/components/base/Dropdown/b-dropdown.vue'

export default {
  name: "LangSelect",
  components: { BDropdown },
  data() {
    // return { langs: ["zh", "en"] }
    return {
      locale: config.lang.defaultLocale, // 加载默认语言
      langs: config.lang.langsList.map(e => ({value: e.name, code: e.code})), // 支持的语言列表
    };
  },
  computed: {
    select: function () {
      return this.langs.find && this.langs.find(e => e.code.toLowerCase() == this.locale.toLowerCase()).value
    },
  },
  watch: {
    locale: function(value) {
      loadLanguageAsync(value && value.code || value); // 加载所选择的语言
    },
  },
  mounted() {
    loadLanguageAsync(config.lang.fallbackLocale); // 加载备用语言包
    loadLanguageAsync(config.lang.defaultLocale); // 加载默认语言包
  },
  created() {
    this.locale = config.lang.defaultLocale // 加载默认语言
  },
}
</script>
