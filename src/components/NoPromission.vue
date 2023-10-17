<template>
  <Empty
    :image="getImgUrl('lock')"
    title="暂无权限"
    content="很抱歉您无权访问"
  />
</template>

<script setup>
import { getImgUrl } from '@utils/image'
</script>

<style lang="scss" scoped></style>
