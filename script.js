//global variable
let gameTime = 30
let countOpenCard = 0
let score = 0
let startTimer = false
let timer
let gameOver = false
let questionCount = 0
let answerCount = 0
let numberMatchCards = 0

let opencards = []
let openQCardStyle = []
let openACardStyle = []
let matchingCards = []
let lastWordQOne
let lastWordQTwo

let clickedArray = Array(16).fill(false)
let clickedTrueCount = 0

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
const gameStatusLost = document.querySelector('#gameStatusLost')
const gameStatusWin = document.querySelector('#gameStatusWin')

//Data
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

//display the data (questions and answers) in the card randomly
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

//reset array
const resetArray = () => {
  opencards = []
  matchingCards = []
  openACardStyle = []
  openQCardStyle = []
}
//close card function
const closeCard = (i) => {
  cards[i].classList.remove('open')
  cards[i].style.backgroundColor = '#9a073c'
  resetArray()
  countOpenCard = 0
  clickedTrueCount = 0
}

//open card function
/**
 * first it will check if there are more than 2 opened cards then it will close all cards
 * second if there is only 2 opened cards, then it will pass to matching function to check if there are match or not
 */
const openCard = (i) => {
  cards[i].classList.remove('open')
  cards[i].classList.add('open')

  if (countOpenCard === 2) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove('open')
      cards[i].style.backgroundColor = '#9a073c'
      resetArray()
      //not sure
      clickedArray[i] = false
    }
    countOpenCard = 0
  } else {
    countOpenCard++
    opencards.push(cards[i].innerText)
    matchingCards.push(cards[i])

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

//matching function that will check if the 2 cards matched or not
/**
 * if the 2 cards matches then, they will remove and the score will increase and time will return to 30sec
 * if not matches then, then all cards will closed
 */
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
      (opencards[0].replace(/\s/, '') === questionsAndAnswers[i].answer &&
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
      score += 10
      scoreDisplay.innerText = score

      setTimeout(removeCards, 500)

      countOpenCard = 0

      //here the time should return to 30 sec
      gameTime = 30
      time.innerText = gameTime
      clearInterval(timer)
      startTimer = false
      startTime()
    } else {
      setTimeout(() => {
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.remove('open')
          cards[i].style.backgroundColor = '#9a073c'
          resetArray()
          clickedArray[i] = false
          clickedTrueCount = 0
        }
        countOpenCard = 0
      }, 800)
    }
  }
}

//remove cards function. It will remove the cards if 2 cards matches and when all cards removed will show winner display
const removeCards = () => {
  matchingCards[0].remove()
  matchingCards[1].remove()
  numberMatchCards++
  clickedTrueCount = 0
  for (let i = 0; i < clickedArray.length; i++) {
    clickedArray[i] = false
  }
  resetArray()

  if (numberMatchCards == 8) {
    clearInterval(timer)
    gameStatusWin.style.display = 'flex'
  }
}

//start time function
const startTime = () => {
  if (startTimer == false) {
    timer = setInterval(countdown, 1000)
    startTimer = true
  }
}

//countdown function. It will decrease the time and it will check if the time reach 0, it will display loser display
const countdown = () => {
  if (gameTime == 0) {
    time.innerText = gameTime
    clearInterval(timer)
    gameStatusLost.style.display = 'flex'
    gameOver = true
  } else {
    time.innerText = gameTime
    gameTime--
  }
}

//addEventListener

//click event listener will listen for clicking on the card
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', () => {
    cards[i].style.backgroundColor = '#f9ecec'

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
      if (clickedTrueCount >= 3) {
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

//mouseover event listener. When the mouse hover any card it will change its background color
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('mouseover', function () {
    if (!cards[i].classList.contains('open')) {
      this.style.backgroundColor = '#540422'
    }
  })

  //mouseout event listener. When the mouse out of any card it will change its background color
  cards[i].addEventListener('mouseout', function () {
    if (!cards[i].classList.contains('open')) {
      this.style.backgroundColor = '#9a073c'
    }
  })
}
