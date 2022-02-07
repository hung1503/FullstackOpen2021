import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if ( !props.notification ) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: props.notification.color === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return <div style={style}>
    {props.notification.message}
  </div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)