'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var palette = {
  happy: '#DDBF00',
  sad: '#8F928B',
  angry: '#b8312f',
  loving: '#F07D7D',
  neutral: '#296ab1'
};

String.prototype.contains = function (regex) {
  return regex.test(this);
};

function combine(wordArr) {
  return new RegExp(wordArr.join('|'), 'i');
}

var happyPhrases = combine(['haha', 'lol', 'rofl', 'funny', 'hehe']);

var sadPhrases = combine(['sian', 'zz', 'sigh', 'hard', 'sux', 'suck']);

var angryPhrases = combine(['oi', 'wtf', 'fk', 'shit', 'fuck', 'ass', 'hate']);

var lovingPhrases = combine(['love', 'darling', 'like', 'luv', '<3', 'best']);

var calculateColorOfMessage = exports.calculateColorOfMessage = function calculateColorOfMessage(msg) {
  if (msg.contains(happyPhrases)) {
    return palette.happy;
  }

  if (msg.contains(sadPhrases)) {
    return palette.sad;
  }

  if (msg.contains(angryPhrases)) {
    return palette.angry;
  }

  if (msg.contains(lovingPhrases)) {
    return palette.loving;
  }

  return palette.neutral;
};