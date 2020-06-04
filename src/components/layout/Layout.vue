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
import MainHeader from "@/components/layout/main-header.vue"
import MainContent from "@/components/layout/main-content.vue"
import MainFooter from "@/components/layout/main-footer.vue"
import MainMenu from '@/components/layout/MainMenu/main-menu.vue'
import MainSection from '@/components/layout/main-section.vue'

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
