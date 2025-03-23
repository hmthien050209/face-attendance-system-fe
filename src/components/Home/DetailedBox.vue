<script setup lang="ts">
import { Card } from 'primevue'
import { testDailyCount, testDailyEntries } from '@/testData'
import { computed } from 'vue'
import { isSameDate } from '@/utils/isSameDate'

const props = defineProps<{
  date: Date | null
}>()

const statsOfDate = computed(() => {
  if (props.date !== null) {
    return testDailyCount.filter((e) => isSameDate(e.date, props.date!))[0]
  }
  return null
})

const absentStudents = computed(() => {
  if (props.date !== null) {
    return testDailyEntries
      .filter((e) => isSameDate(e.date, props.date!))[0]
      .studentStatus.filter((s) => !s.present)
  }
  return []
})
</script>

<template>
  <Card class="m-2 h-1/2 w-1/2">
    <template #title>
      <h1>Detailed view</h1>
    </template>
    <template #content>
      <div class="p-2">
        <div v-if="date">
          <p>Date: {{ date.toLocaleDateString() }}</p>
          <p>Number of students: {{ statsOfDate?.numberOfStudents }}</p>
          <p>Student count: {{ statsOfDate?.studentCount }}</p>
          <p>Absent students: {{ absentStudents.length }} students:</p>
          <ol class="ml-2 list-decimal">
            <li v-for="student in absentStudents" :key="student.uuid">{{ student.name }}</li>
          </ol>
        </div>
        <p v-else>No date selected.</p>
      </div>
    </template>
  </Card>
</template>
