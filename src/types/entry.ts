import type { StudentStatus } from './studentStatus'

export interface Entry {
  date: Date
  studentStatus: StudentStatus[]
}
