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
        class="btn btn-primary"
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
          <b-popover
            set="top-start"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                top---------start
              </b-button>
            </template>
            top-start
          </b-popover>
        </div>
        <div class="col-4">
          <b-popover
            set="top"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                top---------top
              </b-button>
            </template>
            top
          </b-popover>
        </div>
        <div class="col-4">
          <b-popover
            set="top-end"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                top---------end
              </b-button>
            </template>
            top-end
          </b-popover>
        </div>
      </div>
      <div class="row align-items-center mb-3">
        <div class="col-4">
          <b-popover
            set="left-start"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                left<br> <br><br> <br>start
              </b-button>
            </template>
            left-start
          </b-popover>
          <br>
          <b-popover
            set="left"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                left
              </b-button>
            </template>
            left
          </b-popover>
          <br>
          <b-popover
            set="left-end"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                left<br> <br><br> <br>end
              </b-button>
            </template>
            left-end
          </b-popover>
        </div>
        <div class="col-4" />
        <div class="col-4">
          <b-popover
            set="right-start"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                right<br> <br><br> <br>start
              </b-button>
            </template>
            right-start
          </b-popover>
          <br>
          <b-popover
            set="right"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                right
              </b-button>
            </template>
            right
          </b-popover>
          <br>
          <b-popover
            set="right-end"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                right<br> <br><br> <br>end
              </b-button>
            </template>
            right-end
          </b-popover>
        </div>
      </div>
      <div class="row align-items-end mb-3">
        <div class="col-4">
          <b-popover
            set="bottom-start"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                bottom---------start
              </b-button>
            </template>
            bottom-start
          </b-popover>
        </div>
        <div class="col-4">
          <b-popover
            set="bottom"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                bottom---------bottom
              </b-button>
            </template>
            bottom
          </b-popover>
        </div>
        <div class="col-4">
          <b-popover
            set="bottom-end"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                bottom---------end
              </b-button>
            </template>
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
          <b-tooltip
            set="top-start"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                top---------start
              </b-button>
            </template>
            top-start
          </b-tooltip>
        </div>
        <div class="col-4">
          <b-tooltip
            set="top"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                top---------top
              </b-button>
            </template>
            top
          </b-tooltip>
        </div>
        <div class="col-4">
          <b-tooltip
            set="top-end"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                top---------end
              </b-button>
            </template>
            top-end
          </b-tooltip>
        </div>
      </div>
      <div class="row align-items-center mb-3">
        <div class="col-4">
          <b-tooltip
            set="left-start"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                left<br> <br><br> <br>start
              </b-button>
            </template>
            left-start
          </b-tooltip>
          <br>
          <b-tooltip
            set="left"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                left
              </b-button>
            </template>
            left
          </b-tooltip>
          <br>
          <b-tooltip
            set="left-end"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                left<br> <br><br> <br>end
              </b-button>
            </template>
            left-end
          </b-tooltip>
        </div>
        <div class="col-4" />
        <div class="col-4">
          <b-tooltip
            set="right-start"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                right<br> <br><br> <br>start
              </b-button>
            </template>
            right-start
          </b-tooltip>
          <br>
          <b-tooltip
            set="right"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                right
              </b-button>
            </template>
            right
          </b-tooltip>
          <br>
          <b-tooltip
            set="right-end"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto">
                right<br> <br><br> <br>end
              </b-button>
            </template>
            right-end
          </b-tooltip>
        </div>
      </div>
      <div class="row align-items-end mb-3">
        <div class="col-4">
          <b-tooltip
            set="bottom-start"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                bottom---------start
              </b-button>
            </template>
            bottom-start
          </b-tooltip>
        </div>
        <div class="col-4">
          <b-tooltip
            set="bottom"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                bottom---------bottom
              </b-button>
            </template>
            bottom
          </b-tooltip>
        </div>
        <div class="col-4">
          <b-tooltip
            set="bottom-end"
            title="header"
          >
            <template #popRef>
              <b-button class="col-auto align-middle">
                bottom---------end
              </b-button>
            </template>
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
