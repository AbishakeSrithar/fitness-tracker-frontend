import { expect, test } from 'vitest'
import { sum, exportedForTesting } from '../src/get/all-entries'
import { Entry } from '../src/models/entry'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('generateEntryTable', () => {
    const payload = {"success":true,"info":"Get All Entries","payload":[{"id":1,"workoutId":1,"exerciseId":1,"weight":0.0,"sets":4,"reps":15},{"id":2,"workoutId":1,"exerciseId":2,"weight":50.0,"sets":4,"reps":10},{"id":3,"workoutId":2,"exerciseId":3,"weight":0.0,"sets":2,"reps":60}]} 
    const entry = payload.payload as Array<Entry>;
    expect(exportedForTesting.generateEntryTable(entry)).toBe(3)
  })