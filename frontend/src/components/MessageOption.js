import '../styles/MessageOptions.css'

export default function MessageOption(props) {
 
  
  return (
    <div className="message-option-container">
      <span className="message-option-img">Image</span>
      <div className="message-option-click-container">
      <a href={`/message/${props.user.id}`} className="message-option-click" id={props.user.id} onClick={props.onClick}><i>Message {props.user.username}</i></a>
      <i class="fas fa-comments"></i>
      </div>
      <span className="message-option-username">{props.user.username}</span>
    </div>
  )
}


// {`/message/${props.user.id}`}