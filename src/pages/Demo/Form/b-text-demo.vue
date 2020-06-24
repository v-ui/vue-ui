<template>
  <div class="Form">
    <h2>b-text</h2>
    <hr>
    <h3>type: text(default)</h3>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">default:</font>
      <b-text class="col-11" value="default value" />
    </div>
    <div class="row">
      <font class="col-1">readonly:</font>
      <b-text class="col-11" value="readonly value" readonly />
    </div>
    <div class="row">
      <font class="col-1">disabled:</font>
      <b-text class="col-11" value="disabled value" disabled />
    </div>
    <div class="row">
      <font class="col-1">placeholder:</font>
      <b-text class="col-11" placeholder="placeholder value" />
    </div>
    <div class="row">
      <font class="col-1">length:</font>
      <b-text class="col-auto" value="10 length" :length="10" />
    </div>
    <div class="row">
      <font class="col-1" for="info">info:</font>
      <b-text class="col-11" info="info" id="info" />
    </div>
    <br>
    <h4>b-form-label</h4>
    <hr>
    <div class="row">
      <font class="col-1">size(sm):</font>
      <b-form-label for="sm" class="col-1" size="sm">sm size label</b-form-label>
      <b-text id="sm" class="col-10" value="sm size" size="sm" />
    </div>
    <div class="row">
      <font class="col-1">size(default):</font>
      <b-form-label for="default" class="col-1">default size label</b-form-label>
      <b-text id="default" class="col-10" value="sm size" />
    </div>
    <div class="row">
      <font class="col-1">size(lg):</font>
      <b-form-label for="lg" class="col-1" size="lg">lg size label</b-form-label>
      <b-text id="lg" class="col-10" value="lg size" size="lg" />
    </div>
    <br>
    <h4>图标</h4>
    <hr>
    <div class="row">
      <font class="col-1">icon:</font>
      <b-text
        class="col-11"
        icon="fas fa-user-circle"
        placeholder="don`t use icon and hideIcon together，icon will be ignore"
      />
    </div>
    <div class="row">
      <font class="col-1">hideIcon:</font>
      <b-text
        type="phone"
        class="col-11"
        placeholder="hideIcon just use in 'password', 'search', 'email', 'url', 'ip', 'tel', 'phone'"
        hide-icon
      />
    </div>
    <br>
    <h4>v-model</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        v-model:
        <br>
        ({{ BTextValue }})
      </font>
      <b-text class="col-11" v-model="BTextValue" />
    </div>
    <br>
    <h4>校验</h4>
    <hr>
    <div class="row">
      <font class="col-1">required:</font>
      <b-text class="col-11" required placeholder="required text" />
    </div>
    <div class="row">
      <font class="col-1">
        minlength
        <br>maxlength:
      </font>
      <b-text class="col-11" minlength="5" maxlength="10" placeholder="只能输入5-10 个字符" />
    </div>
    <div class="row">
      <font class="col-1">pattern:</font>
      <b-text class="col-11" pattern="/^1[0-9]{10}$/" placeholder="请输入手机号" />
    </div>
    <div class="row">
      <font class="col-1">valid:</font>
      <b-text
        class="col-11"
        :valid="valid"
        placeholder="自定义校验函数"
        invalidInfo="输入少于三个字符，验证失败"
        validInfo="输入大于两个字符，验证成功"
        info="输入大于两个字符，验证成功（这里是这么定义的，你可以自定义）"
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error:
      </font>
      <b-text
        class="col-11"
        pattern="/^1[0-9]{10}$/"
        placeholder="请输入手机号"
        invalidInfo="error"
        validInfo="success"
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error(2):
      </font>
      <b-text class="col-11" pattern="/^1[0-9]{10}$/" placeholder="请输入手机号">
        <template #invalid>you can add anlything invalidInfo or DOM</template>
        <template #valid>you can add anlything validInfo or DOM</template>
      </b-text>
    </div>
    <br>
    <h4>other type</h4>
    <hr>
    <div class="row">
      <font class="col-1">password:</font>
      <b-text type="password" class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">search:</font>
      <b-text type="search" class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">email:</font>
      <b-text type="email" class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">url:</font>
      <b-text type="url" class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">ip:</font>
      <b-text type="ip" class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">tel:</font>
      <b-text type="tel" class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">phone:</font>
      <b-text type="phone" class="col-11" />
    </div>
  </div>
</template>

<script>
import BText from "@/components/base/Bootstrap/Form/b-text.vue";
import BFormLabel from '@/components/base/Bootstrap/Form/b-form-lanel.vue'

export default {
  name: "b-text-demo",
  components: {
    BText,
    BFormLabel
  },
  data() {
    return {
      BTextValue: "BTextValue"
    };
  },
  methods: {
    valid: function(value) {
      return value.length > 2;
    }
  }
};
</script>

