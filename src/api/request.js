import basicPromise from '../utils/BasicPromise'
import fetch from 'isomorphic-unfetch'

function TimeoutError (message) {
  this.name = 'ERR_TIMEOUT'
  this.message = message
  this.stack = (new Error()).stack
}

class Request {
  get (url, requiresAuth = false) {
    return this._fetch(url, { method: 'GET', requiresAuth })
  }

  post (url, body = {}, requiresAuth = false) {
    return this._fetch(url, { method: 'POST', body, requiresAuth })
  }

  delete (url, body, requiresAuth = false) {
    return this._fetch(url, { method: 'DELETE', body, requiresAuth })
  }

  put (url, body, requiresAuth = false) {
    return this._fetch(url, { method: 'PUT', body, requiresAuth })
  }

  _parseLinks (headers) {
    let linksObject = {}
    let links = headers && headers.get('link')
    if (links) {
      links.split(', ').forEach((l) => {
        let link = l.split('; ')
        linksObject[link[1].replace('rel="', '').replace('"', '')] = link[0].replace(/[<>]/gi, '')
      })
      return linksObject
    }
    return null
  }


  async parseResponse (response) {
    try {
      let contentType = response.headers.get('Content-Type')
      contentType = contentType ? contentType.toLowerCase() : ''
      if (contentType.indexOf('application/json') === 0) {
        return await response.json()
      } else {
        return JSON.parse(await response.text())
      }
    } catch (error) {
      return null
    }
  }

  async _checkStatus (response) {
    let body = await this.parseResponse(response)

    if (response.ok) {
      let data = {
        status: response.status,
        headers: response.headers,
        links: this._parseLinks(response.headers) || (body) ? body.links : null,
        body
      }
      
      return data
    } else {
      return basicPromise(null, {
        status: response.status,
        ok: response.ok,
        body
      })
    }
  }

  async _fetch (url, { method = 'GET', body = {}, headers = {}, requiresAuth = true }) {
    try {
      headers['Content-Type'] = 'application/json'
      headers['Accept-Encoding'] = 'gzip'

      let params = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
      }

      if (method === 'GET') {
        delete params.body
      }

      let result = await this._timeout(60, fetch(url, params))

      return this._checkStatus(result)
    } catch (error) {
      let isTimeOut = error.name && error.name === 'ERR_TIMEOUT'

      return basicPromise(null, {
        ok: false,
        body: isTimeOut ? 'ERR_TIMEOUT' : error
      })
    }
  }

  _timeout (sec, promise) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new TimeoutError('Time out exceeded'))
      }, sec * 1000)
      promise.then((res) => {
        clearTimeout(timeoutId)
        resolve(res)
      },
      (err) => {
        clearTimeout(timeoutId)
        reject(err)
      })
    })
  }
}

let request = null

if (!request) {
  request = new Request()
}

export default request
