const pool = require('../settings').pool
const bcrypt = require('bcrypt');

class AccountRepository {
    getAccountsByUser(req, resp) {
        const user_id = parseInt(req.params.user_id)
        console.log(user_id)
  
        pool.query('SELECT * FROM accounts a INNER JOIN users u ON a.id_user = $1', [user_id], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        resp.status(200).json(results.rows)
    })
    }
    createAccount(req, resp) {
        const { id_user, number, agency, balance } = req.body;  
        pool.query('INSERT INTO accounts (id_user, number, agency, balance) VALUES ($1, $2, $3, $4) RETURNING *', 
        [id_user, number, agency, balance], (error, results) => {
          if (error) {
            console.log(error)
            resp.status(400).send({error: error.detail})
            // throw error
          } else {
            resp.status(201).send(`Account added with ID: ${results.rows[0].id}`)
          }
          
        })
    }

    // updateUser(req, resp) {
    //     const id = parseInt(req.params.id)
    //     let { name, email, senha } = req.body
    //     senha = bcrypt.hashSync(senha, 10)  
    //     pool.query(
    //       'UPDATE users SET name = $1, email = $2, senha = $3 WHERE id = $4',
    //       [name, email, senha, id],
    //       (error, results) => {
    //         if (error) {
    //           throw error
    //         }
    //         resp.status(200).send(`User modified with ID: ${id}`)
    //       }
    //     )
    // }

    // deleteUser(req, resp) {
    //     const id = parseInt(req.params.id)
  
    //     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     resp.status(200).send(`User deleted with ID: ${id}`)
    //     })
    // }
}

module.exports = {
    AccountRepository
  }