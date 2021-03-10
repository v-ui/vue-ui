<template>
  <div>
    <b-video />
  </div>
</template>

<script>
import BVideo from '@/components/content/Video/b-video.vue'

export default {
    name: 'BVideoDemo',
    components: { BVideo, },
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
