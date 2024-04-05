import styles from './Popup.module.css'

export default function Popup({ message }: { message: string }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.msg}>{message}</h1>
        </div>
    )
}
