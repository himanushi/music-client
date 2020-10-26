import Cookies, { CookieAttributes } from 'js-cookie'

// とにかくセキュアなクッキー
class SecureCookies {
  secureObject: CookieAttributes

  constructor() {
    if(window.location.protocol === "https:") {
      this.secureObject = { secure: true }
    } else {
      this.secureObject = {}
    }
    this.secureObject = { ...this.secureObject, sameSite: 'strict' }
  }

  set(name: string, value: string, options?: CookieAttributes) {
    return Cookies.set(name, value, { ...this.secureObject, ...options })
  }

  get(name: string) {
    return Cookies.get(name)
  }

  remove(name: string, options?: CookieAttributes) {
    return Cookies.remove(name, options)
  }
}

export default SecureCookies
