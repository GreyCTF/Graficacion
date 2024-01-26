document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  const canvasDos = document.getElementById('canvasDos')
  const ctxDos = canvasDos.getContext('2d')
  let pointBresenham = []
  // Suponiendo que pointBresenham es un array ya definido con las coordenadas x, y

  function drawPointsOnCanvasDos() {
    ctxDos.clearRect(0, 0, canvasDos.width, canvasDos.height)
    ctxDos.fillStyle = 'blue' // Puedes cambiar el color según tus preferencias

    pointBresenham.forEach((point) => {
      ctxDos.beginPath()
      ctxDos.arc(point.x, point.y, 3, 0, 2 * Math.PI) // Utilizando un radio de 3, puedes ajustar según sea necesario
      ctxDos.fill()
    })
  }

  let pointA = { x: 0, y: 0 }
  let pointB = { x: 0, y: 0 }
  let x1, y1, x2, y2, dx, dy
  let drawing = false

  canvas.addEventListener('mousedown', function (e) {
    drawing = true
    pointA = getMousePosition(canvas, e)
  })

  canvas.addEventListener('mouseup', function (e) {
    if (drawing) {
      pointB = getMousePosition(canvas, e)
      drawVertices()
      drawDiagonal()
      showCoordinates()
      driverCode()
      // Llamas a esta función cuando quieras dibujar los puntos en canvasDos
      drawPointsOnCanvasDos()
      drawing = false

      pointBresenham.forEach((point) => {
        console.log(`x: ${point.x}, y: ${point.y}`)
      })
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
  }

  function drawSquare() {
    const width = pointB.x - pointA.x
    const height = pointB.y - pointA.y

    ctx.clearRect(0, 0, canvas.width, canvas.height)
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
    // Update global variables
    x1 = pointA.x
    y1 = pointA.y
    x2 = pointB.x
    y2 = pointB.y

    ctx.fillText(textA, pointA.x, pointA.y - 5)
    ctx.fillText(textB, pointB.x, pointB.y - 5)

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

  // Javascript program for Bresenhams Line Generation

  function plotPixel(x1, y1, x2, y2, dx, dy, decide) {
    // pk is initial decision making parameter
    // Note:x1&y1,x2&y2, dx&dy values are interchanged
    // and passed in plotPixel function so
    // it can handle both cases when m>1 & m<1
    let pk = 2 * dy - dx
    for (let i = 0; i <= dx; i++) {
      if (decide == 0) {
        // console.log(x1 + ',' + y1)
        storePoint(Math.ceil(x1), Math.ceil(y1))
      } else {
        // console.log(y1 + ',' + x1)
        storePoint(Math.ceil(y1), Math.ceil(x1))
      }

      // checking either to decrement or increment the
      // value if we have to plot from (0,100) to
      // (100,0)
      if (x1 < x2) x1++
      else x1--
      if (pk < 0) {
        // decision value will decide to plot
        // either x1 or y1 in x's position
        if (decide == 0) {
          pk = pk + 2 * dy
        } else pk = pk + 2 * dy
      } else {
        if (y1 < y2) y1++
        else y1--
        pk = pk + 2 * dy - 2 * dx
      }
    }
  }

  // Driver code
  function driverCode() {
    dx = Math.abs(x2 - x1)
    dy = Math.abs(y2 - y1)
    // If slope is less than one
    if (dx > dy) {
      // passing argument as 0 to plot(x,y)
      plotPixel(x1, y1, x2, y2, dx, dy, 0)
    }
    // if slope is greater than or equal to 1
    else {
      // passing argument as 1 to plot (y,x)
      plotPixel(y1, x1, y2, x2, dy, dx, 1)
    }

    console.log('dx and dy', dx, ' - ', dy)
  }

  function storePoint(x, y) {
    pointBresenham.push({ x, y })
  }

  // Ejemplo de uso de la función storePoint
  //   storePoint(0, 0)
  //   storePoint(1, 1)
  //   storePoint(2, 3)
  //   storePoint(2, 76)
  //   storePoint(2, 5)
})
