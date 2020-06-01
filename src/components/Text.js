import React from 'react'
import slug from 'slug'

export default class Text extends React.Component {
  constructor (props) {
    super(props)
    this.id = `${props.id}_${slug(props.name)}`
    this.state = {
      valid: !props.required,
      value: props.value || '',
      errorMessage: '',
      matchValue: this.props.matchValue,
      showError: false
    }
    this.type = props.type || 'text'
  }

  _validate = (value = '') => {
    let valid = true
    let errorMessage = ''

    if (this.props.required && !value) {
      valid = false
      errorMessage = 'Este campo es obligatorio'
    }

    if (value) {
      if (this.props.type === 'email') {
        let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!emailRegex.test(value)) {
          valid = false
          errorMessage = 'Formato de correo inválido'
        }
      }

      if (this.state.matchValue) {
        valid = this.state.matchValue === value
        errorMessage = !valid ? 'Los campos no coinciden' : ''
      }

      if (this.props.length) {
        if (this.props.length !== value.length) {
          valid = false
          errorMessage = `El requerido es de  ${this.props.length} caracteres`
        }
      }

      if (this.props.type === 'tel') {
        if (isNaN(parseInt(value, 10)) || !value.match(/^[0-9]*$/)) {
          valid = false
          errorMessage = `Solamente se permiten números`
        }
      }
    }

    return {
      valid,
      errorMessage
    }
  }

  _showError = (e) => {
    let value = this.state.value
    let validation = this._validate(value)
    this.setState({
      value,
      valid: validation.valid,
      showError: !validation.valid,
      errorMessage: validation.errorMessage
    })
  }

  _setValue = (e) => {
    let value = e.target.value
    let validation = this._validate(value)
    this.setState({
      value
      // valid: validation.valid
    }, () => {
      this.props.onChange({
        valid: validation.valid,
        value: value
      })
    })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.matchValue !== this.props.matchValue) {
      this.setState({
        matchValue: this.props.matchValue
      }, () => {
        if (this.state.value) {
          let validation = this._validate(this.state.value)
          this._showError()
          this.props.onChange({
            valid: validation.valid,
            value: this.state.value
          })
        }
      })
    }
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      }, () => {
        let validation = this._validate(this.props.value)
        this.props.onChange({
          valid: validation.valid,
          value: this.props.value
        })
      })
    }
  }

  render () {
    return (
      <div className={`u-field ${this.props.className || ''}`}>
        <label htmlFor={this.id}>{this.props.name} {this.props.required && '*'}</label>
        {
          this.props.helpText &&
          <span className='u-help'>{this.props.helpText}</span>
        }
        <input type={this.type} value={this.state.value} id={this.id} onChange={this._setValue} onBlur={this._showError} maxLength={this.props.maxLength} onPaste={this.props.onPaste} />
        {
          !this.state.valid && this.state.showError && <span className='u-error'>{this.state.errorMessage}</span>
        }
      </div>
    )
  }
}
