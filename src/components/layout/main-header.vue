<template>
  <header class="d-print-none shadow-sm">
    <div class="shadow-sm navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand d-inline-block text-truncate" href="#">
        <img src="@/assets/logo.png" width="30" height="30" alt="logo" />
        {{ $t('systemName') }}
        <small class="navbar-text">(bate 0.1)</small>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item navbar-text dropdown" />
        </ul>
        <ul class="navbar-nav my-lg-0">
          <li class="nav-item dropdown navbar-text px-1">
            <lang-select class="nav-link" />
          </li>
          <li class="nav-item dropdown navbar-text px-1">
            <theme-select class="nav-link" />
          </li>
          <li class="nav-item dropdown navbar-text px-1">
            <user-card class="nav-link" />
          </li>
          <li class="nav-item px-1">
            <screenfull class="nav-link" />
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-primary border-bottom border-light shadow-sm d-flex w-100">
      <!-- <dropdown-menu /> -->
      <router-link class="btn btn-primary d-inline-flex" to="/" role="button">
        <i class="fas fa-home align-self-center px-1" />
        <font class="align-self-center px-1">Home</font>
      </router-link>
      <nav-tabs class="d-inline-flex overflow-auto" />
    </div>
  </header>
</template>

<script>
import LangSelect from "@/components/system/LangSelect/lang-select.vue";
import ThemeSelect from "@/components/system/ThemeSelect/theme-select.vue";
import Screenfull from "@/components/system/Screenfull/screenfull.vue";
import UserCard from "@/components/system/User/user-card.vue";
// import DropdownMenu from "@/components/system/DropdownMenu/dropdown-menu.vue";
import NavTabs from "@/components/system/NavTabs/nav-tabs.vue";

export default {
  name: 'main-header',
  components: {
    LangSelect,
    ThemeSelect,
    Screenfull,
    UserCard,
    // DropdownMenu,
    NavTabs
  }
};
</script>
