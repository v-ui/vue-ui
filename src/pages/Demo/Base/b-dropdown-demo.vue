<template>
  <div>
    <h2>b-dropdown-menu</h2>
    <hr>
    <div class="row">
      <font class="col-2 text-center">list</font>
      <font class="col-2 text-center">disabled</font>
      <font class="col-2 text-center">slot:header</font>
      <font class="col-2 text-center">
        v-model multiple='false'(default)<br>
        {{ value1 }}
      </font>
      <font class="col-2 text-center">
        v-model multiple='true'(default)<br>
        {{ value2 }}
      </font>
    </div>
    <div class="row">
      <b-dropdown-menu
        class="col-2"
        :header="{ text: 'header label', info: 'info text', icon: 'circle-fill' }"
        :list="list2"
      />
      <b-dropdown-menu
        class="col-2"
        :header="{ text: 'header label', info: 'info text', icon: 'circle-fill' }"
        :list="list2"
        disabled
      />
      <b-dropdown-menu
        class="col-2"
        :header="{ text: 'header label', info: 'info text', icon: 'circle-fill' }"
        :list="list2"
      >
        <template #header>
          you can add anlything text or DOM
        </template>
      </b-dropdown-menu>
      <b-dropdown-menu
        class="col-2"
        :list="list"
        v-model="value1"
      />
      <b-dropdown-menu
        class="col-2"
        :list="list"
        multiple
        v-model="value2"
      />
    </div>
    <h2>b-dropdown-row</h2>
    <hr>
    <div class="row">
      <font class="col-2 text-center">list</font>
      <font class="col-2 text-center">colCount</font>
      <font class="col-2 text-center">disabled</font>
      <font class="col-2 text-center">
        v-model multiple='false'(default)<br>
        {{ value1 }}
      </font>
      <font class="col-2 text-center">
        v-model multiple='true'(default)<br>
        {{ value2 }}
      </font>
    </div>
    <div class="row">
      <b-dropdown-row
        class="col-2"
        :list="list"
      />
      <div class="col-2">
        <b-range min="1" max="12" v-model="col" />
        <b-dropdown-row
          :list="list"
          :colCount="col"
        />
      </div>
      <b-dropdown-row
        class="col-2"
        :list="list"
        disabled
      />
      <b-dropdown-row
        class="col-2"
        :list="list"
        v-model="value1"
      />
      <b-dropdown-row
        class="col-2"
        :list="list"
        multiple
        v-model="value2"
      />
    </div>
    <h2>b-dropdown-table</h2>
    <hr>
    <div class="row">
      <font class="col-2 text-center">list</font>
      <font class="col-2 text-center">colCount</font>
      <font class="col-2 text-center">border</font>
      <font class="col-2 text-center">disabled</font>
      <font class="col-2 text-center">
        v-model multiple='false'(default)<br>
        {{ value1 }}
      </font>
      <font class="col-2 text-center">
        v-model multiple='true'(default)<br>
        {{ value2 }}
      </font>
    </div>
    <div class="row">
      <b-dropdown-table
        class="col-2"
        :list="list"
      />
      <div class="col-2">
        <b-range min="1" max="12" v-model="col" />
        <b-dropdown-table
          :list="list"
          :colCount="col"
        />
      </div>
      <b-dropdown-table
        class="col-2"
        :list="list"
        disabled
      />
      <b-dropdown-table
        class="col-2"
        :list="list"
        border
      />
      <b-dropdown-table
        class="col-2"
        :list="list"
        v-model="value1"
      />
      <b-dropdown-table
        class="col-2"
        :list="list"
        multiple
        v-model="value2"
      />
    </div>
    <h2>b-dropdown</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-dropdown
        class="col-auto"
        :list="list2"
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-dropdown
        class="col-auto"
        :list="list2"
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        select:
      </font>
      <b-dropdown
        class="col-auto"
        :list="list2"
        select="value"
      />
    </div>
    <div class="row">
      <font class="col-1">
        slot:
      </font>
      <b-dropdown class="col-auto">
        <b-dropdown-header label="header text" />
        <b-dropdown-header
          label="header text"
          info="info text"
        />
        <b-dropdown-divider />
        <b-dropdown-text text="text" />
        <b-dropdown-text
          text="text"
          info="info text"
        />
        <b-dropdown-item label="item label" />
        <b-dropdown-item
          label="item label"
          info="info text"
        />
        <b-dropdown-item href="href text" />
        <b-dropdown-item
          href="href text"
          info="info text"
        />
        <b-dropdown-item
          label="active label"
          active
        />
        <b-dropdown-item
          label="active label"
          info="info text"
          active
        />
        <b-dropdown-item
          label="disabled label"
          disabled
        />
        <b-dropdown-item
          label="disabled label"
          info="info text"
          disabled
        />
      </b-dropdown>
    </div>
    <div class="row">
      <font class="col-1">
        trigger:
      </font>
      <b-dropdown
        class="col-auto"
        trigger="trigger text"
      >
        <b-dropdown-item label="item label" />
      </b-dropdown>
    </div>
    <div class="row">
      <font class="col-1">
        trigger(2):
      </font>
      <b-dropdown class="col-auto">
        <template #trigger>
          you can add anlything text or DOM
        </template>
        <b-dropdown-item label="item label" />
      </b-dropdown>
    </div>
    <div class="row">
      <font class="col-1">
        toggle:
      </font>
      <b-dropdown
        class="col-3"
        menu-weight
      >
        <template #icon>
          you can add anlything
        </template>
        <b-dropdown-item label="item label" />
      </b-dropdown>
      <font class="col-3">
        只建议添加图标
      </font>
    </div>
    <div class="row">
      <font class="col-1">
        hide-toggle:
      </font>
      <b-dropdown
        class="col-auto"
        hide-toggle
      >
        <b-dropdown-item label="item label" />
      </b-dropdown>
    </div>
    <div class="row">
      <font class="col-1">
        menu-weight:
      </font>
      <b-dropdown
        class="col-11"
        menu-weight
      >
        <b-dropdown-item label="item label" />
      </b-dropdown>
    </div>
    <div class="row">
      <font class="col-1">
        menu-align:
      </font>
      <font class="col-1">
        left(default)
      </font>
      <b-dropdown
        class="col-3"
        menu-align="left"
        menu-weight
      >
        <b-dropdown-item label="item label" />
      </b-dropdown>
      <font class="col-1">
        right
      </font>
      <b-dropdown
        class="col-3"
        menu-align="right"
        menu-weight
      >
        <b-dropdown-item label="item label" />
      </b-dropdown>
    </div>
    <h2>b-dropdown-list</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-dropdown-list class="col-11" />
    </div>
    <div class="row">
      <font class="col-1">
        hide-null:
      </font>
      <b-dropdown-list
        class="col-11"
        hide-null
      />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-dropdown-list
        class="col-5"
        disabled
      />
      <b-dropdown-list
        v-model="value2"
        class="col-5"
        multiple
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        list:
      </font>
      <b-dropdown-list
        class="col-11"
        :list="list"
      />
    </div>
    <div class="row">
      <font class="col-1">
        search:
      </font>
      <b-dropdown-list
        class="col-11"
        :list="list"
        search
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-dropdown-list
        class="col-11"
        :list="list"
        info="info label"
      />
    </div>
    <div class="row">
      <font class="col-1">
        multiple:
      </font>
      <b-dropdown-list
        class="col-11"
        :list="list"
        multiple
      />
    </div>
    <br>
    <h4>v-model</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        v-model
        <br>
        {{ value1 }}:
      </font>
      <b-dropdown-list
        v-model="value1"
        class="col-11"
        :list="list"
      />
    </div>
    <div class="row">
      <font class="col-1">
        v-model
        <br>
        {{ value2 }}:
      </font>
      <b-dropdown-list
        v-model="value2"
        class="col-11"
        :list="list"
        multiple
      />
    </div>
    <br>
    <h4>校验</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        required:
      </font>
      <b-dropdown-list
        class="col-5"
        :list="list"
        required
      />
      <b-dropdown-list
        class="col-5"
        :list="list"
        multiple
        required
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error:
      </font>
      <b-dropdown-list
        class="col-5"
        :list="list"
        invalid-info="error"
        valid-info="success"
        required
      />
      <b-dropdown-list
        class="col-5"
        :list="list"
        invalid-info="error"
        valid-info="success"
        multiple
        required
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error(2):
      </font>
      <b-dropdown-list
        class="col-5"
        :list="list"
        required
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-dropdown-list>
      <b-dropdown-list
        class="col-5"
        :list="list"
        multiple
        required
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-dropdown-list>
    </div>
    <br>
    <h4>slot</h4>
    <hr>
    <div class="row">
      <b-dropdown-list
        class="col-12"
        :list="list"
      >
        <template #trigger>
          trigger slot -> you can add anlything validInfo or DOM
        </template>
        <template #icon>
          <i>icon slot -> icon</i>
        </template>
        <template #item="{ item }">
          item slot -> {{ item }}
        </template>
      </b-dropdown-list>
    </div>
    <h2>b-dropdown-panel</h2>
    <hr>
    <h4>基础属性</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        default:
      </font>
      <b-dropdown-panel class="col-auto" />
    </div>
    <div class="row">
      <font class="col-1">
        disabled:
      </font>
      <b-dropdown-panel
        class="col-auto"
        disabled
      />
      <b-dropdown-panel
        v-model="value2"
        class="col-auto"
        multiple
        disabled
      />
    </div>
    <div class="row">
      <font class="col-1">
        type:
      </font>
      <font class="col-1">
        row(default)
      </font>
      <b-dropdown-panel
        class="col-auto"
        type="row"
        :list="list"
      />
      <font class="col-1">
        table
      </font>
      <b-dropdown-panel
        class="col-auto"
        type="table"
        :list="list"
      />
    </div>
    <div class="row">
      <font class="col-1">
        list:
      </font>
      <b-dropdown-panel
        class="col-auto"
        :list="list"
      />
    </div>
    <div class="row">
      <font class="col-1">
        info:
      </font>
      <b-dropdown-panel
        class="col-auto"
        :list="list"
        info="info label"
      />
    </div>
    <br>
    <h4>v-model</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        v-model
        <br>
        {{ value1 }}:
      </font>
      <b-dropdown-panel
        v-model="value1"
        class="col-auto"
        :list="list"
      />
    </div>
    <div class="row">
      <font class="col-1">
        v-model
        <br>
        {{ value2 }}:
      </font>
      <b-dropdown-panel
        v-model="value2"
        class="col-auto"
        :list="list"
        multiple
      />
    </div>
    <br>
    <h4>校验</h4>
    <hr>
    <div class="row">
      <font class="col-1">
        required:
      </font>
      <b-dropdown-panel
        class="col-auto"
        :list="list"
        required
      />
      <b-dropdown-panel
        class="col-auto"
        :list="list"
        multiple
        required
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error:
      </font>
      <b-dropdown-panel
        class="col-auto"
        :list="list"
        invalid-info="error"
        valid-info="success"
        required
      />
      <b-dropdown-panel
        class="col-auto"
        :list="list"
        invalid-info="error"
        valid-info="success"
        multiple
        required
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error(2):
      </font>
      <b-dropdown-panel
        class="col-auto"
        :list="list"
        required
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-dropdown-panel>
      <b-dropdown-panel
        class="col-auto"
        :list="list"
        multiple
        required
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-dropdown-panel>
    </div>
  </div>
</template>

<script>
import BDropdownMenu from '@/components/base/Dropdown/b-dropdown-menu.vue'
import BDropdownRow from '@/components/base/DropdownPanel/Basic/b-dropdown-panel-row.vue'
import BDropdownTable from '@/components/base/DropdownPanel/Basic/b-dropdown-panel-table.vue'

import BDropdown from "@/components/base/Dropdown/b-dropdown.vue";
import BDropdownHeader from "@/components/base/Dropdown/b-dropdown-header.vue";
import BDropdownItem from "@/components/base/Dropdown/b-dropdown-item.vue";
import BDropdownText from "@/components/base/Dropdown/b-dropdown-text.vue";
import BDropdownDivider from "@/components/base/Dropdown/b-dropdown-divider.vue";

import BDropdownList from "@/components/base/DropdownList/b-dropdown-list.vue";
import BDropdownPanel from '@/components/base/DropdownPanel/b-dropdown-panel.vue'

import BRange from '@/components/form/b-range.vue'

export default {
  name: "BDropdownDemo",
  components: {
    BDropdownMenu,
    BDropdownRow,
    BDropdownTable,
    BDropdown,
    BDropdownHeader,
    BDropdownItem,
    BDropdownText,
    BDropdownDivider,
    BDropdownList,
    BDropdownPanel,
    BRange,
  },
  data() {
    return {
      list: [
        { value: "value1", label: "label1", info: "info text" },
        { value: "value2", label: "label2", info: "info text" },
        { value: "value3", label: "label3" },
        { value: "value4", label: "label4" },
        { value: "value5", label: "label5" },
        { value: "value6", label: "disabled", disabled: true },
      ],
      list2: [
        { divider: true, },
        { text: "text", info: "info text", icon: "circle-fill" },
        { divider: true, },
        { value: "value", info: "info text", icon: "circle-fill" },
        { value: "btuuon active item", info: "info text", icon: "circle-fill", active: true },
        { value: "btuuon disabled item", info: "info text", icon: "circle-fill", disabled: true },
        { divider: true, },
        { value: "a item", href: "#", info: "info text", icon: "circle-fill" },
        { value: "a active", href: "#", info: "info text", icon: "circle-fill", active: true },
        { value: "a disabled", href: "#", info: "info text", icon: "circle-fill", disabled: true }
      ],
      value1: { value: "value1", label: "label1" },
      value2: [
        { value: "value1", label: "label1" },
        { value: "value2", label: "label2" },
        { value: "value3", label: "label3" }
      ],
      col: 6,
    };
  }
};
</script>
