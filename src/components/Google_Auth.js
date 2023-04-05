// import './App.css';
import jwt_decode from "jwt-decode";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import Signup from "./Signup";

function Google_Auth() {
    const [userInfo, setUserInfo] = useState("");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    console.log(userInfo,"userInfo");

    const [google_sign, setGoogle_sign] = useState(false);

    const login = useGoogleLogin({
        onSuccess: async (respose) => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: `Bearer ${respose.access_token}`, }, });
                setGoogle_sign(true)
                let data = await axios.post('http://10.1.4.141:6500/SignUp', { firstName: res.data.family_name, lastName: res.data.given_name, pictureLink: res.data.picture, emailID: res.data.email })
                console.log(data, "data");
                setUserInfo(data)
                // let data1 = await axios.get('https://10.1.4.141:6500/SignUp', )
                // console.log(
                //     data1,"data1"
                // );

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
