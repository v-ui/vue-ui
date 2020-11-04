<template>
  <div>
    <h2>b-file</h2>
    <base-a href="https://pqina.nl/filepond/docs/patterns/api/filepond-instance/">
      filepond-instance
    </base-a>
    <hr>
    <div class="row no-gutters py-1">
      <font class="col-1">
        default:
      </font>
      <b-file class="col-11" />
    </div>
    <div class="row no-gutters py-1">
      <font class="col-1">
        multiple:
      </font>
      <b-file
        class="col-11"
        multiple
      />
    </div>
    <div class="row no-gutters py-1">
      <font class="col-1">
        disabled:
      </font>
      <b-file
        class="col-11"
        disabled="true"
      />
    </div>
  </div>
</template>

<script>
import BFile from '@/components/form/b-file.vue'
import BaseA from '@/components/basic/A/basic-a.vue'

export default {
  name: 'BFileDemo',
  components: {
    BFile,
    BaseA,
  },
}
</script>
