import request from '../../api/request'
import {
        APPOINTMENTS,
        APPOINTMENTS_BY_EMAIL,
        PEDIATRICIANS,
        PEDIATRICIAN
      } from '../../api/constants'
import { deserialise } from 'kitsu-core'


export const _fetchPediatricians = async function () {
  try {
    let response = await request.get(PEDIATRICIANS, false)
    console.log('RESPONSE')
    console.log(response)
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
    email: `${this.state.email}`,
    date: `${this.state.date}`,
    time: `${this.state.time}`,
    doctor: `${this.state.doctorId}`
  }

  try {
    let response = await request.post(APPOINTMENTS, params, false)
    let body = await deserialise(response.body)
    if (body) {
      let data = await deserialise(body.data)
      let event = [...data.events][0]
      this.setState({
        useSeats: event.useSeats,
        realCapacity: event.realCapacity,
        seatsEventKey: event.seatsEventKey,
        details: event.layoutDetails
      })
    }
  } catch (error) {
    console.log(error)
  }
}


