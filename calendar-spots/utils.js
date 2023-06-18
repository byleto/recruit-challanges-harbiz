import moment from 'moment'
import { ValidationError } from './errors/ValidationError'

const TIME_PART_FORMAT = 'HH:mm'

function getMomentHour (dateISO, hour) {
  const finalHourForAdd = moment(dateISO + ' ' + hour)
  return finalHourForAdd
}

function addMinutes (hour, minutes) {
  const result = moment(hour).add(minutes, 'minutes').format(TIME_PART_FORMAT)
  return result
}

export function getOneMiniSlot (dateISO, slot, duration) {
  const { timeBefore, time, timeAfter } = duration
  const startHourFirst = getMomentHour(dateISO, slot.start)
  const startHour = startHourFirst.format(TIME_PART_FORMAT)
  const endHour = addMinutes(startHourFirst, timeBefore + time + timeAfter)
  if (moment.utc(endHour, TIME_PART_FORMAT) > moment.utc(slot.end, TIME_PART_FORMAT)) {
    return null
  }

  return {
    startHour: moment.utc(dateISO + ' ' + startHour).toDate(),
    endHour: moment.utc(dateISO + ' ' + endHour).toDate()
  }
}

export const validateCalendar = calendar => {
  if (typeof calendar.durationBefore !== 'number') {
    throw new ValidationError('The duration before should be a number')
  }
  if (typeof calendar.durationAfter !== 'number') {
    throw new ValidationError('The duration after should be a number')
  }
  const validkeys = ['durationBefore', 'durationAfter', 'slots', 'sessions']
  validkeys.forEach(key => {
    const exists = Object.keys(calendar).includes(key)
    if (!exists) {
      throw new ValidationError('The key ' + key + ' does not exists')
    }
  })
  return null
}
