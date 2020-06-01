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
      <div className="c-filter__container is-super-admin">
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