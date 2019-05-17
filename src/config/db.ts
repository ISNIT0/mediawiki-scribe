// import * as convict from 'convict'

// const postgresConfig = convict({
//   dbHost: {
//     doc: 'Database host name/IP',
//     format: '*',
//     default: 'localhost',
//     env: 'DATABASE_HOST',
//   },
//   dbUser: {
//     doc: 'Database authenticaton username',
//     format: String,
//     default: 'della-test',
//     env: 'DATABASE_USERNAME',
//   },
//   dbPassword: {
//     doc: 'Database authenticaton password',
//     format: String,
//     default: 'della-test',
//     env: 'DATABASE_PASSWORD',
//   },

//   dbName: {
//     doc: 'Postgre default database name',
//     format: String,
//     default: 'della-test',
//     env: 'DATABASE_NAME',
//   },
//   useSsl: {
//     doc: 'Flag whether postgres should use ssl or not',
//     format: Boolean,
//     default: false,
//     env: 'DATABASE_USE_SSL',
//   },
// })

// // lets use codeship default postgre if inside ci
// if (process.env.CI) {
//   postgresConfig.set('dbUser', process.env.PGUSER)
//   postgresConfig.set('dbPassword', process.env.PGPASSWORD)
//   postgresConfig.set('dbName', 'test')
// }

// const { dbHost, dbUser, dbPassword, dbName } = postgresConfig.get()
// export { postgresConfig }
// export const postgresDefault = `postgresql://${dbUser}:${dbPassword}@${dbHost}/${dbName}`
