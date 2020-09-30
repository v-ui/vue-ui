<template>
  <div>
    <h2>b-nav</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-nav
        class="col-11"
        :list="list"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        nav width dropdown:
      </font>
      <b-nav
        class="col-11"
        :list="listd"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        set:
      </font>
      <div class="col-11">
        <div class="row py-1">
          <font class="col-1">
            set:start
          </font>
          <b-nav
            class="col-11"
            :list="list"
            set="start"
          />
        </div>
        <div class="row py-1">
          <font class="col-1">
            set:center
          </font>
          <b-nav
            class="col-11"
            :list="list"
            set="center"
          />
        </div>
        <div class="row py-1">
          <font class="col-1">
            set:end
          </font>
          <b-nav
            class="col-11"
            :list="list"
            set="end"
          />
        </div>
      </div>
    </div>
    <div class="row py-1">
      <font class="col-1">
        column:
      </font>
      <b-nav
        class="col-11"
        :list="list"
        column
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        column width dropdown:
      </font>
      <b-nav
        class="col-11"
        :list="listd"
        column
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        tabs:
      </font>
      <b-nav
        class="col-11"
        :list="list"
        tabs
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        pills:
      </font>
      <b-nav
        class="col-11"
        :list="list"
        pills
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        select(label1):
      </font>
      <b-nav
        class="col-11"
        :list="list"
        select="label1"
        pills
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        fill:
      </font>
      <b-nav
        class="col-11"
        :list="list2"
        tabs
        fill
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        justified:
      </font>
      <b-nav
        class="col-11"
        :list="list2"
        tabs
        justified
      />
    </div>
    <h2>b-navbar</h2>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-navbar
        class="col-11 navbar-expand-lg navbar-light bg-light"
        :list="list"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        brand:
      </font>
      <b-navbar
        class="col-11 navbar-expand-lg navbar-light bg-light"
        brand="Brand Text"
        :list="list"
      />
    </div>
  </div>
</template>

<script>
import BNav from "@/components/base/Navigation/Nav/b-nav.vue";
import BNavbar from "@/components/base/Navigation/Navbar/b-navbar.vue";

export default {
  name: "BNavDemo",
  components: { BNav, BNavbar },
  data() {
    return {
      list: [
        { label: "label1" },
        { label: "label2" },
        { label: "active href", href: "#", active: true },
        { label: "disabled label", disabled: true },
      ],
      list2: [
        { label: "label1" },
        { label: "label2" },
        {
          label: "toooooooooooooooooooooooo loooooooooooooooooooooooog",
          href: "#",
        },
      ],
      listd: [
        { label: "label1" },
        { label: "label2" },
        { label: "active href", href: "#", active: true },
        { label: "disabled label", disabled: true },
        {
          dropdown: true,
          label: "dropdown label",
          list: [
            {
              header: "header label",
              divider: true,
              label: "label",
              value: "value",
            },
            { divider: true, label: "label", value: "value" },
            { label: "label", value: "value" },
            { value: "value" },
            { value: "href value", href: "#" },
            { value: "active value", active: true },
            { value: "disabled value", disabled: true },
          ],
        },
      ],
    };
  },
};
</script>
