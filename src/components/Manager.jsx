import React, { useEffect, useState, useRef } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import hideIcon from '../assets/hide.png';
import trashIcon from '../assets/trash.svg';
import viewIcon from '../assets/view.png';
import editIcon from '../assets/edit.svg';
import copyIcon from '../assets/copy.svg';


const Manager = () => {
    const ref = useRef();
    const passInput = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };



    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, []);

    const showPassword = () => {
        if (ref.current.src.includes(hideIcon)) {
            ref.current.src = viewIcon;
            passInput.current.type = "text";
        } else {
            passInput.current.type = "password";
            ref.current.src = hideIcon;
        }
    };


    const savePassword = () => {
        if (!form.site || !form.username || !form.password) {
            alert("Please fill in all fields before saving the password.");
            return;
        }


        else {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({ site: "", username: "", password: "" })
            toast.success('Password saved!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };


    const deletePassword = (id) => {
        let confirmation = confirm("Do you really want to delete it?")
        if (confirmation) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast.success('Password deleted successfully', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }
    const editPassword = (id) => {
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    const isValidURL = (str) => {
        const pattern = new RegExp(
            '^(https?:\\/\\/)?' +
            '(([\\da-z.-]+)\\.([a-z.]{2,6}))' +
            '([\\/\\w .-]*)*\\/?$',
            'i'
        );
        return pattern.test(str);
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="container max-w-[90vw] mt-14 my-6 lg:max-w-4xl xl:max-w-5xl mx-auto">
                <p className='sm:text-5xl text-4xl text-center font-bold'>
                    <span>&lt;Pass</span><span className='text-green-700'>Hive/&gt;</span>
                </p>
                <p className='text-[12px] sm:text-[17px] text-center my-2 text-green-900'>Your own Password Manager</p>
                <div className='sm:flex flex-row text-black my-7 sm:flex-col py-2'>
                    <input
                        onChange={handleChange}
                        value={form.site}
                        placeholder='Enter the website URL or app name'
                        className='text-[14px] md:text-[17px] rounded-full w-[90vw] sm:w-full px-2 h-8 border border-emerald-800'
                        type="text"
                        name='site'
                    />
                    <div className='sm:flex flex-col sm:flex-row my-6 sm:justify-between gap-6 flex'>
                        <input
                            onChange={handleChange}
                            value={form.username}
                            placeholder='Enter username'
                            className='text-[14px] md:text-[17px] border px-2 py-2 rounded-2xl h-8 sm:w-1/2 border-emerald-800'
                            type="text"
                            name='username'
                        />
                        <div className='relative sm:w-1/2'>
                            <input
                                ref={passInput}
                                onChange={handleChange}
                                value={form.password}
                                placeholder='Enter password'
                                className='text-[14px] md:text-[17px] border sm:w-full w-[90vw] px-2 py-2 rounded-2xl h-8 border-emerald-800'
                                type="password"
                                name='password'
                            />
                            <span className='absolute top-1.5 right-3 sm:top-1.5 cursor-pointer sm:right-3' onClick={showPassword}>
                                <img className='h-5' ref={ref} src={hideIcon} alt='eye' />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className='text-white h-10 sm:h-12 w-26 sm:w-30 hover:bg-green-500 border border-black bg-green-600 rounded-3xl sm:p-2 sm:px-4 sm:my-3 flex items-center justify-center mx-auto'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            className="mx-1 sm:h-8 h-6">
                        </lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords mt-6">
                    <h2 className="font-bold text-xl md:text-2xl mb-4 text-gray-800">Your Passwords</h2>

                    {passwordArray.length === 0 && (
                        <div className="text-sm md:text-base text-gray-600">No Passwords to show!</div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {passwordArray.map((item, index) => {
                            const isLink = isValidURL(item.site);
                            const isPasswordVisible = visiblePasswords[item.id] || false;

                            return (
                                <div key={item.id} className="bg-white shadow-md border border-gray-200 rounded-lg p-4 flex flex-col justify-between">
                                    {/* Site and Actions */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="text-sm font-medium text-gray-800 break-all">
                                            {isLink ? (
                                                <a href={item.site} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    {item.site}
                                                </a>
                                            ) : (
                                                item.site
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-3">   
                                            <img
                                                onClick={() => editPassword(item.id)}
                                                className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                                                src={editIcon}
                                                alt="Edit"
                                            />
                                            <img
                                                onClick={() => deletePassword(item.id)}
                                                className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                                                src={trashIcon}
                                                alt="Delete"
                                            />
                                        </div>
                                    </div>

                                    {/* Username */}
                                    <div className="text-sm text-gray-700 mb-2 flex items-center break-all">
                                        <span className="font-semibold mr-1">Username:</span>
                                        <span>{item.username}</span>
                                        <img
                                            onClick={() => copyText(item.username)}
                                            className="w-4 h-4 ml-2 cursor-pointer opacity-60 hover:opacity-100"
                                            src={copyIcon}
                                            alt="Copy username"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="text-sm text-gray-700 flex items-center break-all">
                                        <span className="font-semibold mr-1">Password:</span>
                                        <span>{isPasswordVisible ? item.password : '•'.repeat(item.password.length)}</span>
                                        <img
                                            onClick={() => togglePasswordVisibility(item.id)}
                                            className="w-4 h-4 ml-2 cursor-pointer opacity-60 hover:opacity-100"
                                            src={isPasswordVisible ? viewIcon : hideIcon}
                                            alt="Toggle password"
                                        />
                                        <img
                                            onClick={() => copyText(item.password)}
                                            className="w-4 h-4 ml-2 cursor-pointer opacity-60 hover:opacity-100"
                                            src={copyIcon}
                                            alt="Copy password"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>
        </>
    );
};
export default Manager;
