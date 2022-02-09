import React from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'

const Notification = (props) => {
  if ( !props.notification ) {
    return null
  }

  return <div>
    <Alert variant={props.notification.color}>
      {props.notification.message}
    </Alert>
  </div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)