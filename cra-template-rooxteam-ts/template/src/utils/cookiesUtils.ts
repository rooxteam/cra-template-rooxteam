const decode = (value: string): string | null => {
  try {
    return decodeURIComponent(value)
  } catch (e) {
    return null
  }
}

export const getCookie = (name: string): string | null => {
  const arr = document.cookie.split('; ')
  for (let i = 0, l = arr.length; i < l; i += 1) {
    const item = arr[i].split('=')
    if (item.shift() === name) {
      return decode(item.join('='))
    }
  }
  return ''
}

export const setCookie = (key: string, value: string): void => {
  document.cookie = `${key}=${encodeURIComponent(value)};`
}
