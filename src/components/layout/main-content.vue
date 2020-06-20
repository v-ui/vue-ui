<template>
  <main class=" border border-primary rounded-lg p-3">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition name="component-fade" mode="out-in">
      <router-view class="h-100" />
    </transition>
  </main>
</template>

<script>
export default {
  name:'main-content',
}
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
