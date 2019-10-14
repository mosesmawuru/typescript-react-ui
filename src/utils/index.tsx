import { Ref } from 'react'

export function genId(prefix: string) {
  return `${prefix}-${Math.random()
    .toString(32)
    .substr(2, 8)}`
}

export const makeId = (id: string, index: number) => `${id}:${index}`

export function assignRef<T>(ref: Ref<T>, value: T) {
  if (ref == null) return
  if (typeof ref === 'function') {
    ref(value)
  } else {
    try {
      ;(ref.current as any) = value
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`)
    }
  }
}

export function mergeRefs<T>(refs: Ref<T>[], value: T) {
  refs.forEach(ref => assignRef(ref, value))
}

const focusableElList = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'embed',
  'iframe',
  'input:not([disabled])',
  'object',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '*[tabindex]:not([aria-disabled])',
  '*[contenteditable]'
]

const focusableElSelector = focusableElList.join()

export function getFocusables(element: HTMLElement, keyboardOnly = false) {
  let focusableEls = Array.from(element.querySelectorAll(focusableElSelector))

  // filter out elements with display: none
  focusableEls = focusableEls.filter(focusableEl => window.getComputedStyle(focusableEl).display !== 'none')

  if (keyboardOnly === true) {
    focusableEls = focusableEls.filter(focusableEl => focusableEl.getAttribute('tabindex') !== '-1')
  }

  return focusableEls
}

/// Evaluate color in theme object

const colorKeyInTheme = (theme: any, color: string) => color in theme.colors

const colorHueValue = (theme: any, color: string) => {
  const hasDot = color.search('.') !== -1
  if (hasDot) {
    const [colorName, hue] = color.split('.')

    if (colorKeyInTheme(theme, colorName)) {
      return theme.colors[colorName][hue]
    }
  }
  return null
}

export const getColorInTheme = (theme: any, color: string) => {
  if (colorKeyInTheme(theme, color)) {
    return theme.colors[color][500]
  }

  if (colorHueValue(theme, color)) {
    return colorHueValue(theme, color)
  }

  return color
}
