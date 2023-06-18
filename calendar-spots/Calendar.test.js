import Calendar from './Calendar'
import calendar1 from './calendars/calendar.1.json'
import calendar2 from './calendars/calendar.2.json'
import calendar3 from './calendars/calendar.3.json'

const moment = require('moment')
const assert = require('assert')

describe('getAvailableSpot', function () {
  const calendar = new Calendar(calendar1)

  it('Should get 1 available spots of calendar 1', function () {
    const result = calendar.getAvailableSpots('10-04-2023', 30)
    assert.ok(result)
    assert.equal(result.length, 1)
    assert.equal(result[0].startHour.valueOf(), moment.utc('2023-04-10T16:00:00.000Z').valueOf())
    assert.equal(result[0].endHour.valueOf(), moment.utc('2023-04-10T16:50:00.000Z').valueOf())
  })
})

describe('getAvailableSpot', function () {
  const calendar = new Calendar(calendar2)

  it('Should get 1 available spots of calendar 2', function () {
    const result = calendar.getAvailableSpots('13-04-2023', 25)
    assert.ok(result)
    assert.equal(result.length, 1)
    assert.equal(result[0].startHour.valueOf(), moment.utc('2023-04-13T18:00:00.000Z').valueOf())
    assert.equal(result[0].endHour.valueOf(), moment.utc('2023-04-13T18:25:00.000Z').valueOf())
  })
})

describe('getAvailableSpot', function () {
  const calendar = new Calendar(calendar3)

  it('Should get no available spots of calendar 3', function () {
    const result = calendar.getAvailableSpots('16-04-2023', 25)
    assert.ok(result)
    assert.equal(result.length, 0)
  })
})
