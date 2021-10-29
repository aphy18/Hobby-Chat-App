import '../styles/MessageOptions.css'

export default function MessageOption() {
  return (
    <div className="message-option-container">
      <span className="message-option-img">Image</span>
      <a href='/#' className="message-option-click"><i>Click to open messages</i></a>
      <span className="message-option-username">To: Username</span>
    </div>
  )
}