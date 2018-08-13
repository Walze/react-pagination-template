
export const wait = (ms: number) =>
  new Promise(res => setTimeout(res, ms))

export const loopDelay = (
  total: number,
  time: number,
  iterations: (index: number, total: number) => void
) =>
  new Promise(async res => {

    await wait(time)

    for (let i = 0; i < total; i++) {

      iterations(i, total)

      await wait(time)
    }

    res()
  })

export const getTransitionDelay = (el: Element) => {
  let durationString = getComputedStyle(el).transitionDuration

  if (!durationString)
    durationString = '0'

  const match = durationString.match(/(\d+.?\d+)(m?s)/) || '0'

  return Number(match[1] || 0) * 1000
}
