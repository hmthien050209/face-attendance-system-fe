<script setup lang="ts">
import { Toast } from 'primevue'
import { RouterView } from 'vue-router'
import { Menubar } from 'primevue'
import { type MenuItem } from 'primevue/menuitem'

const menuItems: MenuItem[] = [
  { label: 'Status', icon: 'pi pi-chart-bar', to: '/' },
  { label: 'Admin', icon: 'pi pi-info-circle', to: '/admin' },
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
