import '../styles/MessageOptions.css'

export default function MessageOption(props) {
 
  
  return (
    <div className="message-option-container">
      <span className="message-option-img">Image</span>
      <div className="message-option-click-container">
      <span href={`/message/${props.user.id}`} className="message-option-click" onClick={props.onClick}><i>Click to message {props.user.username}</i></span>
      <i class="fas fa-comments"></i>
      </div>
      <span className="message-option-username">To: {props.user.username}</span>
    </div>
  )
}