'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var palette = exports.palette = {
  happy: '#DDBF00',
  sad: '#296ab1',
  angry: '#b8312f',
  loving: '#F07D7D',
  neutral: '#8F928B'
};

String.prototype.contains = function (regex) {
  return regex.test(this);
};

function combine(wordArr) {
  return new RegExp(wordArr.join('|'), 'i');
}

var happyPhrases = combine(['haha', 'lol', 'rofl', 'funny', 'hehe', 'good', 'great', 'happy', 'omg', 'yay', 'yes la', 'wonderful', 'amazing', 'optimistic', 'glee', 'joy', 'glad', 'thankful', 'thanks', 'thnks', 'xiexie', 'ty', 'tyvm', 'delight', 'terrific', 'excellent', 'wow', 'shiok', 'sia la', 'lucky', 'pleasant', 'fortunate', 'cheerful', 'cheer', 'joyful', 'nice', 'super', 'neat', 'marvelous', 'positive', 'ace', 'splendid', 'admirable', 'well done', 'lmao', 'omfg', 'fun', 'grateful', 'jovial', 'merry', 'overjoyed', 'smiley', 'smile', 'sunny', 'well', 'alright', 'jolly', 'upbeat', 'hope', 'hopeful', 'luck', 'mirthful', 'hysterical', 'grin', 'bliss', 'relax', 'celebrate', 'laugh', 'thrill']);

var sadPhrases = combine(['sian', 'zz', 'sigh', 'hard', 'sux', 'suck', 'sucks', 'meh', 'jialat', 'shag', 'upset', 'sad', 'worry', 'woe', 'sorrow', 'discourage', 'discouraging', 'displeasure', 'dissatisfied', 'gloom', 'gloomy', 'misery', 'miserable', 'grief', 'dispair', 'low', 'down', 'pessimistic', 'heartbroken', 'bitter', 'glum', 'sorry', 'trouble', 'troubled', 'hurt', 'hurts', 'hurting', 'pain', 'painful', 'dejected', 'heavyhearted', 'sadden', 'saddening', 'embarassed', 'paiseh', 'lonely', 'cry', 'shame', 'shameful', 'ashamed', 'hai', 'hais', 'haix', 'anxious', 'moody', 'awful', 'lost', 'stress', 'stressed', 'numb', 'alone', 'overwhelmed', 'fool', 'horrible', 'horrid', 'uneasy', 'weak', 'sick', 'worthless', 'torn', 'teary', 'depressed', 'useless', 'unwanted', 'unappreciated']);

var angryPhrases = combine(['oi', 'wtf', 'fk', 'effing', 'shit', 'fuck', 'fucker', 'cheebye', 'kuku', 'lanjiao', 'lanpa', 'lanpah', 'lanpaji', 'knn', 'kaopeh', 'cb', 'bloody', 'hell', 'bitch', 'dumbass', 'fucked', 'stfu', 'fo', 'fy', 'bitches', 'asshole', 'goddamn', 'haters', 'cunt', 'dumb', 'fml', 'lmfao', 'niggas', 'twat', 'retard', 'retarded', 'fuk', 'hoes', 'bullshit', 'dammed', 'faggot', 'douche', 'douchebag', 'cocksucker', 'dickhead', 'dick', 'dickface', 'shithead', 'ass', 'hate', 'angry', 'pissed', 'pisses', 'piss', 'hate', 'dislike', 'crazy', 'idiot', 'stupid', 'hoot', 'basket', 'bastard', 'crap', 'kayu', 'kao', 'tsk', 'nabei', 'ccb', 'mutherfucker', 'motherfucker', 'cross', 'rage', 'furious', 'irritate', 'irritated', 'outraged', 'offend', 'offended', 'maddened', 'sulk', 'fiery', 'angry', 'heated', 'temper', 'annoyed', 'annoying', 'enraged', 'fume', 'fuming', 'displeased', 'disappointed', 'frustrated', 'frustration']);

var lovingPhrases = combine(['love', 'darling', 'like', 'luv', 'best', 'baby', 'lust', 'affection', 'feelings', 'attached', 'passion', 'fond', 'fondness', 'enjoy', 'bb', 'kiss', 'trust', 'lover', 'fallen', 'addicted', 'crush', 'sweet', 'sunshine', 'devoted', 'hooked', 'soft spot', 'affectionate', 'care', 'steady', 'sweetheart', 'commited', 'appreciate', 'adore', 'missed', 'miss', 'sacrifice', 'support', 'heart', 'infatuated', 'yearn', 'angel', 'dear', 'deary', 'treasure', 'precious', 'desire', 'cherish', 'blessing', 'aww', 'lovely', 'dovey', 'attractive', 'charm', 'charming']);

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