<template>
  <div>
    <h2>b-number</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        int:
      </font>
      <b-number />
    </div>
    <div class="row">
      <font class="col-1">
        float:
      </font>
      <b-number value="0.5" />
    </div>
    <div class="row">
      <font class="col-1">
        step:
      </font>
      <b-number
        value="0.5"
        step="0.1"
      />
    </div>
    <div class="row">
      <font class="col-1">
        readonly:
      </font>
      <b-number readonly />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-number disabled />
    </div>
    <div class="row">
      <font class="col-1">
        textReadonly:
      </font>
      <b-number text-readonly />
    </div>
    <div class="row">
      <font class="col-1">
        placeholder:
      </font>
      <b-number placeholder="placeholder text" />
    </div>
    <div class="row">
      <font class="col-1">
        min
        <br>max:
      </font>
      <b-number
        min="5"
        max="10"
        placeholder="只能输入 5-10 之间的数"
      />
    </div>
    <div class="row">
      <font class="col-1">
        hideButton:
      </font>
      <b-number
        placeholder="hidebutton text"
        hide-button
      />
    </div>
    <div class="row">
      <font class="col-1">
        size(lg):
      </font>
      <b-number size="lg" />
    </div>
    <div class="row">
      <font class="col-1">
        size(sm):
      </font>
      <b-number size="sm" />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-number info="info text" />
    </div>
    <div class="row">
      <font class="col-1">
        prompt:
      </font>
      <b-number prompt />
    </div>
    <div class="row">
      <font class="col-1">
        info
        <br>prompt:
      </font>
      <b-number
        info="info text"
        step="0.1"
        prompt
      />
    </div>
    <div class="row">
      <font class="col-1">
        subValue
        <br>addValue
      </font>
      <b-number
        sub-value="sub"
        add-value="add"
        step="0.1"
      />
    </div>
    <div class="row">
      <font class="col-1">
        sub slot
        <br>add slot
      </font>
      <b-number step="0.1">
        <template slot="sub">
          sub slot
        </template>
        <template slot="add">
          add slot
        </template>
      </b-number>
    </div>
    <br>
    <h4>保留位数</h4>
    精度计算比较浮躁，经历了两个大的阶段（只会在组件初始化时执行一次，后续不再改变）
    <br>
    1. accuracy 值（int）
    <ul>
      <li>1.1 小于 0 会被忽略，执行剩余步骤（默认）</li>
      <li>1.2 大于 0 直接采用，不执行剩余步骤</li>
    </ul>
    2. 计算 value 的小数位数
    <br>
    3. 计算 step 的小数位数
    <br>
    4. 比较 2\3 步的值，取较大的值（较高的精确度）
    <br>
    注意：
    <ul>
      <li>1. 对于 value 和 step 小数位数只与它们的小数位数相关，与具体的值无关，如 0.1 和 0.5 都会取到一位小数</li>
      <li>2. 当 accuracy 小于 step 的精度时每次点击 加或减按钮，可能得不到想要的精度（值会被四舍五入）</li>
    </ul>
    <hr>
    <div>
      default(accuracy 小于 0, value = 1，step = 1（默认）, 无小数位)
      <b-number
        value="1"
        prompt
      />
    </div>
    <div>
      default(accuracy 小于 0, value = 1， step = 0.1, 1 位小数)
      <b-number
        value="1"
        step="0.1"
        prompt
      />
    </div>
    <div>
      default(accuracy 小于 0, 初始化传入 value = 0.1 step = 0.02, 2 位小数)
      <b-number
        value="0.1"
        step="0.002"
        prompt
      />
    </div>
    <div>
      default(accuracy = 3, 初始化传入 value = 0.1 step = 0.02, 3 位小数)
      <b-number
        value="0.1"
        step="0.02"
        accuracy="3"
        prompt
      />
    </div>
    <br>
    <h4>v-model</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        v-model:
        <br>
        ({{ number }})
      </font>
      <b-number v-model.number="number" />
    </div>
  </div>
</template>

<script>
import BNumber from "@/components/base/Bootstrap/Form/b-number.vue";

export default {
  name: "BNumberDemo",
  components: { BNumber },
  data() {
    return {
      number: 10
    };
  }
};
</script>

<style>
</style>
