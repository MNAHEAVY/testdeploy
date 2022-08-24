import { useState } from "react"
import './LogIn.css'
import {Link} from 'react-router-dom';

export default function LogIn() {

  const [input, setInput] = useState({
    acount: "",
    password: "",
  })

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Not implemented yet. We are working on this')
  }

  return (
    <div className="FormDiv">
      <h1>Please login to continue</h1>
      <form action="">
        <label className="FormLabel">Acount</label>
        <input className="FormInput" type="text" name="acount" value={input.name} onChange={(e) => handleChange(e)}/>

        <label className="FormLabel">Password</label>
        <input className="FormInput" type="password" name="password" value={input.description} onChange={(e) => handleChange(e)} />

        <button className="SubmitBtn" type="submit" onClick={handleSubmit}>Continue</button>
      </form>
    </div>
  )
}