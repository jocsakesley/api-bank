
const express = require('express')
const { getUsers, getUserById, createUser, updateUser, deleteUser, userQueryBalance, userWithdraw, userDeposit, userTransfer } = require('../../presentation/controllers/userController')
const { createAccount, updateAccount, getAccounts, getAccountsByUser } = require('../../presentation/controllers/accountController')
const router = express.Router()


router.get('/', (req, resp) => {
    resp.json({info: 'teste'})
})
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.get('/users/:user_id/account/:account_id/balance', userQueryBalance)
router.put('/users/:user_id/account/:account_id/withdraw', userWithdraw)
router.put('/users/:user_id/account/:account_id/deposit', userDeposit)
router.post('/users/:user_id/account/:account_id/transfer', userTransfer)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

router.get('/accounts', getAccounts)
router.get('/users/:user_id/accounts', getAccountsByUser)
router.post('/accounts', createAccount)
router.put('/accounts/:id', updateAccount)

module.exports = router