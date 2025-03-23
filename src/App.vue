<script setup lang="ts">
import { Toast } from 'primevue'
import { RouterView, useRouter } from 'vue-router'
import { Menubar } from 'primevue'

const router = useRouter()

const menuItems = [
  { label: 'Status', icon: 'pi pi-chart-bar', command: () => router.push('/') },
  { label: 'Admin', icon: 'pi pi-info-circle', command: () => router.push('/admin') },
]
</script>

<template>
  <div>
    <Toast />
    <Menubar :model="menuItems">
      <template #start>
        <h1>Face Attendance Check System</h1>
      </template>
    </Menubar>
    <RouterView class="flex h-full w-full grow" />
  </div>
</template>
