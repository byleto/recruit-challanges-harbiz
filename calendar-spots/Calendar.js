import moment from 'moment'
import differenceWith from 'lodash/differenceWith'
import isEqual from 'lodash/isEqual'
import { getOneMiniSlot, validateCalendar } from './utils'

export default class Calendar {
  constructor (calendar) {
    validateCalendar(calendar)
    this.durationBefore = calendar.durationBefore
    this.durationAfter = calendar.durationAfter
    this.slots = calendar.slots
    this.sessions = calendar.sessions
  }

  getAvailableSpots (date, duration) {
    const dateISO = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
    const daySlots = this.slots[date]
    const sessions = this.sessions[date]

    const realSpots = differenceWith(daySlots, sessions, isEqual)

    const sessionDuration = {
      time: duration,
      timeBefore: this.durationBefore,
      timeAfter: this.durationAfter
    }

    return realSpots.reduce((result, slot) => {
      const availableSlot = getOneMiniSlot(dateISO, slot, sessionDuration)
      if (availableSlot) {
        result.push(availableSlot)
      }
      return result
    }, [])
  }
}
