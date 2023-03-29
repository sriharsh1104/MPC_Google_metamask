import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
// import './App.css';
import jwt_decode from 'jwt-decode'
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function Wall() {
    const [web3, setWeb3] = useState(null)
    const [account, setAccount] = useState('')
    const [balance, setBalance] = useState(0)
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState('')
    const [signature, setSignature] = useState('')
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        const loadAccount = async () => {
            if (web3) {
                const accounts = await web3.eth.getAccounts()
                setAccount(accounts[0])
            }
        }
        loadAccount()
    }, [web3])

    useEffect(() => {
        const loadBalance = async () => {
            if (web3 && account) {
                const balanceInWei = await web3.eth.getBalance(account)
                const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether')
                setBalance(balanceInEth)
            }
        }
        loadBalance()
    }, [web3, account])

    const handleSignMessage = async (e) => {
        e.preventDefault()
        if (web3 && account && message) {
            const signature = await web3.eth.personal.sign(message, account)
            console.log(`Message signed with signature: ${signature}`)
            setSignature(signature)
            // clear the message input after successful signing
            setMessage('')
        }
    }

    const handleSendTransaction = async (e) => {
        e.preventDefault()
        if (web3 && recipient && amount && account) {
            const valueInWei = web3.utils.toWei(amount, 'ether')
            const gasPrice = await web3.eth.getGasPrice()
            const gasLimit = 21000
            const transactionData = {
                from: account,
                to: recipient,
                value: valueInWei,
                gasPrice: gasPrice,
                gas: gasLimit,
            }
            const txHash = await web3.eth.sendTransaction(transactionData)
            console.log(`Transaction sent with hash: ${txHash}`)
            // clear the form inputs after successful transaction
            setRecipient('')
            setAmount(0)
        }
    }
    const connectToMetaMask = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum)
            try {
                await window.ethereum.enable()
                setWeb3(web3)
            } catch (err) {
                console.error('User denied account access')
            }
        } else if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider)
            setWeb3(web3)
        } else {
            console.error('No Ethereum browser extension detected')
        }
    }

    return (
        <div>
            {web3 ? (
                <div>
                    <p>Connected account: {account}</p>
                    <p>Balance: {balance} ETH</p>
                    <form onSubmit={handleSendTransaction}>
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
                    </form>
                    <button onClick={handleSignMessage}>Sign Message</button>
                </div>
            ) : (
                <div>
                    <button onClick={connectToMetaMask}>Connect to MetaMask</button>
                </div>
            )}
        </div>
    )
}

export default Wall
