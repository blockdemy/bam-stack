const { identityManager } = require('./identityManager')

export const authenticate = (Username, Password) => {
  return new Promise((resolve, reject) => {
    identityManager.user = Username
    identityManager.authenticationDetails = {
      Username,
      Password
    }

    identityManager.authenticate((err, userObject) => {
      if (err) {
        return reject(err)
      }
      return resolve(userObject)
    })
  })
}

export const resetPassword = newPassword => {
  return new Promise((resolve, reject) => {
    identityManager.user.completeNewPasswordChallenge(newPassword, null, {
      onSuccess() {
        resolve()
      },
      onFailure(err) {
        reject(err)
      }
    })
  })
}

export const logoutUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await identityManager.signout()
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export const checkCurrentState = () => {
  return new Promise((resolve, reject) => {
    identityManager.getStoredUserSession((err, userObject) =>
      err ? reject(err) : resolve(userObject)
    )
  })
}

export const forgotPassword = Username => {
  return new Promise((resolve, reject) => {
    identityManager.user = Username
    identityManager.user.forgotPassword({
      onSuccess: function(data) {
        // successfully initiated reset password request
        resolve(data)
      },
      onFailure: function(err) {
        reject(err)
      }
    })
  })
}

export const confirmPassword = (verificationCode, newPassword) => {
  return new Promise((resolve, reject) => {
    identityManager.user.confirmPassword(verificationCode, newPassword, {
      onSuccess() {
        resolve()
      },
      onFailure(err) {
        reject(err)
      }
    })
  })
}
