import { fireEvent } from "@testing-library/dom"

type coords = {
  xOffset: number;
  yOffset: number;
}

type options = {
  to: coords,
  from: coords,
  steps?: number,
  duration?: number
}

function getElementCoords(element: HTMLElement, xOffset: number, yOffset: number) {
  const {left, top, width, height} = element.getBoundingClientRect()
  return {
    x: left + width * xOffset,
    y: top + height * yOffset,
  }
}

const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

export default async function drag(
  element: any,
  {to, from, steps = 20, duration = 500}: options,
) {
  const startCoords = getElementCoords(element, from.xOffset, from.yOffset)
  const endCoords = getElementCoords(element, to.xOffset, to.yOffset)


  const step = {
    x: Math.abs(startCoords.x - endCoords.x) / steps,
    y: (startCoords.y - endCoords.y) / steps,
  }

  const current = {
    clientX: startCoords.x,
    clientY: startCoords.y,
  }

  fireEvent.mouseEnter(element, current)
  fireEvent.mouseOver(element, current)
  fireEvent.mouseMove(element, current)
  fireEvent.mouseDown(element, current)
  for (let i = 0; i < steps; i++) {
    current.clientX += step.x
    current.clientY += step.y
    await sleep(duration / steps)
    fireEvent.mouseMove(element, current)
  }
  fireEvent.mouseUp(element, current)
}