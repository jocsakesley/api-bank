const pool = require('../settings').pool
const bcrypt = require('bcrypt');

class UserRepository {
    getAllUsers(req, resp) {
        pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
            if (error) {
                throw error
            }
            resp.status(200).json(results.rows)
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