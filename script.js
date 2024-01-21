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

let opencards = []
let openCardStyle = []
let matchingCards = []
let colorOfLastWord = ''

const openCard = (i) => {
  cards[i].classList.add('open')
  console.log('openCard')
  if (countOpenCard === 2) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove('open')
      console.log('count', countOpenCard)
      opencards = []
      openCardStyle = []
      matchingCards = []
    }
    countOpenCard = 0
    console.log('coun open: ', countOpenCard)
  } else {
    countOpenCard++
    opencards.push(cards[i].innerText)
    matchingCards.push(cards[i])

    //to find the last word
    const cardText = cards[i].innerText
    const words = cardText.split(' ')
    const lastWord = words[words.length - 1]
    console.log('last word: ', lastWord)

    console.log('please: ', aOne[i].style.color) //it will find for me for question
    console.log('please number 2 for answer: ', finalAnswer[i].style.color)

    //to find the color of last word

    if (lastWord === aOne[i].innerText) {
      console.log('same: ', aOne[i].innerText)
      openCardStyle.push(aOne[i].style.color) //the color of Q
    }
    if (lastWord === finalAnswer[i].innerText) {
      openCardStyle.push(finalAnswer[i].style.color)
    }

    console.log('style: ', openCardStyle)

    console.log('details of card: ', opencards)
    if (
      opencards.length == 2 &&
      openCardStyle.length == 2 &&
      matchingCards.length == 2
    ) {
      matching(opencards, openCardStyle, matchingCards)
    }
  }
  //cards[i].classList.toggle('flipCard')
}

const matching = (opencards, openCardStyle, matchingCards) => {
  //console.log('access')
  //console.log('accesses cards details', opencards)
  /* console.log('access card style details:', openCardStyle)
  console.log('matching cards here: ', matchingCards) */

  for (let i = 0; i < questionsAndAnswers.length; i++) {
    if (
      (openCardStyle[0] === questionsAndAnswers[i].qsnOneColor ||
        openCardStyle[0] === questionsAndAnswers[i].color) &&
      (opencards[0] ===
        questionsAndAnswers[i].qsnOne + questionsAndAnswers[i].qsnOneAnswer ||
        opencards[0] === questionsAndAnswers[i].answer) &&
      (opencards[1] === questionsAndAnswers[i].answer ||
        opencards[1] ===
          questionsAndAnswers[i].qsnOne +
            questionsAndAnswers[i].qsnOneAnswer) &&
      (openCardStyle[1] === questionsAndAnswers[i].color ||
        openCardStyle[1] === questionsAndAnswers[i].qsnOneColor) &&
      opencards[0] !== opencards[1]
    ) {
      console.log('great match')
      score += 10
      scoreDisplay.innerText = score
      // bad solution
      //matchingCards[0].style.opacity = 0
      //matchingCards[1].style.opacity = 0

      setTimeout(removeCards, 1000)

      opencards = []
      openCardStyle = []
      matchingCards = []

      //here the time should return to 30 sec

      //cards[i].style.opacity = 0
    }
  }
}

//addEventListene

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', () => {
    console.log('clicked')
    count++
    openCard(i)
    //startTime()
    //if(count == 3){  }
    //resetTime()
  })
}
