import React from 'react'
import slug from 'slug'

export default class List extends React.Component {
  constructor (props) {
    super(props)
    this.id = `${props.id}_${slug(props.name)}`
    this.state = {
      valid: !props.required,
      value: '',
      errorMessage: '',
      showError: false
    }
  }

  _validate = (value = '') => {
    let valid = true
    let errorMessage = ''

    if (this.props.required && !value) {
      valid = false
      errorMessage = 'Este campo es obligatorio'
    }

    this.setState({
      value,
      valid,
      errorMessage,
      showError: !valid
    }, () => {
      this.props.onChange({
        valid,
        value
      })
    })
  }

  _handleChange = (value) => (e) => {
    this._validate(value)
  }

  _showError = () => {
    this._validate(this.state.value)
  }

  render () {
    return (
      <div className={`u-radio ${this.props.className || ''}`}>
        <label className='u-radio__label' dangerouslySetInnerHTML={{ __html: `${this.props.name} ${this.props.required && '*'}` }} />
        {
          this.props.helpText &&
          <span className='u-help'>{this.props.helpText}</span>
        }
        <ul>
          {
            this.props.options.map((o, idx) => (
              <li key={idx}>
                <input
                  type='radio'
                  id={`${this.props.id}_${idx}_${slug(o.option_value || o.value)}`}
                  name={`options-${this.props.id}`}
                  onChange={this._handleChange(o.option_value || o.value)}
                />
                <label htmlFor={`${this.props.id}_${idx}_${slug(o.option_value || o.value)}`} >
                  {o.option_value || o.value}
                </label>
              </li>
            ))
          }

        </ul>
        {
          !this.state.valid && this.state.showError && <span className='u-error'>{this.state.errorMessage}</span>
        }
      </div>
    )
  }
}
