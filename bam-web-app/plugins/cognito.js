import { CognitoUserPool } from 'amazon-cognito-identity-js'

export default ({ env }, inject) => {
  const userPool = new CognitoUserPool({
    UserPoolId: env.AWS_COGNITO_USERPOOLID,
    ClientId: env.AWS_COGNITO_CLIENTID
  })

  const cognito = {
    userPool,
    // some helpers
    getCurrentUserSession: () =>
      new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser()
        if (!cognitoUser) {
          return resolve(null)
        }
        cognitoUser.getSession((sessionError, session) => {
          if (sessionError) {
            return reject(sessionError)
          }
          resolve(session)
        })
      }),
    currentUserSignOut: () => {
      const cognitoUser = userPool.getCurrentUser()
      cognitoUser && cognitoUser.signOut()
    }
  }

  inject('cognito', cognito)
}
