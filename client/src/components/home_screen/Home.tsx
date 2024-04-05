import { BASE_URL } from '../../App';
import { setCurrentGameDbData, setCurrentGameId } from '../../store/features/gameSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import styles from './Home.module.css';

export default function Home() {
  const user = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch();

  function startGame() {
    console.log(user)

    fetch(BASE_URL + "game/start", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user?._id
      })
    })
      .then(res => res.json())
      .then(data => {
        let cur_id = data.games.games[data.games.games.length - 1]._id;
        console.log('start game data', data, cur_id)
        dispatch(setCurrentGameId({ current_game_id: cur_id }))
        dispatch(setCurrentGameDbData(data.games.games))
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <div className={styles.container}>
      <h2>😼Exploading Cat!😼</h2>
      <button onClick={startGame} className={styles.startBtn}>Start Game</button>
    </div>
  )
}
