import { FormEvent, useState } from 'react';
import { BASE_URL, PAGES } from '../../App';
import styles from './loginForm.module.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/features/userSlice';

export default function LoginForm({ setPage }: { setPage: (value: string) => void }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const dispatch = useDispatch();

    function userLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(username, password)

        fetch(`${BASE_URL}user/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            if(!res.ok){
                setErrMsg(res.status.toString())
            }
            return res.json()
        })
            .then(data => {
                console.log('response data', data)
                dispatch(setUser(data.user))
            }).catch(err => {
                setErrMsg(err.message)
                console.error('err login', err)
            })
    }

    return (
        <form onSubmit={userLogin} className={styles.loginForm}>
            <h3 className={styles.heading}>Exploding Cat Login</h3>
            <input onChange={(e: FormEvent<HTMLInputElement>) => { setUserName(e.currentTarget.value) }} type="text" placeholder='Username' />
            <input onChange={(e: FormEvent<HTMLInputElement>) => { setPassword(e.currentTarget.value) }} type="password" placeholder='Password' />
            <button>Submit</button>
            <p className={styles.links}>New Here? <span onClick={() => { setPage(PAGES.SIGN_UP) }} className={styles.signupBtn}>Signup!</span></p>
            <p style={{color: 'red', fontSize: '14px'}}>{errMsg}</p>
        </form>
    )
}
