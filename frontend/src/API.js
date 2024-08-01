//NOTE this is a slimmed down version of API.js in spr

class API {
  baseURL = ''
  authHeaders = ''

  isDevMode() {
    return process.env?.NODE_ENV === 'development'
  }

  getAuthHeaders() {
    //dev or import from nodejs
    if (typeof process !== 'undefined') {
      const TOKEN = process.env.REACT_APP_TOKEN || process.env.SPR_API_TOKEN
      if (!TOKEN) {
        throw new Error('missing REACT_APP_TOKEN / SPR_API_TOKEN environment')
      }

      this.authHeaders = `Bearer ${TOKEN}`
      return this.authHeaders
    }

    if (typeof window !== 'undefined') {
      const { SPR_API_TOKEN } = window
      if (SPR_API_TOKEN) {
        this.authHeaders = `Bearer ${SPR_API_TOKEN}`

        return this.authHeaders
      }
    }

    //else get it from localStorage
    let login = localStorage.user
    let user = login ? JSON.parse(login) : null
    this.authHeaders = user?.authdata ? 'Basic ' + user.authdata : null

    return this.authHeaders
  }

  getApiURL() {
    if (typeof process !== 'undefined') {
      const API_URL = process.env.REACT_APP_API || process.env.SPR_API_URL
      if (!API_URL) {
        throw new Error('missing REACT_APP_API / SPR_API_URL environment')
      }

      return API_URL
    }

    if (typeof window !== 'undefined' && window.SPR_API_URL) {
      return window.SPR_API_URL
    }
  }

  async fetch(method = 'GET', url, body) {
    if (url === undefined) {
      url = method
      method = 'GET'
    }

    if (!this.authHeaders || this.isDevMode()) {
      this.authHeaders = this.getAuthHeaders()
    }

    let headers = {
      Authorization: this.authHeaders,
      'X-Requested-With': 'react',
      'Content-Type': 'application/json'
    }

    let opts = {
      method,
      headers
    }

    if (body) {
      opts.body = JSON.stringify(body)
    }

    let baseURL = this.getApiURL() + (this.baseURL || '')
    // get rid of //
    if (
      url[0] === '/' &&
      baseURL.length &&
      baseURL[baseURL.length - 1] === '/'
    ) {
      url = url.substr(1)
    }

    let _url = `${baseURL}${url}`
    return fetch(_url, opts)
  }

  async request(method, url, body) {
    let skipReturnValue = method === 'DELETE'

    return this.fetch(method, url, body).then((response) => {
      if (response.redirected) {
        window.location = '/auth/validate'
      }

      if (!response.ok) {
        return Promise.reject({
          message: response.status,
          status: response.status,
          response
        })
      }

      const contentType = response.headers.get('Content-Type')
      if (!contentType || skipReturnValue) {
        return Promise.resolve(true)
      }

      // weird behaviour from react-native
      if (contentType.includes('text/html')) {
        return response.json()
      }

      if (contentType.includes('application/json')) {
        return response.json()
      } else if (contentType.includes('text/plain')) {
        return response.text()
      }

      return Promise.reject({ message: 'unknown Content-Type' })
    })
  }

  get(url) {
    return this.request('GET', url)
  }

  put(url, data) {
    return this.request('PUT', url, data)
  }

  delete(url, data) {
    return this.request('DELETE', url, data)
  }
}

export default API
export const api = new API()
