const pool = require('../settings').pool
const bcrypt = require('bcrypt');

class AccountRepository {
    getAccounts() {
        return new Promise((resolve, reject) => {
          pool.query('SELECT * FROM accounts ORDER BY id ASC', (error, results) => {
            if (error) {
              reject({
                status: 400,
                message: error.detail
              })
            } else {
              resolve({
                status: 200, 
                message: results.rows  
              })
            }
          })
        })
      }

    getAccountsByID(req) {
        const id = parseInt(req.params.id)
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM accounts WHERE id = $1',[id], (error, results) => {
            if (error) {
                reject({
                status: 400,
                message: error.detail
                })
            } else {
                resolve({
                status: 200, 
                message: results.rows  
                })
            }
            })
        })
    }

    getAccountsByUser(req) {
        const user_id = parseInt(req.params.user_id)
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM accounts a INNER JOIN users u ON a.id_user = u.id WHERE u.id = $1',[user_id], (error, results) => {
            if (error) {
                reject({
                status: 400,
                message: error.detail
                })
            } else {
                resolve({
                status: 200, 
                message: results.rows  
                })
            }
            })
        })
    }
    createAccount(req) {
        const { id_user, number, agency, balance } = req.body;  
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO accounts (id_user, number, agency, balance) VALUES ($1, $2, $3, $4) RETURNING *', 
            [id_user, number, agency, balance], (error, results) => {
            if (error) {
                reject({
                status: 400,
                message: error.detail
                })
            } else {
                resolve({
                status: 201, 
                message: `Account added with ID: ${results.rows[0].id}`  
                })
            }
            })
        })
        
    }

    updateAccount(req) {
        const id = parseInt(req.params.id) 
        let query = 'UPDATE accounts SET '
        let i = 1
        for (const key of Object.keys(req.body)) {
            query += `${key} = $${i} `
            i += 1
        }
        query += `WHERE id = $${i}`       
        return new Promise((resolve, reject) => {
            pool.query(query, [...Object.values(req.body), id], (error, results) => {
            if (error) {
                reject({
                status: 400,
                message: error.detail
                })
            } else {
                resolve({
                status: 200, 
                message: `Account modified with ID: ${id}` 
                })
            }
            })
        })
    }

    deleteUser(req) {
        const id = parseInt(req.params.id)
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject({
                status: 400,
                message: error.detail
                })
            } else {
                resolve({
                status: 200, 
                message: `Account deleted with ID: ${id}` 
                })
            }
            })
        })
    }
}

module.exports = {
    AccountRepository
  }