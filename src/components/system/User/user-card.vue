<template>
  <b-dropdown
    hide-toggle
    menu-align="end"
  >
    <template #trigger>
      <Avatar />
    </template>
    <span class="dropdown-item-text">User Info</span>
    <div
      class="card dropdown-item"
      style="width: 18rem;"
    >
      <Avatar />
      <h5 class="card-title">
        User Name
      </h5>
      <p class="card-text text-wrap">
        Some quick example text.
      </p>
    </div>
    <div class="dropdown-divider" />
    <div class="card dropdown-item m-0">
      Setting
    </div>
    <div class="card dropdown-item m-0">
      sign Out
    </div>
  </b-dropdown>
</template>

<script>
import Avatar from "./avatar.vue";
import BDropdown from "@/components/base/Dropdown/b-dropdown.vue";

export default {
  name: "UserCard",
  components: { Avatar, BDropdown }
};
</script>

