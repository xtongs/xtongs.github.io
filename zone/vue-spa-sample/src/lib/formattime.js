import moment from 'moment'

export const datetime = (timestamp) => {
  return timestamp ? moment.unix(timestamp / 1000).format('YYYY-MM-DD HH:mm:ss') : ''
}

export const cardtime = (timestamp) => {
  return timestamp ? moment.unix(timestamp / 1000).format('YYYY/MM/DD') : ''
}

export const datetimenosecond = (timestamp) => {
  return timestamp ? moment.unix(timestamp / 1000).format('YYYY-MM-DD HH:mm') : ''
}

export const date = (timestamp) => {
  return timestamp ? moment.unix(timestamp / 1000).format('YYYY-MM-DD') : ''
}

export const noLineDate = (timestamp) => {
  return timestamp ? moment.unix(timestamp / 1000).format('YYYYMMDD') : ''
}

export const time = (timestamp) => {
  return timestamp ? moment.unix(timestamp / 1000).format('HH:mm') : ''
}

export const chartdatetime = (timestamp) => {
  return timestamp ? moment.unix(timestamp / 1000).format('YYYY-MM-DD') : ''
}

export const hhmmss = (millisecond = 0) => {
  return moment().startOf('year').month(0).date(0).hours(0).minutes(0).seconds(0).milliseconds(millisecond).format('HH:mm:ss')
}

export const hhmmssS = (second = 0) => {
  return moment().startOf('year').month(0).date(0).hours(0).minutes(0).seconds(second).format('HH:mm:ss')
}

export const hhmmssSS = (millisecond = 0) => {
  return moment().startOf('year').month(0).date(0).hours(0).minutes(0).seconds(0).milliseconds(millisecond).format('HH:mm:ss.SSS')
}
