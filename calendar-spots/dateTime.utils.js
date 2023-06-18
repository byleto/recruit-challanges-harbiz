import moment from 'moment'

export const getMomentHour = (date, hour) => {
  const dateISO = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
  const finalHourForAdd = moment(dateISO + ' ' + hour)
  return finalHourForAdd
}

export const addMinutes = (hour, minutes) => {
  const result = moment(hour).add(minutes, 'minutes').format('HH:mm')
  return result
}

export const getOneMiniSlot = (dateISO, slot, sessionDuration) => {
  const startHourFirst = getMomentHour(dateISO, slot.start)
  const startHour = startHourFirst.format('HH:mm')
  const endHour = addMinutes(
    startHourFirst,
    sessionDuration.timeBefore + sessionDuration.time + sessionDuration.timeAfter
  )
  if (moment.utc(endHour, 'HH:mm') > moment.utc(slot.end, 'HH:mm')) {
    return null
  }

  return {
    startHour: moment.utc(dateISO + ' ' + startHour).toDate(),
    endHour: moment.utc(dateISO + ' ' + endHour).toDate()
  }
}
