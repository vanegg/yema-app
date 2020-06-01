import React, { Component } from 'react'
import Appointment from './Appointment'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: props.appointments
    }
  }

  render () {
    return (
      <div className = "ResultsContainer">
        {
          this.state.appointments.map((e, i) =>
            <Appointment key={i} {...e} />
          )
        }
      </div>
    )
  }
}

export default Index