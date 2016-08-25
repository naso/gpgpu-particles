/* globals XMLHttpRequest */

class Requester {

  static httpGet (url) {
    return new Promise((resolve, reject) => {
      // do the usual Http request
      const request = new XMLHttpRequest()
      request.open('GET', url)

      request.onload = () => {
        if (request.status === 200) {
          resolve(request.response)
        } else {
          reject(Error(request.responseText))
        }
      }

      request.onerror = () => {
        reject(Error('Network Error'))
      }

      request.send()
    })
  }
}

module.exports = Requester
