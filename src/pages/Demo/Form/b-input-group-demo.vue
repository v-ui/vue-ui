<template>
  <div>
    <h2>b-input-group</h2>
    <hr>
    <h3>基础</h3>
    <br>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <div class="col-11">
        <b-input-group>
          <b-input-group-text>Text</b-input-group-text>
          <basic-text />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-text>Textarea</b-input-group-text>
          <b-textarea />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-text>
            <b-check type="checkbox" />
          </b-input-group-text>
          <basic-text />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-text>
            <b-check type="radio" />
          </b-input-group-text>
          <basic-text />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-text>Select</b-input-group-text>
          <basic-select />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-text>Select and Button</b-input-group-text>
          <basic-select />
          <basic-button />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-text>one text</b-input-group-text>
          <b-input-group-text>two text</b-input-group-text>
          <b-input-group-text>...</b-input-group-text>
          <basic-select />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-text>More Controls</b-input-group-text>
          <basic-text />
          <basic-text />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-text>More Controls</b-input-group-text>
          <basic-text />
          <basic-select />
        </b-input-group>
      </div>
    </div>
    <div class="row py-1">
      <font class="col-1">
        info:
      </font>
      <b-input-group info="info text">
        <b-input-group-text>More Controls</b-input-group-text>
        <basic-text />
        <basic-select />
      </b-input-group>
    </div>
    <div class="row py-1">
      <font class="col-1">
        size:
      </font>
      <div class="col-11">
        <div class="row">
          <div class="col-1">
            sm
          </div>
          <div class="col-5">
            <b-input-group size="sm">
              <b-input-group-text>Text</b-input-group-text>
              <basic-text />
            </b-input-group>
          </div>
          <div class="col-5">
            <b-input-group size="sm">
              <b-input-group-text>select and button</b-input-group-text>
              <basic-select />
              <basic-button />
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-1">
            default
          </div>
          <div class="col-5">
            <b-input-group>
              <b-input-group-text>Text</b-input-group-text>
              <basic-text />
            </b-input-group>
          </div>
          <div class="col-5">
            <b-input-group>
              <b-input-group-text>select and button</b-input-group-text>
              <basic-select />
              <basic-button />
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-1">
            lg
          </div>
          <div class="col-5">
            <b-input-group size="lg">
              <b-input-group-text>Text</b-input-group-text>
              <basic-text />
            </b-input-group>
          </div>
          <div class="col-5">
            <b-input-group size="lg">
              <b-input-group-text>select and button</b-input-group-text>
              <basic-select />
              <basic-button />
            </b-input-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BInputGroup from "@/components/form/InputGroup/b-input-group.vue";
import BInputGroupText from "@/components/form/InputGroup/b-input-group-text.vue";

import BasicText from "@/components/form/Basic/basic-text.vue";
import BTextarea from "@/components/form/b-textarea.vue";
import BCheck from "@/components/form/Check/b-check.vue";
import BasicSelect from "@/components/form/Basic/Select/basic-select.vue";
import BasicButton from "@/components/basic/Button/basic-button.vue";

export default {
  name: "BUnputGroupDemo",
  components: {
    BInputGroup,
    BInputGroupText,
    BasicText,
    BTextarea,
    BCheck,
    BasicSelect,
    BasicButton
  },
  data() {
    return {
      value: '',
    }
  },
};
</script>
