import React from 'react'

class Appointment extends React.Component {
  state = {
    email: this.props.email,
    date: this.props.date,
    time: this.props.time,
    doctor: this.props.doctor,
    status: this.props.status,
    comments: this.props.comments
  }

  render () {
    return (
      <div className='AppointmentSingle'>
        <div className='AppointmentContent'>
          <h3 className='AppointmentName'>
          Email: {this.state.email}
          </h3>
          <p>
          Doctor: {this.state.doctor}
          </p>
          <p>
          Status de la cita: {this.state.status}
          </p>
          <p>
          Fecha y hora: {this.state.date} - {this.state.time}
          </p>
          <p>
          Comentarios: {this.state.comments}
          </p>
        </div>
      </div>
    )
  }
}

export default Appointment
