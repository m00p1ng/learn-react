import React, { useEffect, useRef } from 'react';
import './App.css'

function GameCanvas() {
  const canvasRef = useRef(null)
  let canvas, canvasContext

  let ballX = 75
  let ballY = 75
  let ballSpeedX = 5
  let ballSpeedY = 7

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
  }, [])

  const updateMousePos = (e) => {
    const rect = canvas.getBoundingClientRect()
    const root = document.documentElement

    const mouseX = e.clientX - rect.left - root.scrollLeft
    paddleX = mouseX - PADDLE_WIDTH / 2
  }

  const updateAll = () => {
    moveAll()
    drawAll()
  }

  const ballReset = () => {
    ballX = canvas.width / 2
    ballY = canvas.height / 2
  }

  const moveAll = () => {
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

  const drawAll = () => {
    colorRect(0, 0, canvas.width, canvas.height, 'black')
    colorCircle(ballX, ballY, 10, 'white')
    colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS)
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
