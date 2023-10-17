<template>
  <div id="secondWrap" class="second-wrap">
    <div class="second-wrap_body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { animateCSS } from '@utils/animate'

defineOptions({
  name: 'SecondWrap',
})

const props = defineProps({
  className: {
    type: String,
    default: 'fadeInUp',
  },
})

onMounted(() => {
  const height = document.body.clientHeight
  const searchWrap = document.getElementById('secondWrap')
  searchWrap.style.height = `${height}px`
  animateCSS('.second-wrap', props.className)
})
</script>

<style lang="scss">
.second-wrap {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  z-index: 2000;
  overflow-y: scroll;
  overflow-x: hidden;
  &_body {
    margin-bottom: 30px;
  }
}
</style>
