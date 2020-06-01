import React, { Component } from 'react'

class SearchEmail extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  _handleSubmit = () => {
    this.props.onChange(this.input.current.value)
  }

  _handleOptionChange = (e) => {
    if (e.key === 'Enter') {
      this._handleSubmit()
    }
  }

  render () {
    return (
      <div className="c-filter__container is-super-admin">
        <h4>Busca tus citas médicas con tu correo</h4>
        <div className='c-filter'>
          <input type='text' placeholder='email'
            onKeyPress={this._handleOptionChange} ref={this.input}
          />
        </div>
        <div className='u-col3'>
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