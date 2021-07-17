import React, { useState } from 'react'

export const Profile = () => {
  const [user, setUser] = useState("")

  React.useEffect(() => {
    fetch("http://localhost:8000/api-auth/profile",{
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => setUser(data.user_name))
  },[])

  return <div>{user}</div>
}

export default Profile;