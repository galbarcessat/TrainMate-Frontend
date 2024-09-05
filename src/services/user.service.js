
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
}

window.us = userService

async function getById(userId) {
    return await httpService.get(BASE_URL, userId)
    // return storageService.get(STORAGE_KEY, userId)
}

async function login({ email, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { email, password })
        if (user) return _setLoggedinUser(user)
    } catch (err) {
        console.log('err:', err)
        throw err
    }
    // const users = await storageService.query(STORAGE_KEY, { email, password })
    // const user = users.find(user => user.email === email)
    // if (user && user.password === password) return _setLoggedinUser(user)
    // else return Promise.reject('Invalid login')
}

async function signup({ email, password, fullname, imgUrl }) {
    const user = {
        email,
        password,
        fullname,
        imgUrl: imgUrl ? imgUrl : 'https://cdn1.monday.com/dapulse_default_photo.png'
    }
    try {
        const userResponse = await httpService.post(BASE_URL + 'signup', user)
        if (userResponse) return _setLoggedinUser(userResponse)
    } catch (err) {
        console.log('err:', err)
        throw err
    }
    // return storageService.post(STORAGE_KEY, user)
    //     .then(_setLoggedinUser(user))
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (error) {
        console.error(error)
        throw error
    }
    // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    // return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

// Test Data
// userService.signup({ email: 'nati@funday.com', password: 'nati', fullname: 'Nati Feldbaum', imgUrl : "https://res.cloudinary.com/ddcaqfqvh/image/upload/v1698620005/NatiImg_qvxcqb.png"})
// userService.signup({ email: 'gal@funday.com', password: 'gal', fullname: 'Gal Ben Natan' ,imgUrl : 'https://res.cloudinary.com/ddcaqfqvh/image/upload/v1698619973/GalImg_z8ivzb.png'})
// userService.signup({ email: 'omer@funday.com', password: 'omer', fullname: 'Omer Vered', imgUrl : "https://res.cloudinary.com/ddcaqfqvh/image/upload/v1698619996/OmerImg_svk1xe.png"})
// userService.login({email: 'muki', password: 'muki1'})



