import styles from './message.module.css'

interface props {
    message: string
}

export default function Message({ message }: props) {
    return (
        <div className={styles.container}>
            <h1>{message}</h1>
        </div>
    )
}
