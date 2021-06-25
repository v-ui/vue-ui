<template>
  <div>
    <h2>v-tip('tooltip', 'popover')</h2>
    <hr>
    <br>
    <div class="row py-1">
      <font class="col-1">
        default:
      </font>
      <b-button
        v-tip
        class="col-auto"
      >
        nothing
      </b-button>
      <font class="col-1">
        tooltip:
      </font>
      <b-button
        v-tip:tooltip="'tooltip text'"
        class="col-auto"
      >
        hover to show tooltip
      </b-button>
      {{ text }}
      <font class="col-1">
        popover:
      </font>
      <b-button
        v-tip:popover="'this is popover'"
        class="col-auto"
      >
        click to show popover
      </b-button>
    </div>
    <div class="row py-1">
      <font class="col-1">
        content:
      </font>
      <font class="col-1">
        tooltip:
      </font>
      <b-button
        v-tip:tooltip="{content: 'this is tooltip`s content'}"
        class="col-auto"
      >
        hover to show tooltip
      </b-button>
      <font class="col-1">
        popover:
      </font>
      <b-button
        v-tip:popover="{content: 'this is popover`s content'}"
        class="col-auto"
      >
        click to show popover
      </b-button>
    </div>
    <div class="py-1">
      <font class="col-1">
        placement:
      </font>
      <div class="col-11">
        <div class="row py-1">
          <font class="col-1">
            tooltip:
          </font>
          <font class="col-1">
            top:
          </font>
          <b-button
            v-tip:tooltip.top="{content: 'default placement is top'}"
            class="col-1"
          >
            hover
          </b-button>
          <font class="col-1">
            bottom:
          </font>
          <b-button
            v-tip:tooltip.bottom="{content: 'placement is bottom'}"
            class="col-1"
          >
            hover
          </b-button>
          <font class="col-1">
            left:
          </font>
          <b-button
            v-tip:tooltip.left="{content: 'placement is left'}"
            class="col-1"
          >
            hover
          </b-button>
          <font class="col-1">
            right:
          </font>
          <b-button
            v-tip:tooltip.right="{content: 'placement is right'}"
            class="col-1"
          >
            hover
          </b-button>
        </div>
        <div class="row py-1">
          <font class="col-1">
            popover:
          </font>
          <font class="col-1">
            top:
          </font>
          <b-button
            v-tip:popover.top="{content: 'default placement is top'}"
            class="col-1"
          >
            click
          </b-button>
          <font class="col-1">
            bottom:
          </font>
          <b-button
            v-tip:popover.bottom="{content: 'placement is bottom'}"
            class="col-1"
          >
            click
          </b-button>
          <font class="col-1">
            left:
          </font>
          <b-button
            v-tip:popover.left="{content: 'placement is left'}"
            class="col-1"
          >
            click
          </b-button>
          <font class="col-1">
            right:
          </font>
          <b-button
            v-tip:popover.right="{ content: 'placement is right'}"
            class="col-1"
          >
            click
          </b-button>
        </div>
      </div>
    </div>
    <div class="row py-1">
      <font class="col-1">
        title:
      </font>
      <font class="col-1">
        popover(only):
      </font>
      <b-button
        v-tip:popover="{title: 'popover`s title', content: 'this is popover`s content'}"
        class="col-auto"
      >
        click to show popover
      </b-button>
    </div>
    <div class="row py-1">
      <font class="col-1">
        trigger:
      </font>
      <font class="col-1">
        popover(only):
      </font>
      <a
        v-tip:popover="{trigger: 'focus', content: 'this is popover`s content just for <a>'}"
        class="btn btn-primary col-auto"
        tabindex="0"
        role="button"
      >Dismissible popover</a>
    </div>
    <div class="row py-1">
      <font class="col-1">
        disabled tag:
      </font>
      <font class="col-1">
        popover(only):
      </font>
      <span
        v-tip:popover="'disabled popover'"
        class="col-auto d-inline-block"
      >
        <b-button
          style="pointer-events: none;"
          disabled
        >Disabled button</b-button>
      </span>
    </div>
    <br>
    <h2>b-popover</h2>
    <hr>
    <br>
    <div class="container">
      <!-- 'auto' 'auto-start' 'auto-end'
      'top' 'top-start' 'top-end'
      'bottom' 'bottom-start' 'bottom-end'
      'right' 'right-start' 'right-end' '
      left' 'left-start' 'left-end'; -->
      <div class="row align-items-start  mb-3">
        <div class="col-4">
          <b-button
            id="topStart1"
            class="col-auto align-middle"
          >
            top---------start
          </b-button>
          <b-popover
            for="topStart1"
            set="top-start"
            title="header"
          >
            top-start
          </b-popover>
        </div>
        <div class="col-4">
          <b-button
            id="topTop1"
            class="col-auto align-middle"
          >
            top---------top
          </b-button>
          <b-popover
            for="topTop1"
            set="top"
            title="header"
          >
            top
          </b-popover>
        </div>
        <div class="col-4">
          <b-button
            id="topEnd1"
            class="col-auto align-middle"
          >
            top---------end
          </b-button>
          <b-popover
            for="topEnd1"
            set="top-end"
            title="header"
          >
            top-end
          </b-popover>
        </div>
      </div>
      <div class="row align-items-center mb-3">
        <div class="col-4">
          <b-button
            id="lefStart1"
            class="col-auto"
          >
            left<br> <br><br> <br>start
          </b-button>
          <b-popover
            for="lefStart1"
            set="left-start"
            title="header"
          >
            left-start
          </b-popover>
          <br>
          <b-button
            id="left1"
            class="col-auto"
          >
            left
          </b-button>
          <b-popover
            for="left1"
            set="left"
            title="header"
          >
            left
          </b-popover>
          <br>
          <b-button
            id="leftEnd1"
            class="col-auto"
          >
            left<br> <br><br> <br>end
          </b-button>
          <b-popover
            for="leftEnd1"
            set="left-end"
            title="header"
          >
            left-end
          </b-popover>
        </div>
        <div class="col-4" />
        <div class="col-4">
          <b-button
            id="rightStart1"
            class="col-auto"
          >
            right<br> <br><br> <br>start
          </b-button>
          <b-popover
            for="rightStart1"
            set="right-start"
            title="header"
          >
            right-start
          </b-popover>
          <br>
          <b-button
            id="right1"
            class="col-auto"
          >
            right
          </b-button>
          <b-popover
            for="right1"
            set="right"
            title="header"
          >
            right
          </b-popover>
          <br>
          <b-button
            id="rihgtEnd1"
            class="col-auto"
          >
            right<br> <br><br> <br>end
          </b-button>
          <b-popover
            for="rihgtEnd1"
            set="right-end"
            title="header"
          >
            right-end
          </b-popover>
        </div>
      </div>
      <div class="row align-items-end mb-3">
        <div class="col-4">
          <b-button
            id="bottomStart1"
            class="col-auto align-middle"
          >
            bottom---------start
          </b-button>
          <b-popover
            for="bottomStart1"
            set="bottom-start"
            title="header"
          >
            bottom-start
          </b-popover>
        </div>
        <div class="col-4">
          <b-button
            id="bottomBottom1"
            class="col-auto align-middle"
          >
            bottom---------bottom
          </b-button>
          <b-popover
            for="bottomBottom1"
            set="bottom"
            title="header"
          >
            bottom
          </b-popover>
        </div>
        <div class="col-4">
          <b-button
            id="bottomEnd1"
            class="col-auto align-middle"
          >
            bottom---------end
          </b-button>
          <b-popover
            for="bottomEnd1"
            set="bottom-end"
            title="header"
          >
            bottom-end
          </b-popover>
        </div>
      </div>
    </div>
    <br>
    <h2>b-tooltip</h2>
    <hr>
    <br>
    <div class="container">
      <!-- 'auto' 'auto-start' 'auto-end'
      'top' 'top-start' 'top-end'
      'bottom' 'bottom-start' 'bottom-end'
      'right' 'right-start' 'right-end' '
      left' 'left-start' 'left-end'; -->
      <div class="row align-items-start  mb-3">
        <div class="col-4">
          <b-button
            id="topStart"
            class="col-auto align-middle"
          >
            top---------start
          </b-button>
          <b-tooltip
            for="topStart"
            set="top-start"
          >
            top-start
          </b-tooltip>
        </div>
        <div class="col-4">
          <b-button
            id="topTop"
            class="col-auto align-middle"
          >
            top---------top
          </b-button>
          <b-tooltip
            for="topTop"
            set="top"
          >
            top
          </b-tooltip>
        </div>
        <div class="col-4">
          <b-button
            id="topEnd"
            class="col-auto align-middle"
          >
            top---------end
          </b-button>
          <b-tooltip
            for="topEnd"
            set="top-end"
          >
            top-end
          </b-tooltip>
        </div>
      </div>
      <div class="row align-items-center mb-3">
        <div class="col-4">
          <b-button
            id="leftStart"
            class="col-auto"
          >
            left<br> <br><br> <br>start
          </b-button>
          <b-tooltip
            for="leftStart"
            set="left-start"
          >
            left-start
          </b-tooltip>
          <br>
          <b-button
            id="left"
            class="col-auto"
          >
            left
          </b-button>
          <b-tooltip
            for="left"
            set="left"
          >
            left
          </b-tooltip>
          <br>
          <b-button
            id="leftEnd"
            class="col-auto"
          >
            left<br> <br><br> <br>end
          </b-button>
          <b-tooltip
            for="leftEnd"
            set="left-end"
          >
            left-end
          </b-tooltip>
        </div>
        <div class="col-4" />
        <div class="col-4">
          <b-button
            id="rightStart"
            class="col-auto"
          >
            right<br> <br><br> <br>start
          </b-button>
          <b-tooltip
            for="rightStart"
            set="right-start"
          >
            right-start
          </b-tooltip>
          <br>
          <b-button
            id="right"
            class="col-auto"
          >
            right
          </b-button>
          <b-tooltip
            for="right"
            set="right"
          >
            right
          </b-tooltip>
          <br>
          <b-button
            id="rightEnd"
            class="col-auto"
          >
            right<br> <br><br> <br>end
          </b-button>
          <b-tooltip
            for="rightEnd"
            set="right-end"
          >
            right-end
          </b-tooltip>
        </div>
      </div>
      <div class="row align-items-end mb-3">
        <div class="col-4">
          <b-button
            id="bottomStart"
            class="col-auto align-middle"
          >
            bottom---------start
          </b-button>
          <b-tooltip
            for="bottomStart"
            set="bottom-start"
          >
            bottom-start
          </b-tooltip>
        </div>
        <div class="col-4">
          <b-button
            id="bottomBottom"
            class="col-auto align-middle"
          >
            bottom---------bottom
          </b-button>
          <b-tooltip
            for="bottomBottom"
            set="bottom"
          >
            bottom
          </b-tooltip>
        </div>
        <div class="col-4">
          <b-button
            id="bottomEnd"
            class="col-auto align-middle"
          >
            bottom---------end
          </b-button>
          <b-tooltip
            for="bottomEnd"
            set="bottom-end"
          >
            bottom-end
          </b-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BButton from "@/components/basic/Button/basic-button.vue";

import BPopover from '@/components/base/Popover/b-popover.vue'
import BTooltip from '@/components/base/Tooltip/b-tooltip.vue'

export default {
  name: "BTooltipDemo",
  components: { BButton, BPopover, BTooltip, },
  data() {
    return {
      text: "disabled value"
    };
  },
};
</script>
