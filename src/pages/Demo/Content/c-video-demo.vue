<template>
  <div>
    <c-video />
  </div>
</template>

<script>
import CVideo from '@/components/content//Video/c-video.vue'

export default {
    name: 'CVideoDemo',
    components: { CVideo, },
    data: () => {
      return {
        opt: {
          sources: [


          ]
        },
      }
    }
}
</script>
