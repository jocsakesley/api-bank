const pool = require('../settings').pool
const bcrypt = require('bcrypt');

class UserRepository {

    queryBalance(user_id, account_id) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT a.agency, a.number, a.balance FROM users u INNER JOIN accounts a ON u.id = a.id_user WHERE u.id = $1 AND a.id = $2",[user_id, account_id], (error, results) => {
              if (error) {
                reject({
                  status: 400,
                  message: error.detail
                })
              } else {
                resolve({
                  status: 200, 
                  message: results.rows[0]  
                })
              }
            })
          })
    }

    userUpdateBalance(user_id, account_id, newBalance) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE accounts SET balance = $1 WHERE id_user = $2 AND id = $3',
            [newBalance, user_id, account_id], (error, results) => {
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

    userUpdateBalanceByAccount(agency, number, newBalance) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE accounts SET balance = balance + $1 WHERE agency = $2 AND number = $3',
            [newBalance, agency, number], (error, results) => {
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


    userWithdraw(req) {
        const account_id = parseInt(req.params.account_id)
        const user_id = parseInt(req.params.user_id)
        let { value } = req.body;
        return new Promise((resolve, reject) => {
            pool.query("SELECT a.agency, a.number, a.balance FROM users u INNER JOIN accounts a ON u.id = a.id_user WHERE u.id = $1",[id], (error, results) => {
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

    getAllUsers() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
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

    getOneUser(req, resp) {
        const id = parseInt(req.params.id)
  
        pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        resp.status(200).json(results.rows[0])
    })
    }
    insertUser(req, resp) {
        let { name, email, senha } = req.body;
        senha = bcrypt.hashSync(senha, 10)  
        pool.query('INSERT INTO users (name, email, senha) VALUES ($1, $2, $3) RETURNING *', [name, email, senha], (error, results) => {
          if (error) {
            throw error
          }
          resp.status(201).send(`User added with ID: ${results.rows[0].id}`)
        })
    }

    updateUser(req, resp) {
        const id = parseInt(req.params.id)
        let { name, email, senha } = req.body
        senha = bcrypt.hashSync(senha, 10)  
        pool.query(
          'UPDATE users SET name = $1, email = $2, senha = $3 WHERE id = $4',
          [name, email, senha, id],
          (error, results) => {
            if (error) {
              throw error
            }
            resp.status(200).send(`User modified with ID: ${id}`)
          }
        )
    }

    deleteUser(req, resp) {
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        resp.status(200).send(`User deleted with ID: ${id}`)
        })
    }
}

module.exports = {
    UserRepository
  }