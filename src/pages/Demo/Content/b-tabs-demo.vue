<template>
  <div>
    <h2>b-tabs</h2>
    <div>
      b-tab-list 的使用请参考
      <a href="Demo-Base-b-nav">b-nav</a>
      <br>
      请勿加入 dropdown，这会对辅助技术用户不友好
    </div>
    <hr>
    <b-tab-list :list="list" />
    <b-tab-content>
      <b-tab-pane
        id="one"
        active
      >
        one
      </b-tab-pane>
      <b-tab-pane id="two">
        two
      </b-tab-pane>
      <b-tab-pane id="three">
        three
      </b-tab-pane>
    </b-tab-content>
    <hr>
    <div class="row mx-1">
      <b-tab-list
        class="col-2"
        column
        pills
        justified
        :list="list2"
      />
      <b-tab-content class="col-10">
        <b-tab-pane
          id="one2"
          active
        >
          one
        </b-tab-pane>
        <b-tab-pane id="two2">
          two
        </b-tab-pane>
        <b-tab-pane id="three2">
          three
        </b-tab-pane>
      </b-tab-content>
    </div>
  </div>
</template>

<script>
import BTabList from "@/components/content/Tabs/b-tab-list.vue";
import BTabContent from "@/components/content/Tabs/b-tab-content.vue";
import BTabPane from "@/components/content/Tabs/b-tab-pane.vue";

export default {
  name: "BTabsDemo",
  components: { BTabList, BTabContent, BTabPane },
  data() {
    return {
      list: [
        { label: "one", href: "#one", active: true },
        { label: "two", href: "#two", active: false },
        { label: "three", href: "#three", active: false }
      ],
      list2: [
        { label: "one", href: "#one2", active: true },
        { label: "two", href: "#two2", active: false },
        { label: "three", href: "#three2", active: false }
      ]
    };
  }
};
</script>
