import styles from './winPopup.module.css';

export default function WinPopup({ message }: { message: string }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.msg}>{message}</h1>
        </div>
    )
}
