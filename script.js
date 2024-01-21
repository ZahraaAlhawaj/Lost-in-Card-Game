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

//generate the cards with questions and answers
// if (Math.random() < 0.5) : what i should have
for (let i = 0; i < cards.length; i++) {
  if (i < cards.length / 2) {
    const qsnOneText = questionsAndAnswers[i].qsnOne
    const ansOneText = questionsAndAnswers[i].qsnOneAnswer
    qOne[i].innerText = qsnOneText
    aOne[i].innerText = ansOneText
    aOne[i].style.color = questionsAndAnswers[i].qsnOneColor
  } else {
    const ans = questionsAndAnswers[i - Math.ceil(cards.length / 2)].answer
    finalAnswer[i].innerText = ans
    finalAnswer[i].style.color =
      questionsAndAnswers[i - Math.ceil(cards.length / 2)].color
  }
}

//functions

//addEventListene

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', () => {
    console.log('clicked')
    count++
    //openCard(i)
    //startTime()
    //if(count == 3){  }
    //resetTime()
  })
}
