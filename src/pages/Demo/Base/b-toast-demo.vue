<template>
  <div class="mx-2">
    <h2>b-toast</h2>
    <br>
    <div class="row py-1">
      <font class="col-1">
        default
      </font>
      <b-toast
        class="col-11"
        content="content text"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        delay
      </font>
      <b-toast
        class="col-10"
        content="delay : 自动关闭时间（ms), 默认 10000ms（10s）"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        autohide
      </font>
      <b-toast
        class="col-10"
        content="autohide true : 不自动关闭"
        autohide
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        title
      </font>
      <b-toast
        class="col-11"
        autohide
        content="content text"
        title="title text"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        icon
      </font>
      <b-toast
        class="col-11"
        autohide
        title="title text"
        icon="envelope-fill"
      >
        icon='envelope-fill'
        <br>参考：
        <base-a
          href="https://icons.getbootstrap.com/"
          target="_blank"
        >
          https://icons.getbootstrap.com/
        </base-a>
      </b-toast>
    </div>
    <div class="row py-1">
      <font class="col-1">
        time
      </font>
      <b-toast
        class="col-11"
        autohide
        content="content text"
        title="title text"
        time="2018-01"
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        slot
      </font>
      <b-toast
        class="col-11"
        autohide
        title="title text"
      >
        you can add any string or DOM
      </b-toast>
    </div>
    <div class="row py-1">
      <font class="col-1">
        placement
      </font>
      <b-select
        class="col-11"
        v-model="placement"
        :list="placList"
        hide-null
      />
    </div>
    <div class="row py-1">
      <font class="col-1">
        status
      </font>
      <div class="col-11">
        <div class="row">
          <font class="col-4">
            default
          </font>
          <font class="col-4">
            system
          </font>
          <font class="col-4">
            info
          </font>
          <font class="col-4">
            success
          </font>
        </div>
        <div class="row">
          <b-toast
            class="col-4"
            autohide
            status="default"
            content="content text"
          />
          <b-toast
            class="col-4"
            autohide
            status="system"
            content="content text"
          />
          <b-toast
            class="col-4"
            autohide
            status="info"
            content="content text"
          />
          <b-toast
            class="col-4"
            autohide
            status="success"
            content="content text"
          />
        </div>
        <div class="row">
          <font class="col-3">
            issue
          </font>
          <font class="col-3">
            warning
          </font>
          <font class="col-3">
            error
          </font>
          <font class="col-3">
            danger
          </font>
        </div>
        <div class="row">
          <b-toast
            class="col-3"
            autohide
            status="issue"
            content="content text"
          />
          <b-toast
            class="col-3"
            autohide
            status="warning"
            content="content text"
          />
          <b-toast
            class="col-3"
            autohide
            status="error"
            content="content text"
          />
          <b-toast
            class="col-3"
            autohide
            status="danger"
            content="content text"
          />
        </div>
      </div>
    </div>
    <b-toasts
      :list="list"
      :placement="placement"
    />
    <!-- <b-toast class="position-fixed" autohide status="info" content="left-top position-fixed" style="top: 115px; left: 2px;"></b-toast>
        <b-toast class="position-fixed" autohide status="info" content="left-bottom position-fixed" style="bottom: 2px; left: 2px;"></b-toast>
    <b-toast class="position-fixed" autohide status="info" content="right-bottom position-fixed" style="bottom: 2px; right: 2px;"></b-toast>-->
  </div>
</template>

<script>
import variables from '@/components/util/variables.js'
import BToast from "@/components/base/Toast/b-toast.vue";
import BToasts from "@/components/base/Toast/b-toasts.vue";
import BaseA from "@/components/basic/A/basic-a.vue";
import BSelect from "@/components/form/b-select.vue"
export default {
  name: "BToastDemo",
  components: { BToast, BToasts, BaseA, BSelect },
  data() {
    return {
      list: [
        { autohide: true, content: "content text", status: "system" },
        { autohide: true, content: "content text", status: "info" },
        { autohide: true, content: "content text", status: "success" },
        { autohide: true, content: "content text", status: "issue" },
        { autohide: true, content: "content text", status: "warning" },
        { autohide: true, content: "content text", status: "error" },
        { autohide: true, content: "content text", status: "danger" }
      ],
      placement: 'top-end',
      placList: variables.base.position.placement,
    };

  }
};
</script>
