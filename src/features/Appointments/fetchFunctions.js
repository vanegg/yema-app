import request from '../../api/request'
import {
        APPOINTMENTS,
        APPOINTMENTS_BY_EMAIL,
        PEDIATRICIANS
      } from '../../api/constants'
import { deserialise } from 'kitsu-core'
import moment from 'moment'


export const _fetchPediatricians = async function () {
  try {
    let response = await request.get(PEDIATRICIANS, false)
    let body = await deserialise(response.body)
    this.setState({ pediatricians: body })
    
  } catch (error) {
    console.log(error)
    this.setState({
      pediatricians: []
    })
  }
}

export const _fetchAppointments = async function () {
  try {
    let response = await request.get(APPOINTMENTS, false)
    let body = await deserialise(response.body)
    this.setState({ appointments: body })
  } catch (error) {
    console.log(error)
    this.setState({ appointments: [] })
  }
}

export const _fetchAppointmentsByEmail = async function (u) {
  try {
    let response = await request.get(APPOINTMENTS_BY_EMAIL(u), false)
    let body = await deserialise(response.body)
    this.setState({ appointments: body })
  } catch (error) {
    console.log(error)
    this.setState({ appointments: [] })
  }
}

export const _setAppointments = async function () {

  var params = {
    email: `${this.state.appointment.email}`,
    date: moment(this.state.appointment.date).format('YYYY-MM-DD'),
    time: `${this.state.appointment.time}`,
    doctor: this.state.appointment.doctor,
    comments: `${this.state.appointment.comments}`

  }

  try {
    let response = await request.post(APPOINTMENTS, params, false)
    console.log('response')
    console.log(response)
    let body = await deserialise(response.body)
    console.log(body)
      this.setState({
        new: false
      })
  } catch (error) {
    this.setState({
      new: true,
      errors: 'Hubo un error. Por favor revisa tus datos'
    })
  }
}


