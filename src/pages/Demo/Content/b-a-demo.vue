<template>
  <div>
    <h2>base-a</h2>
    <pre>
    请勿滥用 base-a 或 a 标签，应只用于以下用途：
        1. 导航
        2. 定位
        3. 页面跳转
        4. 链接
    href 属性为必填，如若发现没有可用的 href 值则很可能出现了 base-a 的滥用，请考虑使用其它控件/标签，
    除定位到顶部，其它用途请不要使用 ‘#’、‘#top’ 作为 href 的值，这仍然是滥用行为，请严格按照以上用途使用
    （本项目中的滥用是出于样式展示目的，实际使用时请给予有意义的 href 值）
        </pre>
    <hr>
    <div class="row py-1">
      <font class="col-1">
        default
      </font>
      <base-a class="col-auto" href="#">
        text
      </base-a>
    </div>
    <div class="row py-1">
      <font class="col-1">
        disabled
      </font>
      <base-a
        class="col-auto"
        href="#"
        disabled
      >
        text
      </base-a>
    </div>
    <div class="row py-1">
      <font class="col-1">
        href
      </font>
      <div class="col-11">
        <div class="row">
          <font class="col-2">
            tel:
          </font>
          <base-a class="col-auto" href="tel:电话号码" />
        </div>
        <div class="row">
          <font class="col-2">
            sms:
          </font>
          <base-a class="col-auto" href="sms:电话号码" />
        </div>
        <div class="row">
          <font class="col-2">
            mailto:
          </font>
          <base-a class="col-auto" href="mailto:邮件地址" />
        </div>
        （详情：<base-a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Email_links">
            Email links | MDN
          </base-a>）
        <div class="row">
          <font class="col-2">
            link:
          </font>
          <base-a
            class="col-auto px-1"
            href="http://www.bing.com"
            text="Bing"
          />
          <base-a
            class="col-auto px-1"
            href="b-About"
          />
        </div>
        <div class="row">
          <font class="col-2">
            Anchor point:
          </font>
          <base-a
            class="col-auto px-1"
            href="#"
          />
          <base-a
            class="col-auto px-1"
            href="#top"
          />
          <base-a
            class="col-auto px-1"
            href="#1-1"
          />
        </div>
      </div>
    </div>
    <div class="row py-1">
      <font class="col-1">
        download
      </font>
      <base-a
        class="col-auto"
        href="b-About"
        download="b-About.vue"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        hideIcon
      </font>
      <base-a
        class="col-auto"
        href="http://www.bing.com"
        text="Bing"
        hide-icon
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        icon
      </font>
      <base-a
        class="col-auto"
        href="#"
        text="text"
        icon="fas fa-info"
      />
    </div>
  </div>
</template>

<script>
import BaseA from '@/components/basic/A/basic-a.vue'

export default {
    name: 'BasicADemo',
    components: { BaseA, },
}
</script>
