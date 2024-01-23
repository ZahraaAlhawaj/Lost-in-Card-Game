let gameTime = 60
let count = 0
let countOpenCard = 0
let score = 0
let startTimer = false
let timer
let gameOver = false

const qOne = document.querySelectorAll('.qOne')
const aOne = document.querySelectorAll('.aOne')

const qTwo = document.querySelectorAll('.qTwo')
const aTwo = document.querySelectorAll('.aTwo')

const finalAnswer = document.querySelectorAll('.ansOne')
const cards = document.querySelectorAll('.cards')
const cardsText = document.querySelectorAll('.text')

const scoreDisplay = document.querySelector('#score')
const level = document.querySelector('#level')
const time = document.querySelector('#time')
const gameStatus = document.querySelector('#gameStatus')
const gameStatusWin = document.querySelector('#gameStatusWin')
const again = document.querySelector('.again')

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

let questionCount = 0
let answerCount = 0

for (let i = 0; i < cards.length; i++) {
  if (Math.random() < 0.5 && questionCount < 8) {
    //question
    const qsnOneText = questionsAndAnswers[questionCount].qsnOne
    const ansOneText = questionsAndAnswers[questionCount].qsnOneAnswer
    qOne[i].innerText = qsnOneText
    aOne[i].innerText = ansOneText
    aOne[i].style.color = questionsAndAnswers[questionCount].qsnOneColor

    qTwo[i].innerText = '-' + questionsAndAnswers[questionCount].qsnTwo
    aTwo[i].innerText = questionsAndAnswers[questionCount].qsnTwoAnswer
    aTwo[i].style.color = questionsAndAnswers[questionCount].qsnTwoColor
    questionCount++
  } else if (answerCount < 8) {
    //answer
    const ans = questionsAndAnswers[answerCount].answer
    finalAnswer[i].innerText = ans
    finalAnswer[i].style.color = questionsAndAnswers[answerCount].color
    answerCount++
  } else {
    if (questionCount < 8) {
      const qsnOneText = questionsAndAnswers[questionCount].qsnOne
      const ansOneText = questionsAndAnswers[questionCount].qsnOneAnswer
      qOne[i].innerText = qsnOneText
      aOne[i].innerText = ansOneText
      aOne[i].style.color = questionsAndAnswers[questionCount].qsnOneColor

      qTwo[i].innerText = '-' + questionsAndAnswers[questionCount].qsnTwo
      aTwo[i].innerText = questionsAndAnswers[questionCount].qsnTwoAnswer
      aTwo[i].style.color = questionsAndAnswers[questionCount].qsnTwoColor

      questionCount++
    } else {
      const ans = questionsAndAnswers[answerCount].answer
      finalAnswer[i].innerText = ans
      finalAnswer[i].style.color = questionsAndAnswers[answerCount].color
      answerCount++
    }
  }
}

//functions

let opencards = []
let openCardStyle = []
let openQCardStyle = []
let openACardStyle = []
let matchingCards = []
let colorOfLastWord = ''
let lastWordQOne
let lastWordQTwo
let answerStyle

const closeCard = (i) => {
  //for (let i = 0; i < cards.length; i++) {
  cards[i].classList.remove('open')
  console.log('count', countOpenCard)
  opencards = []
  //openCardStyle = []
  matchingCards = []
  openACardStyle = []
  openQCardStyle = []
  //}
  countOpenCard = 0
}

const openCard = (i) => {
  cards[i].classList.add('open')
  if (countOpenCard === 2) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove('open')
      console.log('count', countOpenCard)
      opencards = []
      //openCardStyle = []
      // i have do
      openACardStyle = []
      openQCardStyle = []

      matchingCards = []
    }
    countOpenCard = 0
  } else {
    countOpenCard++
    opencards.push(cards[i].innerText)
    matchingCards.push(cards[i])

    //the qsns
    //it is for question
    if (cards[i].innerText.length > 10) {
      const questionsArray = cards[i].innerText.split('-')

      if (questionsArray.length == 2) {
        const questionOne = questionsArray[0]
        const questionTwo = questionsArray[1]

        const wordOne = questionOne.split(' ')
        lastWordQOne = wordOne[wordOne.length - 2]

        const wordTwo = questionTwo.split(' ')
        lastWordQTwo = wordTwo[wordTwo.length - 1]
      }

      //to find the color of last word in first question:
      if (lastWordQOne === aOne[i].innerText) {
        openQCardStyle.push(aOne[i].style.color)
      }

      if (lastWordQTwo === aTwo[i].innerText) {
        openQCardStyle.push(aTwo[i].style.color)
      }

      console.log('style of Q1&Q2', openQCardStyle)
    }

    //it is for answer
    else {
      const cardAnswer = cards[i].innerText

      //to find the color of the card answer'

      if (
        cardAnswer.replace(/\s/, '') ===
        finalAnswer[i].innerText.replace(/\s/, '')
      ) {
        openACardStyle.push(finalAnswer[i].style.color)
      }
    }

    if (
      (opencards.length == 2 &&
        openQCardStyle.length == 2 &&
        openACardStyle.length == 1,
      matchingCards.length == 2)
    ) {
      matching(opencards, openQCardStyle, openACardStyle, matchingCards)
    }
  }
}

const matching = (opencards, openQCardStyle, openACardStyle, matchingCards) => {
  for (let i = 0; i < questionsAndAnswers.length; i++) {
    if (
      (opencards[0] ===
        questionsAndAnswers[i].qsnOne +
          questionsAndAnswers[i].qsnOneAnswer +
          ' -' +
          questionsAndAnswers[i].qsnTwo +
          questionsAndAnswers[i].qsnTwoAnswer &&
        openQCardStyle[0] === questionsAndAnswers[i].qsnOneColor &&
        openQCardStyle[1] === questionsAndAnswers[i].qsnTwoColor &&
        opencards[1].replace(/\s/, '') === questionsAndAnswers[i].answer &&
        openACardStyle[0] === questionsAndAnswers[i].color) ||
      (opencards[0] === questionsAndAnswers[i].answer &&
        openACardStyle[0] === questionsAndAnswers[i].color &&
        opencards[1] ===
          questionsAndAnswers[i].qsnOne +
            questionsAndAnswers[i].qsnOneAnswer +
            ' -' +
            questionsAndAnswers[i].qsnTwo +
            questionsAndAnswers[i].qsnTwoAnswer &&
        openQCardStyle[0] === questionsAndAnswers[i].qsnOneColor &&
        openQCardStyle[1] === questionsAndAnswers[i].qsnTwoColor)
    ) {
      console.log('pleaseeeeeeeeeeeeeeeeeeeeeeeeeee')

      console.log('great match')
      score += 10
      scoreDisplay.innerText = score

      setTimeout(removeCards, 1000)

      opencards = []
      //openCardStyle = []
      openACardStyle = []
      openQCardStyle = []
      matchingCards = []

      //here the time should return to 60 sec
      gameTime = 60
      time.innerText = gameTime
      clearInterval(timer)
      startTimer = false
      startTime()
    } else {
      console.log('does not match')
    }
  }
}

let numberMatchCards = 0

const removeCards = () => {
  matchingCards[0].remove()
  matchingCards[1].remove()
  numberMatchCards++
  if (numberMatchCards == 8) {
    console.log('hello, 8 matches found')
    clearInterval(timer)
    gameStatusWin.style.display = 'block'
  }
}

const startTime = () => {
  if (startTimer == false) {
    timer = setInterval(countdown, 1000)
    startTimer = true
  } else {
    console.log('already timer is start')
  }
}

const countdown = () => {
  if (gameTime == 0) {
    time.innerText = gameTime
    console.log('Game over')
    clearInterval(timer)
    gameStatus.style.display = 'block'
    gameOver = true
  } else {
    time.innerText = gameTime
    gameTime--
  }
}

//addEventListener

/* for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('mouseover', () => {
    cards[i].style.backgroundColor = 'black'
  })
}

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('mouseout', () => {
    cards[i].style.backgroundColor = '#2e3d49'
  })
} */

let clicked = false
let clickedArray = Array(16).fill(false)
let clickedTrueCount = 0

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', () => {
    count++
    if (gameOver) {
      return
    }

    startTime()
    if (clickedArray[i] == true) {
      clickedArray[i] = false
      closeCard(i)
    } else {
      for (let j = 0; j < clickedArray.length; j++) {
        if (clickedArray[j] == true) {
          clickedTrueCount++
        }
      }

      if (clickedTrueCount == 3 || clickedTrueCount > 3) {
        for (let k = 0; k < cards.length; k++) {
          closeCard(k)
          clickedArray[k] = false
        }
        clickedTrueCount = 0
      } else {
        clickedArray[i] = true
        openCard(i)
      }
    }
  })
}
