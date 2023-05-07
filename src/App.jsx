import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  },[])

  const formData = (event)=>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {
      name,
      email
    }
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => setUsers([...users, data]));
    event.target.reset()
  }
  return (
    <div>
      <h1>Users Management System</h1>
      <p>Total users: {users.length}</p>
      <form action="" onSubmit={formData}>
      <input type="text" name="name" id="" placeholder='name'/>
      <input type="email" name="email" id="" placeholder='email'/>
      <button type='submit'>Add</button>
      </form>
      <div className='flex'>
        {
          users.map(user => (
                      <div key={user.id} style={{display: 'flex', gap:'10px'}}>
                        <p>{user.id}.</p>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                      </div>
                    ))
        }
      </div>
    </div>
  )
}

export default App
