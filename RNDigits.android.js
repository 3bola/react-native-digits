/**
 * @providesModule react-native-digits
 * @flow
 */
'use strict';

import React, { Component, NativeModules, PropTypes } from 'react-native'
const { RNDigits } = NativeModules

export default class Digits extends Component {
  static logout() {
    RNDigits.logout()
  }

  componentWillReceiveProps(props) {
    if (props.visible && this.props.visible == false) {
      this.show()
    }
  }

  show() {
    const { accentColor, backgroundColor } = this.props

    if(accentColor || backgroundColor){
      console.warn("Android can't set color programmatically. Use a custom theme instead.")
    }

    RNDigits.view((err, session) => {
      if (err) {
        this.props.onError(err)
      } else {
        this.props.onLogin(session)
      }
    })
  }

  render() {
    return false
  }
}

Digits.propTypes = {
  accentColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  onError: PropTypes.func,
  onLogin: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

Digits.defaultProps = {
  onError: (err) => console.warn(err),
  visible: false,
}
