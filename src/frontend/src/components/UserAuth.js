import BookingDataService from '../api/BookingDataService'
/**
 * Class to determine if a user is authenticeted or make the user authenticated
 */
class UserAuth{

    /**
     * Takes in a password, if password is true, return true and store JWT in local storage
     * If password is incorrect return false
     * @param {*} userPass 
     */
    authenticateUser(userPass){
        return new Promise((resolve, reject)  => {
            BookingDataService.authenticateUser(userPass).then((response) => {
                if (response.data){
                    localStorage.setItem('token', response.data.token)
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

    /**
     * Checks if user is authenticated 
     * @returns true if the token is teh correct one othervise returns false
     */
    isUserAuthenticated(){
        return new Promise((resolve, reject) => {
            BookingDataService.isUserAuthenticated().then((response) => {
                   resolve(response.data)
                }
            ).catch(error => {
                resolve(false)
            })
        })
    }
}

export default new UserAuth();