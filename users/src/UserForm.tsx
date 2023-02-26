import { SyntheticEvent, useState } from "react"
import User from "./models/User"

interface UserFormProps {
  onUserAdd(user: User): void
}

function UserForm({ onUserAdd }: UserFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    onUserAdd({ name, email })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button>Add User</button>
    </form>
  )
}

export default UserForm
