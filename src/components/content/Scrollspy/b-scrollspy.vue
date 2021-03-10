<template>
  <section
    class="row no-gutters h-100 mx-auto"
    :class="{row: set != 'top',}"
    role="main"
  >
    <!-- Contents on top -->
    <!-- <b-scrollspy-nav
      v-if="showContents && set == 'top'"
      :id="scrollspyId"
      class="w-100 bg-light"
      :brand="title || 'Contents'"
      :list="contents"
      :set="set"
    /> -->
    <!-- list of artices -->
    <div class="col-3 bg-light h-100">
      <div
        v-if="artices && artices.length && artices.length > 0"
        class="row no-gutters h-100"
      >
        <div class="col" />
        <b-scrollspy-nav
          :id="scrollspyId"
          class="col-6 overflow-auto w-50 h-100"
          :brand="title || 'Contents'"
          :list="contents"
          :set="set"
          column
        />
      </div>
    </div>
    <!-- main -->
    <div
      v-show="$slots.default"
      :id="articleBoxId"
      class="col-6 border-left border-right overflow-auto h-100 p-3"
      :data-target="'#' + scrollspyId"
      data-spy="scroll"
      data-offset="20"
    >
      <header class="mx-2">
        <slot
          v-if="$slots.header"
          name="header"
        />
        <div v-else>
          <h1
            v-if="title"
            class="text-center"
          >
            {{ title }}
          </h1>
          <div class=" mr-3 text-right text-muted">
            <span v-if="author">{{ author }}</span><br>
            <span v-if="time"><time>{{ time }}</time></span>
          </div>
        </div>
        <hr>
      </header>
      <div ref="artical">
        <slot class="mx-2" />
      </div>
      <footer
        v-if="info || $slots.footer"
        class="ixed-bottom"
      >
        <hr>
        <slot name="footer">
          <div class="p-2">
            <font>{{ info }}</font>
          </div>
        </slot>
      </footer>
    </div>
    <!-- Contents on right -->
    <b-scrollspy-nav
      v-if="!hideContents"
      :id="scrollspyId"
      class="col overflow-auto h-100"
      :brand="title || 'Contents'"
      :list="contents"
      :set="set"
      column
    />
  </section>
</template>

<script>
import tools from "@/tools/index.js";
import util from "@/components/util/index.js";

import BScrollspyNav from "./ScrollspyNav/b-scrollspy-nav";

export default {
  name: "BScrollspy",
  components: { BScrollspyNav },
  props: {
    id: {
      type: String,
      default: () => tools.random.getRandomString(),
    },
    set: {
      type: String,
      default: "left",
      validator: value => ["top", "left", "right"].includes(value),
    },
    artices: Array,
    title: util.props.String,
    author: util.props.String,
    time: [Date, String],
    info: util.props.String,
    hideContents: util.props.Boolean,
  },
   data() {
    return {
      showContents: true,
      contents: [],
      map: { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 }
    };
  },
  computed: {
    column: function() {
      return this.set != "top";
    },
    scrollspyId: function() {
      return "Scrollspy-" + this.id;
    },
    articleBoxId: function() {
      return "Article-Box-" + this.id;
    }
  },
  async mounted() {
    const node = await this.getArticleNode();
    const arrs = await this.getHTarget(node);
    this.contents = await this.getContents(arrs);
    // 目录计算完成后显示文章，否则无法完成目录与文章的联动
    await this.$nextTick();
    this.showContents = true;
  },
  methods: {
    getArticleNode: function() {
      return this.$refs.artical
    },
    getHTarget: function(node) {
      if (!node) return;
      let arrs = [];
      for (let i = 0; i < node.childNodes.length; i++) {
        let e = node.childNodes[i];
        if ( ["h1", "h2", "h3", "h4", "h5", "h6"].includes(e.tagName.toLowerCase()) ) {
          e.id = e.id || this.addId2HTarget(e);
          arrs.push({
            id: e.id,
            target: this.map[e.tagName.toLowerCase()],
            label: e.textContent
          });
        }
      }
      return arrs;
    },
    addId2HTarget: function(arr) {
      return `${arr.tagName.toLowerCase()}-${arr.textContent}`;
    },
    getContents: function(
      arrs,
      contents = [],
      lastTarget = arrs[0].target || this.map.h1
    ) {
      if (!arrs || !arrs.length) return;

      arrs.forEach((e, index, array) => {
        if (e.target == lastTarget) {
          contents.push(this.HTarget2Content(e));
          Object.assign(array[index], { added: true });
          // array.splice(index, 1)
        } else if (e.target > lastTarget) {
          if (this.set == "top" || contents.length == 0) return;
          let a = [];
          for (let i = 0; i < array.length; i++) {
            if (array[i].target <= lastTarget && !array[i].added) break;
            if (array[i].target > lastTarget && !array[i].added)
              a.push(array[i]);
          }
          if (!a || !a.length) return;
          contents[contents.length - 1].children
            ? this.getContents(
                a,
                contents[contents.length - 1].children,
                e.target
              )
            : this.getContents(
                a,
                Object.assign(contents[contents.length - 1], { children: [] })
                  .children,
                e.target
              );
        }
      });
      return contents;
    },
    HTarget2Content: function(e) {
      return { label: e.label, href: `#${e.id}` };
    }
  }
};
</script>
