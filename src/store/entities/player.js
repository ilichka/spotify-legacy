import {makeAutoObservable} from "mobx";

export class Player {
    currentTime= 0
    duration= 0
    active= null
    volume= 50
    pause= true
    constructor() {
        makeAutoObservable(this)
    }

    pauseTrack = () => {
        this.pause = true
    }

    playTrack = () => {
        this.pause = false
    }

    setCurrentTime = (currentTime) => {
        this.currentTime = currentTime
    }

    setVolume = (volume) => {
        this.volume = volume
    }

    setDuration = (duration) => {
        this.duration = duration
    }

    setActive = (active) => {
        this.active = active
        this.duration = 0
        this.currentTime = 0
        this.pause = true
    }
}