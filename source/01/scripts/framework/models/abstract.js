const Requester = require('../utils/requester')

class AbstractModel {

  constructor () {
    this.data = {}
  }

  async fetch (url) {
    try {
      this.data = JSON.parse(await Requester.httpGet(url))
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = AbstractModel
