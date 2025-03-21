import React, { useState } from 'react'

function Login({ setUser }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            console.log(username, password);
        };
    };

    return (
        <div className="flex flex-col justify-center w-full text-black">
            <form className="w-1/3">
                <div className="flex flex-col w-full space-y-5">
                    <input className="w-full p-1 rounded"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}>
                    </input>
                    <input className="w-full p-1 rounded"
                        type="text"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleSubmit}>
                    </input>
                </div>
            </form>
            <button className="w-1/3 mt-5 p-1 rounded bg-white"
                onClick={handleSubmit}>
                Login
            </button>
        </div>
    )
}

export default Login