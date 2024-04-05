import { FormEvent, useState } from 'react';
import { BASE_URL, PAGES } from '../../App';
import styles from './signup.module.css';
import { setUser } from '../../store/features/userSlice';
import { useAppDispatch } from '../../store/store';

export default function Signup({ setPage }: { setPage: (value: string) => void }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confiremPassword, setConfirmPassword] = useState('');

    const dispatch = useAppDispatch();

    function userSignup(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (username && password && password === confiremPassword) {
            fetch(`${BASE_URL}user/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res => {
                if (!res.ok) {
                    // setErrMsg(err.message)
                }
                console.log('signup res', res)
                return res.json()
                
            }).then(data => {
                console.log('response data', data)
                dispatch(setUser(data.user))
            }).catch(err => {
                // setErrMsg(err.message)
                console.error('err login', err)
            })
        }
    }


    return (
        <form onSubmit={userSignup} className={styles.signupForm}>
            <h3 className={styles.heading}>Exploding Cat Signup</h3>
            <input onChange={(e: FormEvent<HTMLInputElement>) => { setUserName(e.currentTarget.value) }} type="text" placeholder='Username' />
            <input onChange={(e: FormEvent<HTMLInputElement>) => { setPassword(e.currentTarget.value) }} type="password" placeholder='Password' />
            <input onChange={(e: FormEvent<HTMLInputElement>) => { setConfirmPassword(e.currentTarget.value) }} type="password" placeholder='Confirm Password' />
            <button>Submit</button>
            <p className={styles.links}>
                Already Have an account?
                <span onClick={() => { setPage(PAGES.LOG_IN) }} className={styles.signupBtn}> Login!</span>
            </p>
        </form>
    )
}
