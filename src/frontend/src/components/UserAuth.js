import BookingDataService from '../api/BookingDataService'

class UserAuth{

    /**
     * Takes in a password, if password is true, return true and store JWT in local storage
     * If password is incorrect return false
     * @param {*} userPass 
     */
    authenticateUser(userPass){
        return new Promise((resolve, reject)  => {
            BookingDataService.checkPassword(userPass).then((response) => {
                if (response.data){
                    localStorage.setItem('token', response.data)
                    resolve(true)
                } else {
                    resolve(false)
                }
            }).catch(error => {
                resolve(false)
            })
        })
    }

    /**
     * Removes JWT from localstorage
     */
    logOutUser(){
        localStorage.removeItem('token')
    }

    isUserAuthenticated(){
        return new Promise((resolve, reject) => {
            BookingDataService.checkAuthorizeUser(localStorage.getItem('token')).then((response) => {
                   resolve(response.data)
                }
            ).catch(error => {
                resolve(false)
            })
        })
    }
}

export default new UserAuth();