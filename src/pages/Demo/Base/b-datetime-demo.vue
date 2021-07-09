<template>
  <div>
    <h2>b-date-panel</h2>
    <hr>
    <h4 class="row mx-0">
      <font class="col-1">
        type:
      </font>
      <font class="col-2">
        year
      </font>
      <font class="col-2">
        quarter
      </font>
      <font class="col-2">
        month
      </font>
      <font class="col-2">
        week
      </font>
      <font class="col-2">
        date
      </font>
    </h4>
    <div class="row mx-0">
      <font class="col-1">
        default
      </font>
      <b-date-panel
        class="col-2"
        type="year"
      />
      <b-date-panel
        class="col-2"
        type="quarter"
      />
      <b-date-panel
        class="col-2"
        type="month"
      />
      <b-date-panel
        class="col-2"
        type="week"
      />
      <b-date-panel
        class="col-2"
        type="date"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        hideHeader:
      </font>
      <b-date-panel
        class="col-2"
        type="year"
        hide-header
      />
      <b-date-panel
        class="col-2"
        type="quarter"
        hide-header
      />
      <b-date-panel
        class="col-2"
        type="month"
        hide-header
      />
      <b-date-panel
        class="col-2"
        type="week"
        hide-header
      />
      <b-date-panel
        class="col-2"
        type="date"
        hide-header
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        min/max:
      </font>
      <div class="col-2">
        min="2015"
        max="2020"
        <br>
        <b-date-panel
          type="year"
          min="2015"
          max="2020"
        />
      </div>
      <div class="col-2">
        min="2020-01"
        max="2020-10"
        <br>
        <b-date-panel
          type="quarter"
          min="2020-01"
          max="2020-10"
        />
      </div>
      <div class="col-2">
        min="2020-01"
        max="2020-10"
        <br>
        <b-date-panel
          type="month"
          min="2020-01"
          max="2020-10"
        />
      </div>
      <div class="col-2">
        min="2020-01-10"
        max="2020-01-20"
        <br>
        <b-date-panel
          type="week"
          min="2020-01-10"
          max="2020-01-20"
        />
      </div>
      <div class="col-2">
        min="2020-01-10"
        max="2020-01-20"
        <br>
        <b-date-panel
          type="date"
          min="2020-01-10"
          max="2020-01-20"
        />
      </div>
    </div>
    <div class="row mx-0">
      <font class="col-1">
        v-model:
      </font>
      <div class="col-2">
        {{ year }}
        <br>
        <b-date-panel
          v-model="year"
          type="year"
        />
      </div>
      <div class="col-2">
        {{ quarter }}
        <br>
        <b-date-panel
          v-model="quarter"
          type="quarter"
        />
      </div>
      <div class="col-2">
        {{ month }}
        <br>
        <b-date-panel
          v-model="month"
          type="month"
        />
      </div>
      <div class="col-2">
        {{ week }}
        <br>
        <b-date-panel
          v-model="week"
          type="week"
        />
      </div>
      <div class="col-2">
        {{ date }}
        <br>
        <b-date-panel
          v-model="date"
          type="date"
        />
      </div>
    </div>
    <h2>b-date-select</h2>
    b-date-select 拥有 b-date-panel 的所有功能，b-date-panel 更简洁，在单独选择日期时推荐使用 b-date-panel，仅当需要选择时间范围时才使用 b-date-select
    <hr>
    <div class="row">
      <font class="col-1">
        type:
      </font>
      <font class="col-3">
        year
      </font>
      <font class="col-3">
        month
      </font>
      <font class="col-3">
        date
      </font>
    </div>
    <div class="row mx-0">
      <font class="col-1">
        v-model(range):
      </font>
      <div class="col-3">
        {{ yearR }}
        <br>
        <b-date-select
          v-model="yearR"
          type="year"
          range
        />
      </div>
      <div class="col-3 mx-5">
        {{ monthR }}
        <br>
        <b-date-select
          v-model="monthR"
          type="month"
          range
        />
      </div>
      <div class="col-4">
        {{ dateR }}
        <br>
        <b-date-select
          v-model="dateR"
          type="date"
          range
        />
      </div>
    </div>
    <h2>b-date-picker</h2>
    <hr>
    <h4>基本属性</h4>
    <br>
    <div class="row mx-0">
      <font class="col-1">
        default:
      </font>
      <b-date-picker class="col-11" />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        disabled:
      </font>
      <b-date-picker
        class="col-11"
        disabled
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        info:
      </font>
      <b-date-picker
        class="col-11"
        info="info text"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        placeholder:
      </font>
      <b-date-picker
        class="col-11"
        placeholder="Place Check the Date"
      />
    </div>
    <br>
    <h4>校验</h4>
    <br>
    <div class="row">
      <font class="col-1">
        required:
      </font>
      <b-date-picker
        class="col-11"
        required
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error:
      </font>
      <b-date-picker
        class="col-11"
        invalid-info="error"
        valid-info="success"
        required
      />
    </div>
    <div class="row">
      <font class="col-1">
        success
        <br>error(2):
      </font>
      <b-date-picker
        class="col-11"
        required
      >
        <template #invalid>
          you can add anlything invalidInfo or DOM
        </template>
        <template #valid>
          you can add anlything validInfo or DOM
        </template>
      </b-date-picker>
    </div>
    <br>
    <h4 class="row mx-0">
      <font class="col-1">
        type:
      </font>
      <font class="col-2">
        year
      </font>
      <font class="col-2">
        month
      </font>
      <font class="col-2">
        date
      </font>
    </h4>
    <br>
    <div class="row mx-0">
      <font class="col-1">
        default:
      </font>
      <b-date-picker
        class="col-2"
        type="year"
      />
      <b-date-picker
        class="col-2"
        type="month"
      />
      <b-date-picker
        class="col-2"
        type="date"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        value:
      </font>
      <b-date-picker
        class="col-2"
        type="year"
        value="2018"
      />
      <b-date-picker
        class="col-2"
        type="month"
        value="2018-03"
      />
      <b-date-picker
        class="col-2"
        type="date"
        value="2018-03-05"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        min
        <br>max:
      </font>
      <b-date-picker
        class="col-2"
        type="year"
        min="2018"
        max="2020"
      />
      <b-date-picker
        class="col-2"
        type="month"
        min="2018-02"
        max="2019-09"
      />
      <b-date-picker
        class="col-2"
        type="date"
        min="2019-09-15"
        max="2019-09-30"
        info="info text"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        v-model:
      </font>
      <div class="col-2">
        {{ year }}:
        <br>
        <b-date-picker
          v-model="year"
          type="year"
        />
      </div>
      <div class="col-2">
        {{ month }}:
        <br>
        <b-date-picker
          v-model="month"
          type="month"
        />
      </div>
      <div class="col-2">
        {{ date }}:
        <br>
        <b-date-picker
          v-model="date"
          type="date"
        />
      </div>
    </div>
    <div class="row mx-0">
      <font class="col-1">
        v-model(range):
      </font>
      <div class="col-2">
        {{ yearR }}:
        <br>
        <b-date-picker
          v-model="yearR"
          type="year"
          range
        />
      </div>
      <div class="col-2">
        {{ monthR }}:
        <br>
        <b-date-picker
          v-model="monthR"
          type="month"
          range
        />
      </div>
      <div class="col-2">
        {{ dateR }}:
        <br>
        <b-date-picker
          v-model="dateR"
          type="date"
          range
        />
      </div>
    </div>
    <h2>b-datetime</h2>
    <hr>
    <div class="row mx-0">
      <font class="col-1">
        default:
      </font>
      <b-time class="col-11" />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        disabled:
      </font>
      <b-time
        class="col-11"
        disabled
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        readonly:
      </font>
      <b-time
        class="col-11"
        readonly
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        info:
      </font>
      <b-time
        class="col-11"
        info="info text"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        type:
      </font>
      <font class="col-1">
        hh:mm:
      </font>
      <b-time
        class="col-4"
        type="hh:mm"
      />
      <font class="col-1">
        hh:mm:ss:
      </font>
      <b-time
        class="col-4"
        type="hh:mm:ss"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        value:
      </font>
      <font class="col-1">
        hh:mm:
      </font>
      <b-time
        class="col-4"
        type="hh:mm"
        value="05:32"
      />
      <font class="col-1">
        hh:mm:ss:
      </font>
      <b-time
        class="col-4"
        type="hh:mm:ss"
        value="05:32:13"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        min
        <br>max:
      </font>
      <font class="col-1">
        hh:mm:
      </font>
      <b-time
        class="col-4"
        type="hh:mm"
        min="09:00"
        max="15:59"
      />
      <font class="col-1">
        hh:mm:ss:
      </font>
      <b-time
        class="col-4"
        type="hh:mm:ss"
        min="09:00"
        max="15:59:59"
        info="info text"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        v-model:
      </font>
      <font class="col-1">
        hh:mm
        <br>
        {{ hhmm }}:
      </font>
      <b-time
        v-model="hhmm"
        class="col-4"
        type="hh:mm"
      />
      <font class="col-1">
        hh:mm:ss
        <br>
        {{ hhmmss }}:
      </font>
      <b-time
        v-model="hhmmss"
        class="col-4"
        type="hh:mm:ss"
      />
    </div>
  </div>
</template>

<script>
import BDatePanel from '@/components/base/DateTime/Date/DatePicker/b-date-panel.vue';
import BDateSelect from '@/components/base/DateTime/Date/DatePicker/b-date-select.vue'
import BDatePicker from "@/components/base/DateTime/Date/DatePicker/b-date-picker.vue";
import BTime from "@/components/base/DateTime/Time/b-time.vue";

export default {
  name: "BDatetimeDemo",
  components: { BDatePanel, BDateSelect, BDatePicker, BTime,  },
  data() {
    return {
      year: "2018",
      quarter: "2018-05",
      month: "2018-05",
      week: "2018-05-03",
      date: "2018-05-03",
      yearR: {
        start: '2018',
        end: '2020',
      },
      quarterR: "2018-05",
      monthR: {
        start: '2018-05',
        end: '2018-09',
      },
      weekR: "2018-05-03",
      dateR: {
        start: '2018-05-03',
        end: '2018-05-15',
      },
      hhmm: "06:31",
      hhmmss: "06:31:59",
      year1: "2015",
      month1: "3",
    };
  },
};
</script>
