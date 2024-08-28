import { proxy } from 'valtio'

export default
    proxy({
        fire:false,
        startAnimation:false,
        infoPage: null,
        sound: false,
        firstSound: false,
        fly: false,
        stars: false,
        mounted: false,
        progress: 0,
        instructions: false,
        picturesMicro: false,
        picturesBrain: false,
        picturesGame: false,
        picturesButtonPressed: false,
    })