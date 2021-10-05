
const Notification = ({message}) => {
    if(message === null) {
        return null
    }

    return (
        <div className={`noti noti_${message.type}`}>
            {message.text}
        </div>
    )
}
export default Notification;