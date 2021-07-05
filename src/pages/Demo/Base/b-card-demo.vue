<template>
  <div>
    <h2>b-card</h2>
    <hr>
    <h3>Base</h3>
    <b-card>
      <b-card-title>Card Title</b-card-title>
      <b-card-subtitle>Card Subtitle</b-card-subtitle>
      <b-card-text>Card text</b-card-text>
      <b-card-link>Card link</b-card-link>
    </b-card>
    <h3>Header</h3>
    <b-card>
      <template #header>
        <b-card-title>Card Title</b-card-title>
      </template>
      <b-card-subtitle>Card Subtitle</b-card-subtitle>
      <b-card-text>Card text</b-card-text>
      <b-card-link>Card link</b-card-link>
    </b-card>
    <h3>Header with nav</h3>
    <div>
      b-nav 的使用请参考
      <base-a href="Demo-Base-b-nav">
        b-nav
      </base-a>
      <br>请勿加入 dropdown，这会对辅助技术用户不友好
    </div>
    <div class="row mx-1">
      <b-card class="col-auto">
        <template #header>
          <b-nav
            class="card-header-tabs"
            :list="nav"
            tabs
          />
        </template>
        <b-card-subtitle>Card Subtitle</b-card-subtitle>
        <b-card-text>Card text</b-card-text>
        <b-card-link href="#">
          Card link
        </b-card-link>
      </b-card>
      <div class="col-1" />
      <b-card class="col-auto">
        <template #header>
          <b-nav
            class="card-header-pills"
            :list="list"
            pills
          />
        </template>
        <b-card-subtitle>Card Subtitle</b-card-subtitle>
        <b-card-text>Card text</b-card-text>
        <b-card-link href="#">
          Card link
        </b-card-link>
      </b-card>
    </div>
    <h3>Body</h3>
    <b-card class="col-auto">
      <template #header>
        <b-card-title>Card Title</b-card-title>
      </template>
      <template>
        <b-card-text>Card Body</b-card-text>
      </template>
    </b-card>
    使用 body slot 会替换 card-body 容器，一般用于复杂组件<br>
    <h3>Footer</h3>
    <div class="row mx-1">
      <div class="col-1" />
    </div>
    <b-card class="col-auto">
      <template #header>
        <b-card-title>Card Title</b-card-title>
      </template>
      <b-card-title>Card Title</b-card-title>
      <b-card-subtitle>Card Subtitle</b-card-subtitle>
      <b-card-text>Card text</b-card-text>
      <template #footer>
        <b-card-text>Card Footer</b-card-text>
      </template>
    </b-card>
    <hr>
    <h3>b-card-image</h3>
    <div class="row mx-1">
      <font class="col-1">set=""(default)</font>
      <b-card class="text-primary col-auto">
        <template #image>
          <b-card-image src="https://unsplash.it/720/560?random" />
        </template>
        <b-card-title>Card Title</b-card-title>
        <b-card-subtitle>Card Subtitle</b-card-subtitle>
        <b-card-text>Card text</b-card-text>
        <template #footer>
          <b-card-text>Card Footer</b-card-text>
        </template>
      </b-card>
      <font class="col-1">set="top"</font>
      <b-card class="text-primary col-auto">
        <template #image>
          <b-card-image src="https://unsplash.it/720/560?random" set="top" />
        </template>
        <template #body>
          <b-card-img-overlay>
            <b-card-title>Card Title</b-card-title>
            <b-card-subtitle>Card Subtitle</b-card-subtitle>
            <b-card-text>Card text</b-card-text>
          </b-card-img-overlay>
        </template>
        <template #footer>
          <b-card-text>Card Footer</b-card-text>
        </template>
      </b-card>
    </div>
    <h3>Card with list</h3>
    b-list 的使用请参考
    <base-a href="Demo-Base-b-list">
      b-list
    </base-a>
    <b-card>
      <template #header>
        <b-card-title>Card Nine</b-card-title>
        <b-card-subtitle>Card Subtitle</b-card-subtitle>
        <b-card-text>Card text</b-card-text>
        <b-card-text>Card text</b-card-text>
        <b-card-text>Card text</b-card-text>
      </template>
      <template #body>
        <b-list
          :list="list"
          flush
        />
      </template>
      <template #footer>
        <b-card-text>Card text</b-card-text>
        <b-card-link>Card link</b-card-link>
      </template>
    </b-card>
    <hr>
    <h3>Card layout</h3>
    <h3>Card Group</h3>
    <b-card-group>
      <b-card class="col-auto">
        <b-card-title>Card One</b-card-title>
        <b-card-subtitle>Card Subtitle</b-card-subtitle>
        <b-card-text>Card text</b-card-text>
      </b-card>
      <b-card class="col-auto">
        <template #header>
          <b-card-title>Card Two</b-card-title>
        </template>
        <b-card-subtitle>Card Subtitle</b-card-subtitle>
        <b-card-text>Card text</b-card-text>
      </b-card>
    </b-card-group>
    可参考此连接 <base-a href="https://github.com/twbs/bootstrap/pull/28922">side effects</base-a>
    使用 <base-a href="https://masonry.desandro.com/">Masonry</base-a> 实现根据竖直空间排布 card 的效果
  </div>
</template>

<script>
import BCard from "@/components/base/Card/b-card.vue";
import BCardLink from "@/components/base/Card/b-card-link.vue";
import BCardImage from "@/components/base/Card/b-card-image.vue";
import "@/components/base/Card/b-card-sub-components.js";

import BNav from "@/components/base/Navigation/Nav/b-nav.vue";
import BaseA from "@/components/basic/A/basic-a.vue";
import BList from "@/components/base/List/b-list.vue";

export default {
  name: "BCardDemo",
  components: {
    BCard,
    BCardLink,
    BCardImage,
    BNav,
    BaseA,
    BList
  },
  data() {
    return {
      nav: [
        { label: "active href", href: "#", active: true },
        { label: "label1" },
        { label: "label2" },
        { label: "disabled label", disabled: true }
      ],
      list: [
        { label: "label1" },
        { label: "label2" },
        { label: "disabled", disabled: true }
      ]
    };
  }
};
</script>
