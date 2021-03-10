<template>
  <div class="d-flex flex-column flex-nowrap overflow-hidden vh-100 vw-100">
    <main-header />
    <div class="flex-grow-1 d-flex flex-nowrap overflow-hidden">
      <aside
        class="flex-grow-1 overflow-auto d-flex align-items-start flex-column bg-primary text-light"
        style="min-width: 300px; max-width: 300px"
      >
        <main-menu class="flex-grow-1 overflow-auto" />
        <main-section class="border-top border-light" />
      </aside>
      <div class="flex-grow-1 overflow-hidden d-flex flex-nowrap flex-column">
        <main-content class="flex-grow-1 overflow-auto d-flex flex-nowrap m-1 p-1" />
        <main-footer />
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
  name: "Layout",
  components: {
    MainHeader,
    MainContent,
    MainFooter,
    MainMenu,
    MainSection,
  }
};
</script>

<style scoped>
.parent{
	display:flex;
	flex-flow:column nowrap;
	overflow:hidden;
}
.b{
flex:1;
}
</style>
