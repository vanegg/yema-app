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
    errors: this.props.errors,
    pediatricians: this.props.pediatricians,
    appointment: {
      email: this.props.email,
      date: null,
      time: null,
      doctor: null,
      comments: null
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps !== this.props) {
      this.setState({
         errors: this.props.errors
      })
    }
  }

  _setValue = (name) => (value) => {
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
    this.props.onChange(this.state.appointment)
  }

  render () {
    return (
      <div className='c-appointment-info' id='appointmentInfo'>
        { this.state.errors && 
        <div className='error_messages'>
          {this.state.errors}
        </div>
        }
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
          name='Fecha'
          id={this.props.id}
          required
          type='date'
          value={this.state.appointment.date}
          onChange={this._setValue('date')}
          ref={this.fields.date}
        />

        <Text
          name='Hora'
          id={this.props.id}
          required
          type='time'
          value={this.state.appointment.time}
          onChange={this._setValue('time')}
          ref={this.fields.time}
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