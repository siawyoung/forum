const palette = {
  happy: '#DDBF00',
  sad: '#8F928B',
  angry: '#b8312f',
  loving: '#F07D7D',
  neutral: '#296ab1',
}

String.prototype.contains = function (regex) {
  return regex.test(this)
}

function combine(wordArr) {
  return new RegExp(wordArr.join('|'), 'i')
}

const happyPhrases = combine([
  'haha',
  'lol',
  'rofl',
  'funny',
  'hehe',
])

const sadPhrases = combine([
  'sian',
  'sucks',
  'zz',
  'sigh',
])

const angryPhrases = combine([
  'oi',
  'wtf',
  'fk',
  'shit',
])

const lovingPhrases = combine([
  'love',
  'darling',
  'like',
  'luv',
])


export const calculateColorOfMessage = (msg) => {
  if (msg.contains(happyPhrases)) {
    return palette.happy
  }

  if (msg.contains(sadPhrases)) {
    return palette.sad
  }

  if (msg.contains(angryPhrases)) {
    return palette.angry
  }

  if (msg.contains(lovingPhrases)) {
    return palette.loving
  }

  return palette.neutral
}