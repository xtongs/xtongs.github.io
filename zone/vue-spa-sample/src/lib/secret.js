const DIGIT = 5
const LOWER = 7
const UPPER = 9

function p2c (code) {
  if (code >= '0'.charCodeAt() && code <= '9'.charCodeAt()) {
    return (code - '0'.charCodeAt() + DIGIT) % 10 + '0'.charCodeAt()
  } else if (code >= 'a'.charCodeAt() && code <= 'z'.charCodeAt()) {
    return (code - 'a'.charCodeAt() + LOWER) % 26 + 'a'.charCodeAt()
  } else if (code >= 'A'.charCodeAt() && code <= 'Z'.charCodeAt()) {
    return (code - 'A'.charCodeAt() + UPPER) % 26 + 'A'.charCodeAt()
  }
  return code
}

function c2p (code) {
  if (code >= '0'.charCodeAt() && code <= '9'.charCodeAt()) {
    return (code - '0'.charCodeAt() + 10 - DIGIT) % 10 + '0'.charCodeAt()
  } else if (code >= 'a'.charCodeAt() && code <= 'z'.charCodeAt()) {
    return (code - 'a'.charCodeAt() + 26 - LOWER) % 26 + 'a'.charCodeAt()
  } else if (code >= 'A'.charCodeAt() && code <= 'Z'.charCodeAt()) {
    return (code - 'A'.charCodeAt() + 26 - UPPER) % 26 + 'A'.charCodeAt()
  }
  return code
}

function swap (arr) {
  if (arr.length > 2) {
    let tmp = arr[0]
    arr[0] = arr[arr.length - 1]
    arr[arr.length - 1] = tmp
  }
  return arr
}

export default {
  enSecret (plainText) {
    if (plainText) {
      return swap(plainText.split('').map(c => p2c(c.charCodeAt())).reverse()).map(c => String.fromCharCode(c)).join('')
    } else {
      return null
    }
  },
  deSecret (cipherText) {
    if (cipherText) {
      return swap(cipherText.split('').map(c => c2p(c.charCodeAt())).reverse()).map(c => String.fromCharCode(c)).join('')
    } else {
      return null
    }
  }
}
