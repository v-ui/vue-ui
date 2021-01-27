<template>
  <div>
    <h2>b-date-panel</h2>
    <hr>
    <div class="row mx-0">
      <font class="col-1">
        type:
      </font>
      <font class="col-1">
        year
      </font>
      <b-date-panel
        class="col-2"
        type="year"
      />
      <font class="col-1">
        month
      </font>
      <b-date-panel
        class="col-2"
        type="month"
      />
      <font class="col-1">
        date
      </font>
      <b-date-panel
        class="col-2"
        type="date"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        min/max:
      </font>
      <font class="col-1">
        year
        <br>
        min="2015"
        max="2020"
      </font>
      <b-date-panel
        class="col-2"
        type="year"
        min="2015"
        max="2020"
      />
      <font class="col-1">
        month
        <br>
        min="2021-01"
        max="2021-10"
      </font>
      <b-date-panel
        class="col-2"
        type="month"
        min="2021-01"
        max="2021-10"
      />
      <font class="col-1">
        date
        <br>
        min="2021-01-10"
        max="2021-01-20"
      </font>
      <b-date-panel
        class="col-2"
        type="date"
        min="2021-01-10"
        max="2021-01-20"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        v-model:
      </font>
      <font class="col-1">
        year
        <br>
        {{ year }}
      </font>
      <b-date-panel
        v-model="year"
        class="col-2"
        type="year"
      />
      <font class="col-1">
        month
        <br>
        {{ month }}
      </font>
      <b-date-panel
        v-model="month"
        class="col-2"
        type="month"
      />
      <font class="col-1">
        date
        <br>
        {{ date }}
      </font>
      <b-date-panel
        v-model="date"
        class="col-2"
        type="date"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        v-model(range):
      </font>
      <font class="col-1">
        yearR
        <br>
        {{ yearR }}
      </font>
      <b-date-panel
        v-model="yearR"
        type="year"
        range
      />
      <font class="col-1">
        monthR
        <br>
        {{ monthR }}
      </font>
      <b-date-panel
        v-model="monthR"
        type="month"
        range
      />
    </div>
    <div class="row">
      <font class="col-1" />
      <font class="col-1">
        date
        <br>
        {{ dateR }}
      </font>
      <b-date-panel
        v-model="dateR"
        type="date"
        range
      />
    </div>
    <h2>b-date-picker</h2>
    <hr>
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
    <div class="row mx-0">
      <font class="col-1">
        type:
      </font>
      <font class="col-1">
        year:
      </font>
      <b-date-picker
        class="col-2"
        type="year"
      />
      <font class="col-1">
        month:
      </font>
      <b-date-picker
        class="col-2"
        type="month"
      />
      <font class="col-1">
        date:
      </font>
      <b-date-picker
        class="col-2"
        type="date"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        value:
      </font>
      <font class="col-1">
        year:
      </font>
      <b-date-picker
        class="col-2"
        type="year"
        value="2018"
      />
      <font class="col-1">
        month:
      </font>
      <b-date-picker
        class="col-2"
        type="month"
        value="2018"
      />
      <font class="col-1">
        date:
      </font>
      <b-date-picker
        class="col-2"
        type="date"
        value="2018"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        min
        <br>max:
      </font>
      <font class="col-1">
        year:
      </font>
      <b-date-picker
        class="col-2"
        type="year"
        min="2018"
        max="2020"
      />
      <font class="col-1">
        month:
      </font>
      <b-date-picker
        class="col-2"
        type="month"
        min="2018"
        max="2019-09"
      />
      <font class="col-1">
        date:
      </font>
      <b-date-picker
        class="col-2"
        type="date"
        min="2018"
        max="2019-09-30"
        info="info text"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        v-model:
      </font>
      <font class="col-1">
        year
        <br>
        {{ year }}:
      </font>
      <b-date-picker
        v-model="year"
        class="col-2"
        type="year"
      />
      <font class="col-1">
        month
        <br>
        {{ month }}:
      </font>
      <b-date-picker
        v-model="month"
        class="col-2"
        type="month"
      />
      <font class="col-1">
        date
        <br>
        {{ date }}:
      </font>
      <b-date-picker
        v-model="date"
        class="col-2"
        type="date"
      />
    </div>
    <div class="row mx-0">
      <font class="col-1">
        v-model(range):
      </font>
      <font class="col-1">
        year
        <br>
        {{ yearR }}:
      </font>
      <b-date-picker
        v-model="yearR"
        class="col-2"
        type="year"
        range
      />
      <font class="col-1">
        month
        <br>
        {{ monthR }}:
      </font>
      <b-date-picker
        v-model="monthR"
        class="col-2"
        type="month"
        range
      />
      <font class="col-1">
        date
        <br>
        {{ dateR }}:
      </font>
      <b-date-picker
        v-model="dateR"
        class="col-2"
        type="date"
        range
      />
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
import BDatePanel from '@/components/base/DateTime/Date/DatePicker/b-date-panel.vue'
import BDatePicker from "@/components/base/DateTime/Date/DatePicker/b-date-picker.vue";
import BTime from "@/components/base/DateTime/Time/b-time.vue";

export default {
  name: "BDatetimeDemo",
  components: { BDatePanel, BDatePicker, BTime,  },
  data() {
    return {
      year: "2018",
      month: "2018-05",
      date: "2018-05-03",
      yearR: {
        start: '2018',
        end: '2020',
      },
      monthR: {
        start: '2018-05',
        end: '2018-09',
      },
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
