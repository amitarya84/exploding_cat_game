import { useEffect, useState } from 'react';
import './App.css'
import CardContainer from './components/cardContainer'
import { useAppSelector } from './store/store'
import Home from './components/home_screen/Home';
import LoginForm from './components/login/loginForm';
import Signup from './components/login/signup';

export const PAGES = {
  LOG_IN: "LOG_IN",
  SIGN_UP: "SIGN_UP",
  HOME: "HOME",
  GAME: "GAME"
}

// export const BASE_URL = 'http://localhost:4000/';
export const BASE_URL = window.location.href;

function App() {
  const deck = useAppSelector(state => state.game.deck);
  // const [started, setStarted] = useState(false);
  const [page, setPage] = useState(PAGES.HOME);

  const user = useAppSelector(state => state.user.user)
  const current_game_id = useAppSelector(state => state.game.current_game_id)

  useEffect(() => {
    if(user?._id){
      setPage(PAGES.HOME)
    }else{
      setPage(PAGES.LOG_IN)
    }
  }, [user])

  useEffect(() => {
    console.log('curret game id', current_game_id)
    if(current_game_id){
      setPage(PAGES.GAME)
    }
  }, [current_game_id])
  

  return (
    <div className={'app'}>
      {page == PAGES.LOG_IN ? <LoginForm setPage={setPage} /> : '' }
      {page == PAGES.SIGN_UP ? <Signup setPage={setPage} /> : '' }

      {page == PAGES.HOME ? <Home /> : ''}
      {page == PAGES.GAME ? <CardContainer cards={deck} /> : ''}
    </div>
  )
}

export default App
