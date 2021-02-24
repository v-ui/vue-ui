<template>
  <div>
    <h2>b-collapse</h2>
    <hr>
    <a
      v-coll:control="`#${id}`"
      class="btn btn-primary"
      role="button"
    >Toggle first element</a>
    <button
      v-coll:control="`#${id}`"
      class="btn btn-primary"
      type="button"
    >
      Toggle second element
    </button>
    <b-collapse :id="id">
      content
    </b-collapse>
    <hr>
    <h2>b-accordion</h2>
    <hr>
    <div class="row pt-1">
      <font class="col-1">
        default
      </font>
      <div class="col-11 accordion">
        <b-accordion title="title">
          content
        </b-accordion>
        <b-accordion title="title">
          content
        </b-accordion>
      </div>
    </div>
    <div class="row pt-1">
      <font class="col-1">
        parent
      </font>
      <div
        id="accordion"
        class="col-11 accordion"
      >
        <b-accordion
          title="title"
          parent="#accordion"
        >
          content
        </b-accordion>
        <b-accordion
          title="title"
          parent="#accordion"
        >
          content
        </b-accordion>
      </div>
    </div>
    <hr>
    <h2>b-accordion-list</h2>
    <hr>
    <div class="row pt-1">
      <font class="col-1">
        default
      </font>
      <b-accordion-list
        class="col-11"
        :list="list"
      />
    </div>
    <div class="row pt-1">
      <font class="col-1">
        parent
      </font>
      <b-accordion-list
        id="accordionList"
        class="col-11"
        :list="list"
        parent="#accordionList"
      />
    </div>
  </div>
</template>

<script>
import tools from "@/tools/index.js";

import BCollapse from "@/components/base/Collapse/index.js";
import BAccordion from "@/components/content/Accordion/b-accordion.vue";
import BAccordionList from "@/components/content/Accordion/b-accordion-list.vue";

export default {
  name: "BCollapseDemo",
  components: { BCollapse, BAccordion, BAccordionList },
  props: {
    id: {
      type: String,
      default: function() {
        return "Collapse-" + tools.random.getRandomString();
      }
    }
  },
  data() {
    return {
      control: "control info",
      list: [
        { title: "title one", content: "content one", show: true },
        { title: "title two", content: "content two" },
        { title: "title three", content: "content three" }
      ]
    };
  }
};
</script>
