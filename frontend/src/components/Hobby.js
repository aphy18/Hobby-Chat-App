export default function Hobby(props){
  console.log('from hobby',props.hobbyData)

  const data = Array.from(props.hobbyData)

const getHobbyData = data.map(hobby => {
  return (
    <>
    <div className="hobby-info">
      <p>{hobby.hobby_name}</p>
      <p>{hobby.level_of_expertise}</p>
      <p>{hobby.amount_of_time_doing_hobby}</p>
      <p>{hobby.my_spending_estimate}</p>
    </div>
    </>
    )
  })

  return (
  
      
     <div>
       {getHobbyData}
     </div> 
  
  )
  
  
 
}