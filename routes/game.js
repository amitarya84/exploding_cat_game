const game = require('../modals/game');
const users = require('../modals/user');

const router = require('express').Router();

router.post('/start', async (req, res) => {
    console.log(req.body)
    const user_id = req.body.user_id;

    try {
        const userResp = await users.findOne({ _id: user_id });
        // console.log('usre resp', userResp)
        if (!userResp) {
            res.status(404).json({ message: "User Not Found!" })
            return
        }

        //if the game collection is already created
        const game_update_resp = await game.findOneAndUpdate({ user_id: userResp._id }, {
            $push: {
                games: [
                    {
                        user_id: userResp._id,
                        // username: userResp.username,
                        wins: 0,
                        loses: 0,
                    }
                ]
            }
        });
        console.log('game_update_resp', game_update_resp)

        const game_resp = await game.findOne({ user_id: userResp._id });
        //if game collection exist
        if (game_resp) {
            console.log(game_resp)
            res.json({
                message: 'Game Created with existing game collection Succesfully!',
                games: {
                    user_id: game_resp.user_id,
                    username: game_resp.username,
                    games: game_resp.games,
                    date: game_resp.date
                }
            })
            return
        }


        //if the game collection is not already created

        const gameResp = await game.create({
            user_id: userResp._id,
            username: userResp.username,
            totalWins: 0,
            totalLoses: 0,
            games: [
                {
                    user_id: userResp._id,
                    // username: userResp.username,
                    wins: 0,
                    loses: 0,
                }
            ]
        })

        console.log('Game Response', gameResp)

        res.json({
            message: 'Games Collection Created Succesfull!!',
            games: {
                user_id: gameResp.user_id,
                username: gameResp.username,
                games: gameResp.games,
                date: gameResp.date
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong!" })
        return
    }
})


router.post('/udpate_current_game', async (req, res) => {
    console.log(req.body)
    const current_game_id = req.body.current_game_id;
    const game_data = req.body.game_data;

    try {

        if (current_game_id) {
            console.log(game_data)

            if (game_data.wins) {
                const gameResp = await game.updateOne(
                    { games: { $elemMatch: {  _id: current_game_id } } },
                    {
                        $inc: {
                            "totalWins": 1,
                            "games.$.wins": 1
                        }
                    }
                )

                console.log('current game response', gameResp)
            }
            if (game_data.loses) {
                const gameResp = await game.updateOne( 
                    { games: { $elemMatch: { _id: current_game_id } } },
                    {
                        $inc: {
                            "totalLoses": 1,
                            "games.$.loses": 1
                        }
                    }
                )

                console.log('current game response', gameResp)
            }

            res.json({
                message: 'Game Data Updated Succesfully!',
            })
        }
        return
    } catch (err) {
        console.log(err)
    }
    res.json({
        message: 'Testing'
    })
})

router.get('/game_collection', async (req, res) => {
    console.log(req.body);
    const user_id = req.body.user_id;

    try {
        const game_collection_resp = await game.findOne({ user_id: user_id });
        if (game_collection_resp) {
            res.json({
                game: {
                    user_id: game_collection_resp.user_id,
                    games: game_collection_resp.games,
                    date: game_collection_resp.date
                }
            })
        } else {
            res.status(404).json({
                message: "Game Collection Not Found!",
            })
        }
    } catch (err) {
        console.log('err getting game collection', err)
        res.status(500).json({ message: "Something went wrong!" })
        return
    }
    
})

router.get('/score/:user_id', async (req, res) => {
    console.log(req.params)

    try{
        const gameResponse = await game.findOne({user_id: req.params.user_id});
        
        if(gameResponse){
            res.json({
                user_id: gameResponse.user_id,
                username: gameResponse.username,
                totalWins: gameResponse.totalWins,
                totalLoses: gameResponse.totalLoses,
            })
            return
        }

        res.status(500).json({
            message: "Something Went Wrong!"
        })
        
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Something Went Wrong!"
        })
    }
})

router.get('/leaderboard', async (req, res) => {
    try{
        const allGamesCollection = await game.find().sort({totalWins: -1});
        console.log(allGamesCollection)
        let leaderboardData = allGamesCollection.map(boards => {
            return {
                username: boards.username,
                totalWins: boards.totalWins,
                totalLoses: boards.totalLoses
            }
        })
        res.json({
            leaderboard: leaderboardData
        })
    }catch(err){
        console.log('leaderboard err', err)
    }
})
module.exports = router;