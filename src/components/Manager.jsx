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
                <div className="passwords">
                    <h2 className='font-bold text-xl md:text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='md:text-[16px] text-[13px]'>No Passwords to show!</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-700 sm:text-[14px] md:text-[15px] text-[10px] text-white'>
                                <tr>
                                    <th className='py-2 px-1'>Website URL or app name</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-50 sm:text-[14px] md:text-[15px] text-[11px]'>
                                {passwordArray.map((item, index) => {
                                    const isLink = isValidURL(item.site);

                                    return (
                                        <tr key={index}>
                                            <td className='py-1 sm:text-center pl-2.5 sm:pl-0 text-left w-32 '>
                                                {isLink ? (
                                                    <a href={item.site} target='_blank' rel='noopener noreferrer'>
                                                        {item.site}
                                                    </a>
                                                ) : (
                                                    item.site
                                                )}
                                                <img
                                                    onClick={() => copyText(item.site)}
                                                    className='mx-2 w-3.5 sm:w-5 inline cursor-pointer'
                                                    src={copyIcon}
                                                    alt="copy"
                                                />
                                            </td>
                                            <td className='py-1 sm:text-center pl-2.5 sm:pl-0 text-left  w-32'>
                                                {item.username}
                                                <img
                                                    onClick={() => copyText(item.username)}
                                                    className='mx-2 w-3.5 sm:w-5 inline cursor-pointer'
                                                    src={copyIcon}
                                                    alt="copy"
                                                />
                                            </td>

                                            <td className='py-1 sm:text-center pl-2.5 sm:pl-0 text-left w-32'>
                                                {item.password}
                                                <img
                                                    onClick={() => copyText(item.password)}
                                                    className='mx-2 w-3.5 sm:w-5 inline cursor-pointer'
                                                    src={copyIcon}
                                                    alt="copy"
                                                />
                                            </td>
                                            <td className='py-1 sm:text-center pl-2.5 sm:pl-0 text-left  w-32'>
                                                <span onClick={() => { editPassword(item.id) }}><img className='cursor-pointer w-3.5 sm:w-5 inline mx-4' src={editIcon} alt="Edit button" /></span>
                                                <span onClick={() => { deletePassword(item.id) }}><img className='cursor-pointer w-3.5 sm:w-5 inline' src={trashIcon} alt="Delete button" /></span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    );
};
export default Manager;
