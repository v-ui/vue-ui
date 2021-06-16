<template>
  <div>
    <h2>b-textarea</h2>
    <hr>
    <br>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-textarea
        class="col-11"
        value="default value"
      />
    </div>
    <div class="row">
      <font class="col-1">
        readonly:
      </font>
      <b-textarea
        class="col-11"
        value="readonly value"
        readonly
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-textarea
        class="col-11"
        value="disabled value"
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        placeholder:
      </font>
      <b-textarea
        class="col-11"
        placeholder="placeholder text"
      />
    </div>
    <div class="row">
      <font class="col-1">
        cols:
      </font>
      <b-textarea
        class="col-auto"
        value="cols 10"
        cols="10"
      />
    </div>
    <div class="row">
      <font class="col-1">
        rows:
      </font>
      <b-textarea
        class="col-11"
        value="rows 2"
        rows="2"
      />
    </div>
    <div class="row">
      <font class="col-1">size(lg)</font>
      <b-textarea class="col-11" size="lg" value="size" />
    </div>
     <div class="row">
      <font class="col-1">size(default)</font>
      <b-textarea class="col-11" value="size" />
    </div>
     <div class="row">
      <font class="col-1">size(sm)</font>
      <b-textarea class="col-11" size="sm" value="size" />
    </div>
    <div class="row">
      <font class="col-1">
        prompt:
      </font>
      <b-textarea
        class="col-11"
        prompt
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-textarea
        class="col-11"
        info="info text"
      />
    </div>
    <div class="row">
      <font class="col-1">
        prompt
        <br>info:
      </font>
      <b-textarea
        class="col-11"
        value="abc"
        info="info text"
        prompt
      />
    </div>
    <div class="row">
      <font class="col-1">
        resize:
      </font>
      <b-textarea
        class="col-11"
        resize
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
      <b-textarea
        v-model="BTextValue"
        class="col-11"
      />
    </div>
    <br>
    <h4>校验</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        required:
      </font>
      <b-textarea
        class="col-11"
        required
        placeholder="required text"
      />
    </div>
    <div class="row">
      <font class="col-1">
        minlength
        <br>maxlength:
      </font>
      <b-textarea
        class="col-11"
        minlength="5"
        maxlength="10"
        placeholder="只能输入5-10 个字符"
      />
    </div>
    <div class="row">
      <font class="col-1">
        pattern
        <br>(different with b-text):
      </font>
      <b-textarea
        class="col-11"
        :pattern="new RegExp(/^1[0-9]{10}$/)"
        placeholder="请输入手机号"
      />
    </div>
    <div class="row">
      <font class="col-1">
        valid:
      </font>
      <b-textarea
        class="col-11"
        :valid="valid"
        placeholder="自定义校验函数"
        invalid-info="输入少于三个字符，验证成功，验证失败"
        valid-info="输入大于两个字符，验证成功，验证成功"
        info="输入大于两个字符，验证成功，验证成功（这里是这么定义的，你可以自定义）"
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error:
      </font>
      <b-textarea
        class="col-11"
        :pattern="new RegExp(/^1[0-9]{10}$/)"
        placeholder="请输入手机号"
        invalid-info="error"
        valid-info="success"
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error(2):
      </font>
      <b-textarea
        class="col-11"
        :pattern="new RegExp(/^1[0-9]{10}$/)"
        placeholder="请输入手机号"
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-textarea>
    </div>
  </div>
</template>

<script>
import BTextarea from "@/components/form/b-textarea.vue";

export default {
  name: "BTeatareaDemo",
  components: { BTextarea },
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
