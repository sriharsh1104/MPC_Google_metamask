// import './App.css';
import jwt_decode from "jwt-decode";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";

function Google_Auth() {
    const [userInfo, setUserInfo] = useState("");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const [google_sign, setGoogle_sign] = useState(false);

    const login = useGoogleLogin({
        onSuccess: async (respose) => {
            try {
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${respose.access_token}`,
                        },
                    }
                );
                setGoogle_sign(true);
                setUserInfo(res.data);
                console.log(res.data, "data");
                console.log(userInfo, "data1");
            } catch (err) {
                console.log(err);
            }
        },
    });

    return (
        <div
        >
            {google_sign ? (
                <div>
                    
                    <form onSubmit={""}>
                        <label>
                            Recipient:
                            <input
                                type="text"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Amount:
                            <input
                                type="number"
                                min="0"
                                step="0.001"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                            Matic
                        </label>
                        <br />
                        <button type="submit">Send Transaction</button>
                        <br />
                        <br />

                        <label>
                            Message:
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </label>
                        <button onClick={"  "}>Sign Message</button>

                    </form>
                </div>
            ) : (
                <div >
                    <button onClick={login} style={{
                        display: "flex",
                        //   alignItems: "centre",
                        justiftyContent: "centre",
                    }}>
                        <i className="fa-brands fa-google"></i>
                        Login With Google Sign
                    </button>
                </div>
            )}

            <div>
                <ul>
                    <li>{userInfo.email}</li>
                    <li>{userInfo.name}</li>
                    <li>{userInfo.hd}</li>
                    <li>
                        <img src={userInfo.picture} />
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default Google_Auth;
