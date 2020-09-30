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
    <h2>box-accordion</h2>
    <hr>
    <div class="row pt-1">
      <font class="col-1">
        default
      </font>
      <div class="col-11 accordion">
        <box-accordion title="title">
          content
        </box-accordion>
        <box-accordion title="title">
          content
        </box-accordion>
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
        <box-accordion
          title="title"
          parent="#accordion"
        >
          content
        </box-accordion>
        <box-accordion
          title="title"
          parent="#accordion"
        >
          content
        </box-accordion>
      </div>
    </div>
    <hr>
    <h2>box-accordion-list</h2>
    <hr>
    <div class="row pt-1">
      <font class="col-1">
        default
      </font>
      <box-accordion-list
        class="col-11"
        :list="list"
      />
    </div>
    <div class="row pt-1">
      <font class="col-1">
        parent
      </font>
      <box-accordion-list
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
import BoxAccordion from "@/components/box/Accordion/box-accordion.vue";
import BoxAccordionList from "@/components/box/Accordion/box-accordion-list.vue";

export default {
  name: "BCollapseDemo",
  components: { BCollapse, BoxAccordion, BoxAccordionList },
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
