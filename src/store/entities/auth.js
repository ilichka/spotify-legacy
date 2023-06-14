import {makeAutoObservable} from "mobx";
import axios from "axios";

export class Auth {
    loggedIn = false
    constructor(rootStore) {
        makeAutoObservable(this)
       this.rootStore = rootStore
    }

    setUser = (email) => {
        this.rootStore.user.setUser(email)
    }

    login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {email, password})
            this.setLoggedIn(true)
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('email',email)
            this.setUser(email)
        } catch (e) {
        }
        //init func
    }

    logout = async () => {
        this.loggedIn = false
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    }

    setLoggedIn = (val) => {
        console.log(val)
        this.loggedIn = val
    }

    register = async (email, password, date, sex) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/registration', {email, password, date, sex})
            this.setLoggedIn(true)
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('email',email)
            this.setUser(email)
        } catch (e) {
        }
        //init func
    }
}