const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const { AuthenticationDetails } = AmazonCognitoIdentity
const { CognitoUserPool, CognitoUser } = AmazonCognitoIdentity

const UserPoolId = process.env.AWS_COGNITO_USERPOOLID
const ClientId = process.env.AWS_COGNITO_CLIENTID

class IdentityManager {
  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId,
      ClientId
    })
  }

  set user(Username) {
    const userData = {
      Username,
      Pool: this.userPool
    }
    this.cognitoUser = new CognitoUser(userData)
  }

  get user() {
    return this.cognitoUser
  }

  get userAccess() {
    return this.access
  }

  set authenticationDetails(authenticationData) {
    this.authentication = new AuthenticationDetails(authenticationData)
  }

  get authenticationDetails() {
    return this.authentication
  }

  signout() {
    if (this.cognitoUser) {
      return this.cognitoUser.signOut()
    }
  }

  getStoredUserSession(cb = () => false) {
    const user = this.currentUser || this.userPool.getCurrentUser()
    if (user) {
      this.cognitoUser = user
      this.cognitoUser.getSession((err, session) => {
        if (!err && session.isValid()) {
          this.getSessionAttributes(session, cb)
        }
      })
    } else {
      return cb()
    }
  }

  getSessionAttributes(authResult, cb = () => false) {
    const accessToken = authResult.getAccessToken().getJwtToken()
    const idToken = authResult.getIdToken().getJwtToken()
    this.user.getUserAttributes((error, result) => {
      if (error) {
        return cb(error)
      }

      const attributes = result.reduce((prev, next) => {
        prev[next.getName()] = next.getValue()
        return prev
      }, {})

      // the api doesn't accept this field back
      delete attributes.email_verified

      this.access = {
        ...attributes,
        accessToken,
        idToken
      }

      return cb(null, this.access)
    })
  }

  authenticate(cb) {
    const that = this // authenticate callbacks are given local function execution context.
    this.user.authenticateUser(this.authenticationDetails, {
      onSuccess(result) {
        return that.getSessionAttributes(result, cb)
      },
      onFailure: function(error) {
        return cb(error, null)
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.

        // the api doesn't accept this field back
        delete userAttributes.email_verified
        return cb(new NewPasswordError(userAttributes, requiredAttributes))
        // store userAttributes on global variable
        // sessionUserAttributes = userAttributes
      }
    })
  }
}

export const identityManager = new IdentityManager()

if (!process.server) {
  identityManager.currentUser = identityManager.userPool.getCurrentUser()
}

export class NewPasswordError extends Error {
  constructor(userAttributes, requiredAttributes, ...params) {
    super(...params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NewPasswordError)
    }
    this.name = 'NEW_PASSWORD_REQUIRED'
    this.message = 'Please reset your password.'
    this.data = {
      userAttributes,
      requiredAttributes
    }
  }
}
