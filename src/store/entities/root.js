import {Auth} from "./auth";
import {User} from "./user";
import {makeAutoObservable} from "mobx";
import {Player} from "./player";
import {Track} from "./track";

export class RootStore {
    loading = true
    constructor() {
        makeAutoObservable(this)
        this.auth = new Auth(this)
        this.user = new User(this)
        this.player = new Player(this)
        this.track = new Track(this)
    }

    init = async () => {
        if(localStorage.getItem('token')) {
            this.auth.setLoggedIn(true)
            await this.user.setUser()
        }
        this.loading = false
    }
}