
const express = require('express')
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../../presentation/controllers/userController')
const { getAccountsByUser, createAccount } = require('../../presentation/controllers/accountController')
const router = express.Router()


router.get('/', (req, resp) => {
    resp.json({info: 'teste'})
})
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

router.get('/account/:user_id', getAccountsByUser)
router.post('/account', createAccount)

module.exports = router