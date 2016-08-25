const UAParser = require('ua-parser-js')
const CompareVersions = require('compare-versions')

class Compatibility {

  MOBILE () { return {device: {type: 'mobile'}} }
  TABLET () { return {device: {type: 'tablet'}} }
  REQUIRED () {
    return [
      {browser: {name: 'Chrome', version: 44}, device: {model: undefined}},
      {browser: {name: 'Safari', version: 8}},
      {browser: {name: 'Firefox', version: 40}, os: {name: 'Windows'}, device: {model: undefined}},
      {browser: {name: 'Firefox', version: 40}, os: {name: 'Mac OS'}, device: {model: undefined}},
      {browser: {name: 'IE', version: 11}},
      {browser: {name: 'Mobile Safari'}, os: {name: 'iOS', version: 8}},
      {browser: {name: 'Chrome', version: 44}, os: {name: 'Android', version: 5}, device: {type: 'mobile'}},
      {browser: {name: 'Chrome', version: 44}, os: {name: 'Android', version: 5}, device: {type: 'tablet'}}
    ]
  }

  constructor () {
    this.parser = new UAParser()
    this.result = this.parser.getResult()
  }

  isCompatible () {
    let valid = false

    for (let spec of this.REQUIRED()) {
      valid = this.is(spec)
      if (valid) {
        break
      }
    }

    return valid
  }

  getPixelRatio () {
    if (window.devicePixelRatio === 2 || window.devicePixelRatio === 3.5) {
      return window.devicePixelRatio
    } else {
      return 1
    }
  }

  is (spec) {
    let isSpec = false
    let key
    for (key in spec) {
      let requirement = spec[key]
      let requirementProp
      for (requirementProp in requirement) {
        let reqPropValue = requirement[requirementProp]
        let srcPropValue = this.result[key][requirementProp]

        if (requirementProp === 'version') {
          // this only compares semver version strings to find newer, same or older
          // newer: 1
          // same: 0
          // older: -1
          isSpec = CompareVersions(reqPropValue.toString(), srcPropValue.toString()) !== 1
        } else {
          isSpec = reqPropValue === srcPropValue
        }

        // const operator = requirementProp === 'version' ? '>=' : '==='
        // console.log('Compatibility', `Comparing ${key}.${requirementProp}`, '[ Source ' + srcPropValue + ' ]', operator, '[ Requirement ' + reqPropValue + ' ]', 'is', isSpec)

        if (!isSpec) {
          break
        }
      }
      if (!isSpec) {
        break
      }
    }
    return isSpec
  }
}

module.exports = new Compatibility()
