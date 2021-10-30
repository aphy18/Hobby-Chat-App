import '../styles/MessageOptions.css'

export default function MessageOption(props) {
  return (
    <div className="message-option-container">
      <span className="message-option-img">Image</span>
      <div className="message-option-click-container">
      <a href='/#' className="message-option-click"><i>Click to open messages</i></a>
      <i class="fas fa-comments"></i>
      </div>
      <span className="message-option-username">To: {props.user.username}</span>
    </div>
  )
}