import React, { useEffect, useRef } from 'react';
import './App.css'

function GameCanvas() {
  const canvasRef = useRef(null)
  let canvas, canvasContext
  let mouseX, mouseY

  let ballX = 75
  let ballY = 75
  let ballSpeedX = 5
  let ballSpeedY = 7

  const BRICK_W = 80
  const BRICK_H = 20
  const BRICK_GAP = 2
  const BRICK_COLS = 10
  const BRICK_ROWS = 14
  let brickGrid = new Array(BRICK_COLS * BRICK_ROWS)

  const PADDLE_WIDTH = 100
  const PADDLE_THICKNESS = 10
  const PADDLE_DIST_FROM_EDGE = 60
  let paddleX = 400

  const framesPerSecond = 60
  useEffect(() => {
    canvas = canvasRef.current
    canvasContext = canvas.getContext('2d')
    setInterval(updateAll, 1000 / framesPerSecond)

    canvas.addEventListener('mousemove', updateMousePos)
    brickReset()
  }, [])

  const updateMousePos = (e) => {
    const rect = canvas.getBoundingClientRect()
    const root = document.documentElement

    mouseX = e.clientX - rect.left - root.scrollLeft
    mouseY = e.clientY - rect.top - root.scrollTop
    paddleX = mouseX - PADDLE_WIDTH / 2
  }

  const updateAll = () => {
    moveAll()
    drawAll()
  }

  const brickReset = () => {
    for (let i = 0; i < BRICK_COLS * BRICK_ROWS; i++) {
      brickGrid[i] = true
    }
  }

  const ballReset = () => {
    ballX = canvas.width / 2
    ballY = canvas.height / 2
  }

  const ballMove = () => {
    ballX += ballSpeedX
    ballY += ballSpeedY

    if (ballX < 0 || ballX > canvas.width) {
      ballSpeedX *= -1
    }
    if (ballY < 0) {
      ballSpeedY *= -1
    }
    if (ballY > canvas.height) {
      ballReset()
    }
  }

  const ballBrickHandling = () => {
    const ballBrickCol = Math.floor(ballX / BRICK_W)
    const ballBrickRow = Math.floor(ballY / BRICK_H)
    const brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow)
    colorText(`${ballBrickCol},${ballBrickRow}:${brickIndexUnderBall}`, mouseX, mouseY, 'yellow')

    if (
      ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
      ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
      if (brickGrid[brickIndexUnderBall]) {
        brickGrid[brickIndexUnderBall] = false
        ballSpeedY *= -1
      }
    }
  }

  const ballPaddleHandling = () => {
    let paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE
    let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS
    let paddleLeftEdgeX = paddleX
    let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH

    if (
      ballY > paddleTopEdgeY &&
      ballY < paddleBottomEdgeY &&
      ballX > paddleLeftEdgeX &&
      ballX < paddleRightEdgeX) {
      ballSpeedY *= -1
      let centerOfPaddleX = paddleX + PADDLE_WIDTH / 2
      let ballDistFromPaddleCenterX = ballX - centerOfPaddleX
      ballSpeedX = ballDistFromPaddleCenterX * 0.35
    }
  }

  const moveAll = () => {
    ballMove()
    ballBrickHandling()
    ballPaddleHandling()
  }

  const rowColToArrayIndex = (col, row) => {
    return col + BRICK_COLS * row
  }

  const drawBricks = () => {
    for (let eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
      for (let eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
        const arrayIndex = rowColToArrayIndex(eachCol, eachRow)
        if (brickGrid[arrayIndex]) {
          colorRect(BRICK_W * eachCol, BRICK_H * eachRow, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue')
        }
      }
    }
  }

  const drawAll = () => {
    colorRect(0, 0, canvas.width, canvas.height, 'black')
    colorCircle(ballX, ballY, 10, 'white')
    colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS)
    drawBricks()
  }

  const colorRect = (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) => {
    canvasContext.fillStyle = fillColor
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
  }

  const colorCircle = (centerX, centerY, radius, fillColor) => {
    canvasContext.fillStyle = fillColor
    canvasContext.beginPath()
    canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    canvasContext.fill()
  }

  const colorText = (showWords, textX, textY, fillColor) => {
    canvasContext.fillStyle = fillColor
    canvasContext.fillText(showWords, textX, textY)
  }

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
    />
  )
}

function App() {
  return (
    <GameCanvas />
  )
}

export default App;
