export default function Hobby(props){
  
  const data = Array.from(props.hobbyData)

  const getHobbyData = data.map(hobby => {
    return (
      <>
      <div className="hobby-info">
        <p>Hobby Name: {hobby.hobby_name}</p>
        <p>Skill Level: {hobby.level_of_expertise}</p>
        <p>Time Doing Hobby: {hobby.amount_of_time_doing_hobby}</p>
        <p>Spending Estimate: {hobby.my_spending_estimate}</p>
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