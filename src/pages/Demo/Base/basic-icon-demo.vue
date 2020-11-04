<template>
  <div class="mx-2">
    <h2>Icon</h2>参考链接：
    <!-- <base-a
      class="px-1"
      href="https://fontawesome.com"
      text="fontawesome"
    /> -->
    <base-a
      class="px-1"
      href="https://icons.getbootstrap.com"
      text="bootstrap icons"
    />
    <hr>
    <div class="container">
      <div class="row m-3">
        <b-text class="col mx-1" type="search" size="lg" v-model="search" />
        <button
          v-coll:control="'#collapse'"
          class="btn btn-primary"
          type="button"
        >
          高级搜索
        </button>
      </div>
      <b-collapse id="collapse" class="row align-items-center mx-3">
        <div class="row align-items-start m-1">
          <font class="col-1">填充：</font>
          <b-radio-group class="col" :list="[ 'all', 'fill', 'half' ]" name="fill" v-model="radioFill" inline />
        </div>
        <div class="row align-items-start m-1">
          <font class="col-1">方向：</font>
          <b-checkbox-group class="col" :list="[ 'up', 'right', 'down', 'left', 'start', 'center', 'middle', 'end', 'clockwise' ]" name="type" v-model="checkTypes" inline />
        </div>
        <div class="row align-items-start m-1">
          <font class="col-1">样式：</font>
          <b-radio-group class="col" :list="[ 'all', 'triangle', 'square', 'journal', 'diamond', 'octagon', 'bookmark', 'bag', 'circle', 'shield', 'cloud', 'patch', ]" name="style" v-model="radioStyle" inline />
        </div>
        <div class="row align-items-start m-1">
          <font class="col-1">种类：</font>
          <b-radio-group
            v-model="radioType"
            class="col"
            :list="[ 'all',
                    'arrow', 'badge', 'box', 'calendar', 'card', 'chat', 'chevron', 'dice', 'suit', 'emoji',
                    'file', 'folder',
                    'gear', 'text', 'type',
                    'grid', 'table', 'collection', 'list',
                    'layout', 'justify', 'align', 'sort', 'filter' ]"
            name="kind"
            inline />
        </div>
        <div class="row align-items-center m-1">
          <b-info class="m-1" info="以上选项均为包含全部选项" />
          <button class="btn btn-link" @click="clear" >清除选择</button>
        </div>
      </b-collapse>
      <p class="mb-3">共 {{ searchIcons.length }} 个</p>

      <ul class="row row-cols-3 row-cols-sm-4 row-cols-lg-6 row-cols-xl-8  list-unstyled list">
        <li v-for="(item, key) in searchIcons" :key="key" class="col mb-4">
          <a class="d-block text-decoration-none text-center">
            <div class="p-3 py-4 mb-2 bg-light text-primary text-center rounded" style="font-size: 2em">
              <basic-icon :icon="item" />
            </div>
            <font class="clip btn btn-link pt-1" v-tip.bottom="'Click to copy'" :data-clipboard-text="item">
              {{ item }}
            </font>
            <basic-icon v-if="item === copyed" class="text-success mx-1" icon="check-circle-fill" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import util from '@/components/util'

import BasicIcon from '@/components/basic/basic-icon.vue'

import BaseA from "@/components/basic/A/basic-a.vue";
import BText from "@/components/form/b-text.vue";
import BRadioGroup from "@/components/form/Radio/b-radio-group.vue";
import BCheckboxGroup from "@/components/form/CheckBox/b-checkbox-group.vue"

import BInfo from '@/components/basic/basic-info.vue'
import BCollapse from "@/components/base/Collapse/index.js";

export default {
  name: "basic-icon-demo",
  components: { BasicIcon, BaseA, BText, BRadioGroup, BCheckboxGroup, BInfo, BCollapse, },
  mixins: [ util.mixins.clip.base, ],
  data() {
    return {
      search: null,
      clipElement: '.clip',
      copyed: null,
      checkTypes: [],
      radioFill: 'all',
      radioStyle: 'all',
      radioType: 'all',
    }
  },
  mounted() {
    this.clipboard.on('success',(e) => {
      this.copyed = e.trigger.attributes["data-clipboard-text"].value
    })
  },
  computed: {
    icons: function() {
      const requireAll = requireContext => requireContext.keys().map(requireContext)
      const req = require.context('bootstrap-icons/icons', false, /\.svg$/)
      const modules = requireAll(req).map(e => e.default.id.slice(5) )
      return modules
    },
    searchIcons: function() {
      let result = this.icons
      if (this.search) {
        result = this.icons.filter(e => e.includes(this.search))
      }
      if (this.checkTypes && this.checkTypes.length > 0) {
        result = result.filter(e => this.checkTypes.every(i => e.includes(i)))
      }
      if (this.radioFill && this.radioFill !== 'all') {
        result = result.filter(e => e.includes(this.radioFill))
      }
      if (this.radioStyle && this.radioStyle !== 'all') {
        result = result.filter(e => e.includes(this.radioStyle))
      }
      if (this.radioType && this.radioType !== 'all') {
        result = result.filter(e => e.includes(this.radioType))
      }

      return result
    },
  },
  methods: {
    clear: function() {
      this.checkTypes = []
      this.radioFill = 'all'
      this.radioStyle = 'all'
      this.radioType = 'all'
    }
  },
};
</script>
