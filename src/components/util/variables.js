/** base */

// themes
const themes = ['', 'light', 'dark']
// color
const baseColors = ['', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white']
const background = [...baseColors, 'transparent']
const textColor = [...baseColors, 'body', 'muted', 'black-50', 'white-50']
// size
const size = ['', 'lg', 'sm']
// set
const setX = ['start', 'end', 'center']
const setY = ['up', 'down']
const set = ['', ...setX, ...setY]
const popperSet = [
  'auto', 'auto-start', 'auto-end',
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'right', 'right-start', 'right-end',
  'left', 'left-start', 'left-end',
]
// position
const positionST = ['top-start', 'top-end']
const positionSB = ['bottom-start', 'bottom-end']
const positionCT = ['top-center']
const positionCB = ['bottom-center']
const positionSM = ['middle-start']
const positionCM = ['middle-center']
const positionEM = ['middle-end']
const positionT = [...positionST, ...positionCT]
const positionM = [...positionSM, ...positionEM, ...positionCM,]
const positionB = [...positionSB, ...positionCB]
const positionS = [...positionST, ...positionSB]
const positionC = [...positionCT, ...positionCB]
const position = [...positionT, ...positionB]
const placement = [...positionT, ...positionM, ...positionB]
// border
const borders = ['border', ...[set.map(e => `border-${e}`)]]
const border0 = borders.map(e => `${e}-0`)
const borderColor = baseColors.map(e => `border-${e}`)
const borderRadius = ['rounded', 'rounded-circle', 'rounded-pill', 'rounded-0', ...[set.map(e => `rounded-${e}`)]]
const borderRadiusSize = size.map(e => `rounded-${e}`)
// justify
const justify = ['', 'start', 'center', 'end', 'between', 'around', 'evenly']
// status
const baseStatus = ['', 'default', "success", "warning", "error", "danger"]
const messageStatus = [ "system", "info", "issue", ...baseStatus ]
const methodStatus = [ ...baseStatus ]

export default {
  base: {
    themes: themes,
    color: {
      base: baseColors,
      bg: background,
      text: textColor,
    },
    size: size,
    set: {
      default: set,
      x: setX,
      y: setY,
      popperSet: popperSet,
    },
    position: {
      default: position,
      sidetop: positionST,
      sidebotton: positionSB,
      centertop: positionCT,
      centerbottom: positionCB,
      top: positionT,
      bottom: positionB,
      side: positionS,
      center: positionC,
      placement: placement,
    },
    border: {
      set: borders,
      border0: border0,
      color: borderColor,
      radius: borderRadius,
      rediussize: borderRadiusSize,
    },
    justify: justify,
    status: {
      base: baseStatus,
      message: messageStatus,
      method: methodStatus,
    },
  },
}
