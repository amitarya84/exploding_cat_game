import { SyntheticEvent, useState } from 'react';
import styles from './card.module.css';
import { useAppDispatch, useAppSelector } from '../store/store';
import { card, collectDefuseCard, incrementLoseCount, incrementWinCount, removeCardFromDeck, removeDefuseCard, resetDeck } from '../store/features/gameSlice';

interface props {
  card: card,
  diffuseBomb: () => void
}

export default function Card({ card, diffuseBomb }: props) {
  const [animate, setAnimate] = useState(false);
  const { deck, hasDifuse } = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();

  function checkCard(card: card) {

    if (deck.length === 1 && card.type !== 'bomb') {
      dispatch(incrementWinCount())
      setTimeout(() => {
        dispatch(resetDeck());
      }, (3200));
      return
    }

    if (card.type === 'cat') {
      dispatch(removeCardFromDeck(card))
    }
    if (card.type === 'shuffle') {
      dispatch(resetDeck());
    }
    if (card.type === 'bomb') {
      if (hasDifuse) {
        dispatch(removeCardFromDeck(card))
        dispatch(removeDefuseCard())
        diffuseBomb();
        return
      }

      dispatch(incrementLoseCount());
      setTimeout(() => {
        dispatch(resetDeck());
      }, (1000));
    }
    if (card.type === 'defuse') {
      dispatch(removeCardFromDeck(card))
      dispatch(collectDefuseCard());
    }

  }

  function removeCard(e: SyntheticEvent) {
    e?.currentTarget?.setAttribute('class', `${styles.card} ${styles.fade}`)
    e?.currentTarget.addEventListener('animationend', () => {
      setTimeout(() => {
        checkCard(card)
        console.log('animation ended')
      }, (200));
    })

  }

  function revealCard(e: SyntheticEvent) {
    console.log('card', card)
    switch (card.type) {
      case 'cat':
        console.log('cat', '😺');
        removeCard(e);
        break;
      case 'defuse':
        console.log('defuse', '🌊');
        removeCard(e)
        break;
      case 'shuffle':
        console.log('shuffle', '🔀');
        removeCard(e)
        break;
      case 'bomb':
        console.log('bom', '💣');
        removeCard(e)
        break;
    }
    setAnimate(true)
  }

  return (
    <div
      onClick={revealCard}
      // onMouseEnter={e => { setAnimate(true) }}
      // onMouseLeave={e => setAnimate(false)}
      className={`${styles.card} `}
    >
      <div className={`${styles.front} ${animate ? styles.animateCard : ''}`} >
        <p className={styles.text}>
          <span >{card.emoji}</span>
        </p>
        <p style={{ fontSize: '16px', textTransform: 'capitalize' }} className={styles.text}>{card.type}</p>
      </div>
      <div className={`${styles.back} ${animate ? styles.animateCard : ''}`}>
        <span className={''}>😸</span>
      </div>
    </div>
  )
}
