import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    padding: 10,
    marginBottom: 10
  }
  
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)