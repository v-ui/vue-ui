<template>
  <div>
    <h2>b-switch</h2>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-switch class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">
        label:
      </font>
      <b-switch
        class="col-11"
        label="switch label"
      />
    </div>
    <div class="row">
      <font class="col-1">
        checked:
      </font>
      <b-switch
        class="col-11"
        label="switch checked"
        checked
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-switch
        class="col-11"
        label="switch disabled"
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-switch
        class="col-11"
        label="switch label"
        info="info text"
      />
    </div>
    <div class="row">
      <font class="col-1">
        v-model
        <br>
        {{ checked }}:
      </font>
      <b-switch
        v-model="checked"
        class="col-11"
        label="switch label"
      />
    </div>
  </div>
</template>

<script>
import BSwitch from "@/components/form/b-switch.vue";

export default {
  name: "BSwitchDemo",
  components: { BSwitch },
  data() {
    return {
      checked: true
    };
  }
};
</script>
