import React, { Component } from 'react'
import Index from '../../components/Appointments/Index'
import Form from '../../components/Appointments/Form'
import SearchEmail from '../../components/SearchEmail'
import Empty from '../../components/EmptyState'
import Loading from '../../components/Loading'
import {
  _fetchAppointments,
  _fetchAppointmentsByEmail,
  _fetchPediatricians,
  _setAppointments
} from './fetchFunctions'

export default class Appointments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      loaded: true,
      appointments: [],
      new: false,
      pediatricians: [],
      appointment: null
    }
  }

  componentDidMount() {
    this._fetchAppointmentsByEmail = _fetchAppointmentsByEmail.bind(this)
    this._fetchAppointments = _fetchAppointments.bind(this)
    this._fetchPediatricians = _fetchPediatricians.bind(this)
    this._setAppointments = _setAppointments.bind(this)

  }

  _getPediatricians = async () => {
    try {
      await this._fetchPediatricians()

      this.setState({
        loaded: true
      })

    } catch (err) {
      console.log(err)
      this.setState({
        loaded: true
      })
    }
  }

  _updateEmail = async (email) => {
    try {
      this.setState({
        loaded: false,
        email
      })
      await this._fetchAppointmentsByEmail(email)

      this.setState({
        loaded: true
      })

    } catch (err) {
      console.log(err)
      this.setState({
        loaded: true,
        email: null
      })
    }
  }

  _handleSubmit = async (appointment) => {
    try {
      this.setState({
        loaded: false,
        appointment
      }, () => {
        this._setAppointments()
        this._updateEmail(this.state.appointment.email)
      })

      this.setState({
        loaded: true
      })

    } catch (err) {
      console.log(err)
      this.setState({
        loaded: true
      })
    }
  }

  _goToNewAppointment = async () => {
    await this._getPediatricians()
    this.setState({
      new: true
    })
  }

  _goToBack = () => {
    this.setState({
      new: false
    })
  }

  _renderAppointments = () => {
    return (
      <>
        { !this.state.loaded && <Loading /> }

        {!this.state.email ?
          <SearchEmail
            email={this.state.email}
            onChange={this._updateEmail}
          />
          :
          !this.state.new ?
          <>
          <h2 className='notBold'>Estas son tus citas actuales para <strong>{this.state.email}</strong></h2>
          {
            <div className="newAppointment">
              <p>¿Necesitas una nueva cita?</p>
              <button id='new_appointment_button'
                      className='newAppointmentButton'
                      onClick={this._goToNewAppointment}>
                  + Nueva Cita
              </button>
            </div>
          }
          { this.state.appointments.length > 0 ?
            <Index
              appointments={this.state.appointments}
            />
            :
            <Empty
            title = '¡Aún no tienes citas!'
            text = 'Si necesitas alguna cita con el Pediatra no dudes en crearla.'
            />
          }
          </> :
          <>
          <button id='back_button'
                  className='u-button--primary u-button--big u-button--block'
                  onClick={this._goToBack}>
            Regreso
          </button>
          <Form
            errors={this.state.errors}
            pediatricians={this.state.pediatricians}
            email={this.state.email}
            onChange={this._handleSubmit}
          />
          </>
        }
      </>
  )}

  render () {
    return (
      <div className="u-wrapper">
        <div className="myAppointments">
          {this._renderAppointments()}
        </div>
      </div>
    )
  }
}
