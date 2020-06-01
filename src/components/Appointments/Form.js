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

  componentDidMount() {
    console.log(this.props)
    // if (this.props.email) {
    //   this.setInitOrderValues(this.props.appointment)
    // }
  }

  // setInitOrderValues = (appointment) => {
  //   this.setState((prevState) => {
  //     return {
  //       appointment: {
  //         ...prevState.appointment,
  //         email: { value: appointment.email || '', valid: true },
  //       }
  //     }
  //   })
  // }

  _setValue = (name) => (value) => {
    this.setState((prevState) => {
      return {
        appointment: update(prevState.appointment, { [name]: { $set: value } })
      }
    }, () => {
      this.validate(true)
    })
  }

  validate = (notify = false) => {
    let valid = true

    Object.keys(this.fields).some(r => {
      valid = this.state.appointment[r].valid
      return !valid
    })

    if (!notify) {
      this.validateAll()
    }
    return valid
  }

  validateAll = () => {
    Object.keys(this.fields).forEach(k => {
      this.required[k].current._showError()
    })
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
          onChange={this._setValue('appointmentComments')}
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