const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    border: "3px solid green",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "15px"
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>{message}</div>
  )
}

export default Notification

