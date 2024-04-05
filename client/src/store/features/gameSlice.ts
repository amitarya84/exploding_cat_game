import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../App"


export type card = {
    type: string,
    emoji: string,
}

interface GameDataDb {
    "user_id": String,
    "username": String,
    "wins": Number,
    "loses": Number,
    "_id": String,
    "timestamp": String
}

interface InitialState {
    win: number,
    lose: number,
    hasDifuse: boolean,
    hasLost: boolean,
    hasWon: boolean,
    deck: card[],
    current_game_id: string | null,
    GameDataDb: GameDataDb[] | null
}

const initialState: InitialState = {
    win: 0,
    lose: 0,
    hasLost: false,
    hasWon: false,
    hasDifuse: false,
    current_game_id: null,
    deck: [
        {
            type: 'bomb',
            emoji: '💣'
        },
        {
            type: 'cat',
            emoji: '😺'
        },
        {
            type: 'defuse',
            emoji: '🌊'
        },
        {
            type: 'shuffle',
            emoji: '🔀'
        },
    ],
    GameDataDb: null
}

function shuffleDeckFunc(deck: card[]) {

    let shuffledDeck = [...deck];
    // let shuffledDeck = [...state.deck]; 
    let currentIndex = shuffledDeck.length;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
            shuffledDeck[randomIndex], shuffledDeck[currentIndex]];
    }

    console.log('shuffle deck')
    // deck = shuffledDeck;
    return shuffledDeck

}

function updateWinLoseToDb(current_game_id: string | null, win: boolean) {
    fetch(BASE_URL + 'game/udpate_current_game', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            current_game_id: current_game_id,
            game_data: {
                wins: win,
                loses: !win
              }
        })
    }).then(res => res.json())
    .then(data => {
        console.log('update data', data)
    }).catch(err => {
        console.log('update err', err)
    })
}


export const GameSlice = createSlice({
    name: 'deck',
    initialState,
    reducers: {
        incrementWinCount: (state) => {
            ++state.win
            state.hasWon = true;
            updateWinLoseToDb(state?.current_game_id, true)
        },
        incrementLoseCount: (state) => {
            ++state.lose
            state.hasLost = true;
            updateWinLoseToDb(state?.current_game_id, false)
        },
        shuffleDeck: (state) => {
            state.deck = shuffleDeckFunc(state.deck);
        },
        removeCardFromDeck: (state, payload: PayloadAction<card>) => {
            state.deck = state.deck.filter(card => card.type !== payload.payload.type);
        },
        resetDeck: (state) => {
            state.deck = shuffleDeckFunc(initialState.deck)
            state.hasDifuse = false;
            state.hasWon = false;
            state.hasLost = false;

        },
        collectDefuseCard: (state) => {
            state.hasDifuse = true;
        },
        removeDefuseCard: state => {
            state.hasDifuse = false;
        },
        setCurrentGameId: (state, payload: PayloadAction<{ current_game_id: string }>) => {
            state.current_game_id = payload.payload.current_game_id;
        },
        setCurrentGameDbData: (state, payload: PayloadAction<GameDataDb[]>) => {
            state.GameDataDb = payload.payload;
        }
    }
})


export default GameSlice.reducer;
export const {
    shuffleDeck, removeCardFromDeck, incrementWinCount,
    incrementLoseCount, resetDeck, collectDefuseCard,
    removeDefuseCard, setCurrentGameId, setCurrentGameDbData
} = GameSlice.actions;