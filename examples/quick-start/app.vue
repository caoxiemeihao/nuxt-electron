<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { ipcRenderer } from 'electron'
import fs from 'node:fs'

onMounted(() => {
  console.log('ipcRenderer:',ipcRenderer)
  console.log('fs:', fs)
})
</script>
