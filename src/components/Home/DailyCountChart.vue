<script setup lang="ts">
import { testDailyCount } from '@/testData'
import type { DailyStats } from '@/types/dailyStats'
import { ref, onMounted } from 'vue'
import Chart, { type ChartSelectEvent } from 'primevue/chart'
import { Button, Card } from 'primevue'

const lastDate = ref<string | null>(null)
const chartData = ref()
const chartOptions = ref()
const chartRef = ref()

const emit = defineEmits<{
  select: [
    entry: {
      date: Date
      studentCount: number
    },
  ]
}>()

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

const setChartData = () => {
  // Sort by date
  testDailyCount.sort((a: DailyStats, b: DailyStats) => a.date.getTime() - b.date.getTime())
  lastDate.value = testDailyCount[testDailyCount.length - 1].date.toLocaleDateString()

  // Filter the last 30 days
  const filteredData = testDailyCount.filter((entry: DailyStats) => {
    const today = new Date()
    const entryDate = new Date(entry.date)
    return entryDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)
  })

  return {
    labels: filteredData.map((entry: DailyStats) => entry.date.toLocaleDateString()),
    datasets: [
      {
        label: 'Student count',
        data: filteredData.map((entry: DailyStats) => entry.studentCount),
      },
    ],
  }
}

function onSelect(event: ChartSelectEvent) {
  const index = event.element.index
  emit('select', {
    date: new Date(chartData.value!.labels[index] as string),
    studentCount: chartData.value!.datasets[0].data[index] as number,
  })
}

function refreshChart() {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
  chartRef.value?.refresh()
}

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})
</script>

<template>
  <Card class="m-2 h-1/2 w-1/2">
    <template #title>
      <h1>Overall student count:</h1>
    </template>
    <template #content>
      <Chart
        :ref="chartRef"
        type="bar"
        :data="chartData"
        :options="chartOptions"
        @select="onSelect"
      />
    </template>
    <template #footer>
      <div class="flex flex-row items-center">
        <div class="mr-2">Last updated: {{ lastDate }}</div>
        <Button @click="refreshChart" icon="pi pi-refresh" aria-label="refresh chart"></Button>
      </div>
    </template>
  </Card>
</template>
