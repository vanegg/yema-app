import React, { Component } from 'react'

class SearchEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      errorMessage: 'Formato de correo inválido'
    }
    this.email = React.createRef();
  }

  _handleSubmit = () => {
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(this.email.current.value)) {
      this.setState({
        valid: false
      })
    } else {
      this.setState({
        valid: true
      })
      this.props.onChange(this.email.current.value)
    }
  }

  _handleOptionChange = (e) => {
    if (e.key === 'Enter') {
      this._handleSubmit()
    }
  }

  render () {
    return (
      <div className="searchBox">
        <img src='https://i.pinimg.com/originals/4f/6d/6e/4f6d6e79d1fd0a87f87f96c7e1ee6061.png' width='120'></img>
        <h1>Hola</h1>
        <h2>Busca tus citas médicas con tu correo</h2>
        <div className='filter'>
          <input type='email' placeholder='email'
            onKeyPress={this._handleOptionChange} ref={this.email}
          />
          { !this.state.valid && <span className='u-error'>{this.state.errorMessage}</span> }
        </div>
        <div>
          <input type='submit'
            value='Buscar'
            className='u-button--base u-button--secondary u-button--block'
            onClick={this._handleSubmit}
          />
        </div>
      </div>
    )
  }
}

export default SearchEmail
