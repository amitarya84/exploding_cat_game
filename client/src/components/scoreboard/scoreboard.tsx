import { useEffect, useState } from "react"
import { BASE_URL } from "../../App"
import styles from './scoreboard.module.css';

export default function Scoreboard() {

    const [leaderboard, setLeaderboard] = useState([]);

    function getLeaderboard() {
        fetch(BASE_URL + "game/leaderboard")
            .then(res => res.json())
            .then(data => {
                console.log(data.leaderboard)
                setLeaderboard(data?.leaderboard)
            })
    }

    useEffect(() => {
        getLeaderboard()
    }, [])

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Leaderboard</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Wins</th>
                        <th>Loses</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard?.map((data: any) => (
                        <tr>
                            <td>
                                {data?.username}
                            </td>
                            <td>
                                {data?.totalWins}
                            </td>
                            <td>
                                {data?.totalLoses}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
