<template>
  <div class="d-flex align-items-start flex-column vw-100 vh-100">
    <main-header class="min-vw-100 mt-0" />
    <div class="d-flex vw-100 vh-100">
      <aside class="d-flex align-items-start bg-primary text-light flex-column" style="max-width: 300px">
        <main-menu class="overflow-auto" />
        <main-section />
      </aside>
      <div class="d-flex align-items-start flex-column w-100 h-100">
        <main-content class="w-100 h-100 overflow-auto m-1" />
        <main-footer class="w-100 mb-0" />
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/layout/MainHeader.vue"
import MainContent from "@/components/layout/MainContent.vue"
import MainFooter from "@/components/layout/MainFooter.vue"
import MainMenu from '@/components/layout/MainMenu/nav.vue'
import MainSection from '@/components/layout/MainSection.vue'

export default {
  name: "layout",
  components: {
    MainHeader,
    MainContent,
    MainFooter,
    MainMenu,
    MainSection,
  }
};
</script>
