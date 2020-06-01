import React from 'react'
import Text from '../Text'
import List from '../List'
import update from 'react-addons-update'


class Form extends React.Component {
  fields = {
    email: React.createRef(),
    date: React.createRef(),
    time: React.createRef(),
    doctor: React.createRef(),
    comments: React.createRef(),
  }

  state = {
    pediatricians: this.props.pediatricians,
    appointment: {
      email: this.props.email,
      date: null,
      time: null,
      doctor: null,
      comments: null
    }
  }


  _setValue = (name) => (value) => {
    console.log(name)
    console.log(value)
    this.setState((prevState) => {
      return {
        appointment: update(prevState.appointment, { [name]: { $set: value.value } })
      }
    }, () => {
      this.validate()
    })
  }

  validate = () => {
    let valid = true

    Object.keys(this.fields).some(r => {
      valid = this.state.appointment[r].valid
      return !valid
    })
    return valid
  }

  validateAll = () => {
    Object.keys(this.fields).forEach(k => {
      this.required[k].current._showError()
    })
  }

  _setAppointment = () => {
    console.log(this.state)
  }

  render () {
    return (
      <div className='c-appointment-info' id='appointmentInfo'>
        <span className='c-appointment-info__title'>Llena tus datos para la cita</span>

        <Text
          name='E-mail'
          id={this.props.id}
          required
          type='email'
          value={this.state.appointment.email}
          onChange={this._setValue('email')}
          ref={this.fields.email}
        />

        <List
          key={this.props.id}
          className='is-input-large'
          name='Pediatra'
          helpText='Escoge tu pediatra'
          value={this.state.appointment.doctor}
          onChange={this._setValue('doctor')}
          options={this.state.pediatricians}
          required
          ref={this.fields.doctor}
        />

        <Text
          className='is-input-large'
          name='Comentarios'
          id={this.props.id}
          value={this.state.appointment.comments}
          onChange={this._setValue('comments')}
          ref={this.fields.comments}
        />

        <button id='back_button' 
                  className='u-button--primary u-button--big u-button--block' 
                  onClick={this._setAppointment}>
            Solicitar Cita
        </button>
      </div>
    )
  }

}

export default Form