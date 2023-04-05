import React, { useState } from "react";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = (event) => {
        event.preventDefault();
        // handle signin logic here
    };

    return (
        <div>
            <h1>Signin</h1>
            <form onSubmit={handleSignin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Signin</button>
            </form>
        </div>
    );
}

export default Signin;
