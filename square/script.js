document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  let pointA = { x: 0, y: 0 }
  let pointB = { x: 0, y: 0 }
  let pointC = { x: 0, y: 0 }
  let pointD = { x: 0, y: 0 }
  let drawing = false

  canvas.addEventListener('mousedown', function (e) {
    drawing = true
    pointA = getMousePosition(canvas, e)
  })

  canvas.addEventListener('mouseup', function (e) {
    if (drawing) {
      pointB = getMousePosition(canvas, e)
      drawSquare()
      drawVertices()
      drawDiagonal()
      showCoordinates()
      drawing = false
    }
  })

  canvas.addEventListener('mousemove', function (e) {
    if (drawing) {
      pointB = getMousePosition(canvas, e)
      calculatePointsCandD()
      drawSquare()
      drawVertices()
      drawDiagonal()
    }
  })

  function calculatePointsCandD() {
    // Calcular el vector AB
    const vectorAB = { x: pointB.x - pointA.x, y: pointB.y - pointA.y }

    // Calcular el vector CD (rotando el vector AB 90 grados en sentido antihorario)
    const vectorCD = { x: -vectorAB.y, y: vectorAB.x }
  }

  function drawSquare() {
    const width = pointB.x - pointA.x
    const height = pointB.y - pointA.y

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'blue' // Establecer el color de trazo a azul
    ctx.strokeRect(pointA.x, pointA.y, width, height)
  }

  function drawDiagonal() {
    ctx.strokeStyle = 'purple'
    ctx.beginPath()
    ctx.moveTo(pointA.x, pointA.y)
    ctx.lineTo(pointB.x, pointB.y)
    ctx.stroke()
  }

  function showCoordinates() {
    ctx.fillStyle = 'black'
    ctx.font = '14px Arial'

    const textA = `A(${pointA.x}, ${pointA.y})`
    const textB = `B(${pointB.x}, ${pointB.y})`

    // Calcular las coordenadas de los puntos C y D
    const pointC = { x: pointA.x, y: pointB.y }
    const pointD = { x: pointB.x, y: pointA.y }
    const textC = `C(${pointC.x}, ${pointC.y})`
    const textD = `D(${pointD.x}, ${pointD.y})`

    ctx.fillText(textA, pointA.x, pointA.y - 5)
    ctx.fillText(textB, pointB.x, pointB.y - 5)
    ctx.fillText(textC, pointC.x, pointC.y - 5)
    ctx.fillText(textD, pointD.x, pointD.y - 5)

    const deltaY = pointB.y - pointA.y
    const deltaX = pointB.x - pointA.x
    const textDeltaY = `Δy = ${deltaY}`
    const textDeltaX = `Δx = ${deltaX}`
    ctx.fillText(
      textDeltaY,
      (pointA.x + pointB.x) / 2,
      (pointA.y + pointB.y) / 2 - 30
    )
    ctx.fillText(
      textDeltaX,
      (pointA.x + pointB.x) / 2,
      (pointA.y + pointB.y) / 2 - 15
    )
  }

  function drawVertices() {
    const radius = 5
    ctx.fillStyle = 'red'

    drawVertex(pointA, radius)
    drawVertex(pointB, radius)

    // Calcular las coordenadas de los puntos C y D
    const pointC = { x: pointA.x, y: pointB.y }
    const pointD = { x: pointB.x, y: pointA.y }

    drawVertex(pointC, radius) // Punto C
    drawVertex(pointD, radius) // Punto D
  }

  function drawVertex(point, radius) {
    ctx.beginPath()
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }
})
