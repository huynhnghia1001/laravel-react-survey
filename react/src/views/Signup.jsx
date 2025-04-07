import { Link } from 'react-router-dom';
import { useState } from 'react';
import axiosClient from '../axios.js';
import { useStateContext } from '../contexts/ContextProvider.jsx';

export default function Signup() {
    const {setCurrentUser, setUserToken} = useStateContext();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [error, setError] = useState({__html: ''});

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({__html: ''})

        axiosClient.post('/signup', {
            name: fullName,
            email,
            password,
            password_confirmation: passwordConfirmation
        }).then(({data})=>{
            setCurrentUser(data.user)
            setUserToken(data.token)
        }).catch((error)=>{
            if(error.response){
                const finalErrors = Object.values(error.response.data.errors).reduce((accum,next)=>[...next, ...accum], [])
                console.log(finalErrors)
                setError({__html:finalErrors.join('<br>')})
            }
        })
    }

    return (
        <>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Signup for free</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <Link to="/login"
                   className="font-medium text-indigo-600 hover:text-indigo-500">
                    Login with your account
                </Link>
            </p>


            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white"
                                       dangerouslySetInnerHTML={error}></div> )}
                <form onSubmit={onSubmit} action="#" method="POST" className="space-y-6">
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="full-name" className="block text-sm/6 font-medium text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="full-name"
                                    name="name"
                                    type="text"
                                    value={fullName}
                                    onChange={ev => setFullName(ev.target.value)}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"

                                />
                            </div>
                        </div>
                        <div>

                            <label htmlFor="email-address" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                    required
                                    autoComplete="email"
                                    className="relative block w-full appearance-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"

                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password-confirmation" className="block text-sm/6 font-medium text-gray-900">
                                Password Confirmation
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password-confirmation"
                                name="password_confirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={ev => setPasswordConfirmation(ev.target.value)}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?{' '}
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Start a 14 day free trial
                    </a>
                </p>
            </div>
        </>
    );
}
