import moment from 'moment'

const formats = {
  short: 'YYYY MM DD',
  shortWithMonth: 'DD MMM YYYY',
  shortWithMonth2: 'DD MMM YY',
  shortWithTime: 'DD MMM YY h:mma',
  withTime: 'D MMMM YYYY h:mma',
  withDashes: 'YYYY-MM-DD',
  submitedOnHour: 'hh:mma ',
  submitedOnDate: ' DD.MM.YY'
}

export const dayToString = (date, format = formats.withTime) =>
  moment(date).format(format)

export const toShortDate = date => dayToString(date, formats.short)
export const toDateWithMonthShortWithTime = date =>
  dayToString(date, formats.shortWithTime)
export const toDateWithDashes = date => dayToString(date, formats.withDashes)
export const toDateWithMonth = date => dayToString(date, formats.shortWithMonth)
export const toDateWithMonthShort = date =>
  dayToString(date, formats.shortWithMonth2)
export const toSubmitedHour = date => dayToString(date, formats.submitedOnHour)
export const toSubmitedDate = date => dayToString(date, formats.submitedOnDate)

export const dayToStringWithoutTime = (date, format = formats.shortWithMonth) =>
  getUTCTime(date).format(format)

export const toDateWithMonthShortUTC = date =>
  dayToStringWithoutTime(date, formats.shortWithMonth2)

export const toDateWithMonthUTC = date =>
  dayToStringWithoutTime(date, formats.shortWithMonth)

export const toDateWithMonthDashesUTC = date =>
  dayToStringWithoutTime(date, formats.withDashes)

export const getDateStartOfDayFromUTC = date => {
  const dataWithoutTime = toDateWithMonthDashesUTC(date)

  return moment(dataWithoutTime, formats.withDashes).toDate()
}

export const getUTCTime = date => moment.utc(date)

export const getISOStringFromData = date => {
  const formatDate = dayToString(date, formats.withDashes)

  return getUTCTime(formatDate).toISOString()
}

export const getDiffToTodayUTC = date => {
  const momentDate = moment(date)
  const currentDate = moment.utc().startOf('day')

  return momentDate.diff(currentDate, 'days')
}
