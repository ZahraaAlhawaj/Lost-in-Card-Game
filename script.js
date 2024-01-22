let gameTime = 120
let count = 0
let countOpenCard = 0
let score = 0
let startTimer = false
let timer
let gameOver = false

const qOne = document.querySelectorAll('.qOne')
const aOne = document.querySelectorAll('.aOne')
const finalAnswer = document.querySelectorAll('.ansOne')
const cards = document.querySelectorAll('.cards')
const cardsText = document.querySelectorAll('.text')

const scoreDisplay = document.querySelector('#score')
const level = document.querySelector('#level')
const time = document.querySelector('#time')
//const cardOverlay = document.querySelector('.overlay')
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
      questionCount++
    } else {
      const ans = questionsAndAnswers[answerCount].answer
      finalAnswer[i].innerText = ans
      finalAnswer[i].style.color = questionsAndAnswers[answerCount].color
      answerCount++
    }
  }
}

// if (Math.random() < 0.5) : what i should have
//if (i < cards.length / 2) : previous condition
/* for (let i = 0; i < cards.length; i++) {
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
} */

//functions

let opencards = []
let openCardStyle = []
let matchingCards = []
let colorOfLastWord = ''

const closeCard = (i) => {
  //for (let i = 0; i < cards.length; i++) {
  cards[i].classList.remove('open')
  console.log('count', countOpenCard)
  opencards = []
  openCardStyle = []
  matchingCards = []
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

      //here the time should return to 120 sec
      gameTime = 120
      time.innerText = gameTime
      clearInterval(timer)
      startTimer = false
      startTime()
      //cards[i].style.opacity = 0
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

//create function to check if all cards removed or not
const checkExistCards = () => {}

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
}
 */
let clicked = false
let clickedArray = Array(16).fill(false)
let clickedTrueCount = 0
console.log('clickedArray:', clickedArray)

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', () => {
    count++
    if (gameOver) {
      return
    }

    startTime()
    //clicked = true
    console.log('before if:', clicked)
    // if (i || i == 0) {
    console.log('after if:', clicked)
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
        console.log('true count is: ', clickedTrueCount)
        clickedArray[i] = true
        openCard(i)
      }

      console.log('please', clickedArray[i])
      // }
      console.log('clicked array after:', clickedArray)
    }
  })
}
