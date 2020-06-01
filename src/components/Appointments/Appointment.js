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
      <div className='c-appointment__single'>
        <div className='c-appointment__content'>
          <h4 className='c-appointment__name'>
            Email:{this.state.email}
          </h4>
          <h4> 
            Doctor: {this.state.doctor} 
            </h4>
          <h4  className=''>
            Status de la cita:{this.state.status}
          </h4>
         <h4 className=''>
            Fecha y hora: {this.state.date} - {this.state.time}
          </h4>
          <h4 className=''>
            Comentarios: {this.state.comments}
          </h4>
        </div>
      </div>
    )
  }
}

export default Appointment