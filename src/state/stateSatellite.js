import { proxy } from 'valtio'

export default
    proxy({
        fire:false,
        startAnimation:false,
        infoPage: null,
        sound: false,
        fly: false,
        stars: false,
        mounted: false,
        progress: 0,
    })