import {makeAutoObservable} from "mobx";
import axios from "axios";

export class Track {
    tracks = []
    error = ''
    constructor() {
        makeAutoObservable(this)
    }

    fetchTracks = async () => {
        const response = await axios.get('http://localhost:5000/track')
        this.tracks = response.data
    }

    searchTracks = async (query) => {
        const response = await axios.get(`http://localhost:5000/track/search?query=${query}`)
        this.tracks = response.data
    }
}