import { useContext, useState } from "react"
import { UserContext } from "../App"
import { Navigate } from "react-router";

const USERS = ['tushar', 'purujit', 'aman']

export const Login = () => {

    const { user, setUser } = useContext(UserContext);
    const [name, setName] = useState();
    const [error, setError] = useState();
    if (user) {
        return <Navigate to={'/'} />
    }
    const login = () => {
        // Fake login
        if (USERS.includes(name)) {
            setUser({ name });
        }
        else {
            setError('Wrong Cred')
        }
    }
    return (
        <div className="flex flex-direction-column align-items-center">
            <div style={{ width: '100px', margin: 10 }}>
                <input onChange={e => setName(e.target.value)} placeholder="name" />
            </div>
            <button onClick={login}>Login</button>
            <p>{error}</p>
        </div>
    );
}