import {makeAutoObservable} from "mobx";
import axios from "axios";

export class User {
    user
    constructor(rootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
    }

    setUser = async () => {
        const email = localStorage.getItem('email')
        const response = await axios.get(`http://localhost:5000/users/${email}`)
        this.user = response.data
    }
}