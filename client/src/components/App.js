import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";


function App() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/demo')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const HandleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/demo', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
        setUsers(data);
        setFormData({
            username: "",
            password: ""
        })

    }

    return (
        <div>
            <Header />
            <div>
                <form onSubmit={HandleSubmit}>
                    <label htmlFor="email">username</label>
                    <input type="email" name="username" value={formData.username} onChange={HandleChange} />
                    <br />
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" value={formData.password} onChange={HandleChange} />
                    <br />
                    <button type="submit">Submit</button>
                </form>

                {users.length===0? <div>Loading....</div>:
                users.map(user => {
                    return (                        
                        <div>
                            <p>Username : {user.username}</p>
                            <p>Password : {user.password}</p>
                        </div>
                    )
                })}

            </div>
            <Footer />
        </div>
    );
}

export default App;  