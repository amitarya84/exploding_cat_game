import { useEffect, useState } from 'react';
import Card from './card';
import styles from './cardContainer.module.css';
import { useAppDispatch, useAppSelector } from '../store/store';
import { card, shuffleDeck } from '../store/features/gameSlice';
import Message from './Message';
import Popup from './Popup';
import WinPopup from './winPopup';


export default function CardContainer({ cards }: { cards: card[] }) {
    const { win, lose, hasLost, hasWon, hasDifuse } = useAppSelector(state => state.game);
    const dispatch = useAppDispatch();
    const [showDiffused, setShowDefused] = useState<boolean>(false);

    useEffect(() => {
        dispatch(shuffleDeck())
    }, [])

    function diffuseBomb() {
        setShowDefused(true);

        setTimeout(() => {
            setShowDefused(false);
        }, (1000));
    }

    const MiniDefuseCard = () => {
        return (
            <div className={styles.miniDifuseCard}>
                <p className={styles.miniCardIcon}>🌊</p>
                <p>Diffuse</p>
            </div>
        )
    }

    return (
        <>
            <div className={styles.infoContainer}>
                <div>
                    <p><span>Win: {win}</span> </p>
                    <p><span>Lose: {lose}</span></p>
                </div>
                {hasDifuse && <MiniDefuseCard />}
            </div>
            <div className={styles.cardContainer}>
                {
                    cards?.map(card => <Card diffuseBomb={diffuseBomb} key={card.type + Math.random()} card={card} />)
                }
            </div>
            {/* {!showDiffused && <Popup message='💣Bomb Diffused🌊' />} */}
            {showDiffused && <Popup message='💣Bomb Diffused🌊' />}
            {hasLost && <Message message='You Loose..!' />}
            {/* {hasWon && <Message message='You Won..!' />} */}
            {/* {hasWon && <Popup message='🥳You Won🥳' />} */}
            {hasWon && <WinPopup message='🥳You Won🥳' />}
        </>
    )
}
