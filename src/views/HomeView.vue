<script setup lang="ts">
import OverallCountChart from '@/components/Home/DailyCountChart.vue'
import DetailedView from '@/components/Home/DetailedBox.vue'
import { ref } from 'vue'

const selectedDate = ref<Date | null>(null)

function onOverallCountChartSelect(entry: { date: Date; studentCount: number }) {
  selectedDate.value = new Date(entry.date)
}
</script>

<template>
  <main class="flex flex-col p-2">
    <h1>Hi there!</h1>
    <p>Here are some status of the last 30 days:</p>
    <div class="flex flex-row">
      <OverallCountChart @select="onOverallCountChartSelect" />
      <DetailedView :date="selectedDate" />
    </div>
  </main>
</template>
