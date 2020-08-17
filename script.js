"use strict"

const X = "x"
const O = "o"

const winningArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
]

const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMessage = document.getElementById("winning-message")
const restart = document.getElementById("restartButton")
const winningNotification = document.querySelector("[data-winning-message-text]")
let X_turn

restart.addEventListener("click", startGame)

startGame()

function startGame() {
  X_turn = true
  cellElements.forEach((cell) => {
    cell.classList.remove(X)
    cell.classList.remove(O)
    cell.removeEventListener("click", handleClick)
    cell.addEventListener("click", handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessage.classList.remove("show")
}

function handleClick(e) {
  const cell = e.target
  const currentClass = X_turn ? X : O
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
    console.log("Winner")
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningNotification.innerHTML = "Draw!😐"
  } else {
    winningNotification.innerText = `${X_turn ? "X's Wins!" : "O's Wins!"}😀`
  }
  winningMessage.classList.add("show")
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X) || cell.classList.contains(O)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  X_turn = !X_turn
}

function setBoardHoverClass() {
  board.classList.remove(X)
  board.classList.remove(O)
  if (X_turn) {
    board.classList.add(X)
  } else {
    board.classList.add(O)
  }
}

function checkWin(currentClass) {
  return winningArr.some((combinations) => {
    return combinations.every((index) => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
