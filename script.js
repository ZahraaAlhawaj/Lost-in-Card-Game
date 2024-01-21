let gameTime = 30
let count = 0
let countOpenCard = 0
let score = 0
let startTimer = false
let timer

const qOne = document.querySelectorAll('.qOne')
const aOne = document.querySelectorAll('.aOne')
const finalAnswer = document.querySelectorAll('.ansOne')
const cards = document.querySelectorAll('.cards')

const scoreDisplay = document.querySelector('#score')
const level = document.querySelector('#level')
const time = document.querySelector('#time')

const questionsAndAnswers = [
  {
    qsnOne: "The answer's color is equal to the text of: ",
    qsnTwo: "The answer's text is equal to the color of: ",
    qsnOneAnswer: 'red',
    qsnTwoAnswer: 'yellow',

    qsnOneColor: 'orange',
    qsnTwoColor: 'green',

    answer: 'green',
    color: 'red'
  },
  {
    qsnOne: "The answer's color is equal to the text of: ",
    qsnTwo: "The answer's text is equal to the color of: ",
    qsnOneAnswer: 'green',
    qsnTwoAnswer: 'red',

    qsnOneColor: 'red',
    qsnTwoColor: 'pink',

    answer: 'pink',
    color: 'green'
  },
  {
    qsnOne: "The answer's color is equal to the text of: ",
    qsnTwo: "The answer's text is equal to the color of: ",
    qsnOneAnswer: 'orange',
    qsnTwoAnswer: 'green',

    qsnOneColor: 'pink',
    qsnTwoColor: 'yellow',

    answer: 'yellow',
    color: 'orange'
  },
  {
    qsnOne: "The answer's color is equal to the text of: ",
    qsnTwo: "The answer's text is equal to the color of: ",
    qsnOneAnswer: 'red',
    qsnTwoAnswer: 'green',

    qsnOneColor: 'orange',
    qsnTwoColor: 'pink',

    answer: 'pink',
    color: 'red'
  },
  {
    qsnOne: "The answer's color is equal to the text of: ",
    qsnTwo: "The answer's text is equal to the color of: ",
    qsnOneAnswer: 'red',
    qsnTwoAnswer: 'orange',

    qsnOneColor: 'pink',
    qsnTwoColor: 'red',

    answer: 'red',
    color: 'red'
  },
  {
    qsnOne: "The answer's color is equal to the text of: ",
    qsnTwo: "The answer's text is equal to the color of: ",
    qsnOneAnswer: 'blue',
    qsnTwoAnswer: 'purple',

    qsnOneColor: 'yellow',
    qsnTwoColor: 'green',

    answer: 'green',
    color: 'blue'
  },
  {
    qsnOne: "The answer's color is equal to the text of: ",
    qsnTwo: "The answer's text is equal to the color of: ",
    qsnOneAnswer: 'green',
    qsnTwoAnswer: 'blue',

    qsnOneColor: 'orange',
    qsnTwoColor: 'red',

    answer: 'red',
    color: 'green'
  },
  {
    qsnOne: "The answer's color is equal to the text of: ",
    qsnTwo: "The answer's text is equal to the color of: ",
    qsnOneAnswer: 'purple',
    qsnTwoAnswer: 'red',

    qsnOneColor: 'yellow',
    qsnTwoColor: 'yellow',

    answer: 'yellow',
    color: 'purple'
  }
]
