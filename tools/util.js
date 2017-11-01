const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const testPath = 'http://119.23.22.113:80/api';
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
module.exports = {
  formatTime: formatTime,
}
