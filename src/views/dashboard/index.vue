<template>
  <div class="dashboard-container">
    <div class="dashboard-text"><aside>hi，{{name}} 欢迎使用他趣测试质量平台</aside></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'test',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
