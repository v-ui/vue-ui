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
          <b-input-group-prepend>
            <b-input-group-text>Text</b-input-group-text>
          </b-input-group-prepend>
          <basic-text />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend>
            <b-input-group-text>Textarea</b-input-group-text>
          </b-input-group-prepend>
          <b-textarea />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend>
            <b-input-group-text>
              <b-checkbox />
            </b-input-group-text>
          </b-input-group-prepend>
          <basic-text />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend>
            <b-input-group-text>
              <b-radio />
            </b-input-group-text>
          </b-input-group-prepend>
          <basic-text />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend>
            <b-input-group-text>Select</b-input-group-text>
          </b-input-group-prepend>
          <basic-select />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend>
            <b-input-group-text>Select and Button</b-input-group-text>
          </b-input-group-prepend>
          <basic-select />
          <b-input-group-prepend>
            <basic-button />
          </b-input-group-prepend>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend>
            <b-input-group-text>one text</b-input-group-text>
            <b-input-group-text>two text</b-input-group-text>
            <b-input-group-text>...</b-input-group-text>
          </b-input-group-prepend>
          <basic-select />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend>
            <b-input-group-text>More Controls</b-input-group-text>
          </b-input-group-prepend>
          <basic-text />
          <basic-text />
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend>
            <b-input-group-text>More Controls</b-input-group-text>
          </b-input-group-prepend>
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
        <b-input-group-prepend>
          <b-input-group-text>More Controls</b-input-group-text>
        </b-input-group-prepend>
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
              <b-input-group-prepend>
                <b-input-group-text>Text</b-input-group-text>
              </b-input-group-prepend>
              <basic-text />
            </b-input-group>
          </div>
          <div class="col-5">
            <b-input-group size="sm">
              <b-input-group-prepend>
                <b-input-group-text>select and button</b-input-group-text>
              </b-input-group-prepend>
              <basic-select />
              <b-input-group-prepend>
                <basic-button />
              </b-input-group-prepend>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-1">
            default
          </div>
          <div class="col-5">
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text>Text</b-input-group-text>
              </b-input-group-prepend>
              <basic-text />
            </b-input-group>
          </div>
          <div class="col-5">
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text>select and button</b-input-group-text>
              </b-input-group-prepend>
              <basic-select />
              <b-input-group-prepend>
                <basic-button />
              </b-input-group-prepend>
            </b-input-group>
          </div>
        </div>
        <div class="row">
          <div class="col-1">
            lg
          </div>
          <div class="col-5">
            <b-input-group size="lg">
              <b-input-group-prepend>
                <b-input-group-text>Text</b-input-group-text>
              </b-input-group-prepend>
              <basic-text />
            </b-input-group>
          </div>
          <div class="col-5">
            <b-input-group size="lg">
              <b-input-group-prepend>
                <b-input-group-text>select and button</b-input-group-text>
              </b-input-group-prepend>
              <basic-select />
              <b-input-group-prepend>
                <basic-button />
              </b-input-group-prepend>
            </b-input-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BInputGroup from "@/components/base/Bootstrap/Form/InputGroup/b-input-group.vue";
import BInputGroupPrepend from "@/components/base/Bootstrap/Form/InputGroup/b-input-group-prepend.vue";
import BInputGroupText from "@/components/base/Bootstrap/Form/InputGroup/b-input-group-text.vue";

import BasicText from "@/components/base/Bootstrap/Form/Basic/basic-text.vue";
import BTextarea from "@/components/base/Bootstrap/Form/b-textarea.vue";
import BCheckbox from "@/components/base/Bootstrap/Form/CheckBox/b-checkbox.vue";
import BRadio from "@/components/base/Bootstrap/Form/Radio/b-radio.vue";
import BasicSelect from "@/components/base/Bootstrap/Form/Basic/Select/basic-select.vue";
import BasicButton from "@/components/Basic/Button/basic-button.vue";

export default {
  name: "BUnputGroupDemo",
  components: {
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupText,
    BasicText,
    BTextarea,
    BCheckbox,
    BRadio,
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
