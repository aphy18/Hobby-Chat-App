

export default function Hobby(props){

  const getHobbyData = props.hobbyData.map(hobby => {
    return (
      <>
        <div className="hobby-info">
          <p className="hobby-item">Hobby Name: {hobby.hobby_name}</p>
          <p className="hobby-item">Skill Level: {hobby.level_of_expertise}</p>
          <p className="hobby-item">Time Doing Hobby: {hobby.amount_of_time_doing_hobby}</p>
          <p className="hobby-item">Spending Estimate: {hobby.my_spending_estimate}</p>
        </div>
      </>
    )

    
  })
  
  
  return (
    <div className="hobby-holder">
      {getHobbyData}
    </div>
  )

}