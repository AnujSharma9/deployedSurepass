
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export function Siginin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSignin = async () => {
        const validEmail = "anujsharma@gmail.com";
        const validPassword = "anuj1011";

        try {
            if (email.length === 0) {
                toast.warn('Please enter email');
            } else if (password.length === 0) {
                toast.warn('Please enter password');
            } else if (email !== validEmail || password !== validPassword) {
                toast.error('Invalid email or password');
            } else {
                toast.success('welcome');
                navigate('/billgenrator');
            }
        } catch (error) {
            toast.error(`Failed to connect: ${error.message || ''}`);
        }
    }

    return (
        <>
            <h1 className="title">Signin</h1>
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <div className="form">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input 
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" 
                                className="form-control" 
                                id="email" 
                                aria-describedby="emailHelp" 
                            />
                        </div>
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group mb-3">
                            <input 
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Password"
                                id="password"
                            />
                            <div className="input-group-append">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button onClick={onSignin} type="submit" className="btn btn-primary">Submit</button>

                    </div>
                </div>
                <div className="col"></div>
            </div>
        </>
    );
}
