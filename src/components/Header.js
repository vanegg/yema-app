import React, { Component } from 'react'
import { withRouter } from 'next/router'

class Header extends Component {
  state = {
    root: this.props.router.pathname === '/'
  }
  constructor (props) {
    super(props)

    props.router.events.on('routeChangeStart', (url) => {
      this.setState({
        root: url === '/'
      })
    })
    props.router.events.on('routeChangeComplete', (url) => {
      window.scrollTo(0, 0)
    })
  }

  render () {
    return (
      <>
        <header className='c-header'>
          <div className='c-header__inner'>

          </div>
        </header>
      </>
    )
  }
}

export default withRouter(Header)
