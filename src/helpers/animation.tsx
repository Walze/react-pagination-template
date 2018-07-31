
function wait(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}

export function loopDelay(total: number, time: number, iterations: (index: number, total: number) => any) {
  return new Promise(async res => {

    await wait(time)

    for (let i = 0; i < total; i++) {

      iterations(i, total)

      await wait(time)
    }

    res()
  })
}

export function getTransitionDelay(el: Element) {
  return Number(getComputedStyle(el).transitionDuration!.match(/(.+)s/)![1]) * 1000
}
