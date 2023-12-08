<template>
  <svg
    aria-hidden="true"
    :class="svgClass"
    :fill="color"
    :style="'width:' + size + ';height:' + size"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'SvgIcon',
})

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  svgClass: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  size: {
    type: String,
    default: '1em',
  },
})

const symbolId = computed(() => `#${props.name}`)
const svgClass = computed(() =>
  props.svgClass ? `svg-icon ${props.svgClass}` : 'svg-icon',
)
</script>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  fill: currentColor;
  outline: none;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em; // 纠正视觉上未对齐效果
  overflow: hidden;
}
</style>
