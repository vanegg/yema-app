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
      <div className='c-ticket__single'>
        <div className='c-ticket__content'>
          <h4 className='c-ticket__name'>{this.state.email}</h4>
          <p> {this.state.doctor} </p>
          <span  className='c-ticket__price'>
            {this.state.status}
          </span>
        </div>
        <div className='c-ticket__selection is-default'>
         <span className='c-ticket__total'>
            {this.state.date} - {this.state.time}
          </span>
        </div>
      </div>
    )
  }
}

export default Appointment