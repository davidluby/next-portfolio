import React, { useState } from 'react'

function Create({ user, setUser }) {
    const [first, setFirst] = useState(null);
    const [last, setLast] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [birthday, setBirthday] = useState(null);


    const handleSubmit = (e) => {
        setUser({
            first_name: first,
            last_name: last,
            username: username,
            password: password,
            email: email,
            birthday: birthday,
            jwt: null
        })
    }

  return (
    <div className="w-full mb-5 text-black">
        <form className="w-1/3 flex flex-col">
            <input
                type="text"
                placeholder="First Name"
                name="first_name"
                onChange={(e) => setFirst(e.target.value)}
            >
            </input>
            <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLast(e.target.value)}
            >
            </input>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            >
            </input>
            <input
                type="text"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            >
            </input>
            <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            >
            </input>
            <input
                type="date"
                placeholder="Birthday"
                onChange={(e) => setBirthday(e.target.value)}
            >
            </input>
        </form>
        <button className="w-1/3 mt-5 mb-10 p-1 rounded bg-white"
                onClick={handleSubmit}>
                Create Account
        </button>
    </div>
  )
}

export default Create