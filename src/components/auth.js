import {auth, googleProvider} from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import React from "react";

export default function Auth() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const signIn = async () => {
        try{
        await createUserWithEmailAndPassword(auth, email, password)
        } catch (err){
            console.error(err)
            console.log("well that happened")
        }
    };

    const signInWithGoogle = async () => {
        try{
        await signInWithPopup(auth, googleProvider)
        } catch (err){
            console.error(err)
            console.log("well that happened")
        }
    };

    const logout = async () => {
        try{
        await signOut(auth)
        console.log("Signed Out")
        } catch (err){
            console.error(err)
            console.log("well that happened")
        }
    };


    return (
        <div>
            <input 
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
             placeholder="Password"
             type= "password" 
             onChange={(e) => setPassword(e.target.value)}
             
             />
            <button onClick={signIn}> Sign In </button>

            <button onClick={signInWithGoogle}> Sign In With Google</button>

            <button onClick={logout}> Logout </button>
        </div>
    )
}