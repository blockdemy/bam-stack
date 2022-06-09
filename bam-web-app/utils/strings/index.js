export const snakeCaseToPlainText = str =>
  str ? str.replace(/_/g, ' ').toLowerCase() : ''

// eslint-disable-next-line no-useless-escape
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// eslint-disable-next-line no-useless-escape
const phoneNumberRegEx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

export const longerThan = reqLength => strValue => strValue.length > reqLength
export const shorterThan = reqLength => strValue => strValue.length < reqLength
export const isEmailValid = email =>
  emailRegEx.test(email) && shorterThan(256)(email)
export const isPhoneNumberValid = phoneNumber =>
  phoneNumberRegEx.test(phoneNumber) && longerThan(11)(phoneNumber)

export const toTitleCase = str => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
