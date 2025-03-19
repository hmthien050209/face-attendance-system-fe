import type { DailyStats } from './types/dailyStats'
import { faker } from '@faker-js/faker'
import type { Entry } from './types/entry'

export const testDailyCount: DailyStats[] = []

export const testDailyEntries: Entry[] = []

export function generateData() {
  const generatedDates = new Map<string, boolean>()
  for (let i = 0; i < 100; i++) {
    const date = faker.date
      .between({
        from: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000),
        to: Date.now(),
      })
      .toISOString()
      .split('T')[0]
    const studentStatus = Array.from({ length: faker.number.int({ min: 1, max: 100 }) }, () => ({
      uuid: crypto.randomUUID(),
      name: faker.person.fullName(),
      present: faker.datatype.boolean(),
    }))
    if (!generatedDates.has(date)) {
      generatedDates.set(date, true)
      testDailyEntries.push({
        date: new Date(date),
        studentStatus,
      })
      testDailyCount.push({
        date: new Date(date),
        numberOfStudents: studentStatus.length,
        studentCount: studentStatus.filter((student) => student.present === true).length,
      })
    }
  }

  // Check for date duplications in the testDailyEntries
  testDailyEntries.forEach((entry) => {
    const duplicateEntries = testDailyEntries.filter(
      (e) =>
        e.date.toISOString().split('T')[0] === entry.date.toISOString().split('T')[0] &&
        e.studentStatus.some((student) => student.uuid === entry.studentStatus[0].uuid),
    )
    if (duplicateEntries.length > 1) {
      throw new Error(`Duplicate entries found for date ${entry.date.toISOString().split('T')[0]}`)
    }
  })
}
