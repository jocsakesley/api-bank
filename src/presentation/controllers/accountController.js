const { AccountRepository } = require("../../infra/db/repositories/accountRepository")


// const getAccounts = (req, resp) => {
//   const accountRepository = new AccountRepository()
//   const result = accountRepository.getAccounts()
//   resp.status(result.status).json(result.message)
// }

const getAccounts = async (req, resp) => {
    try {
      const accountRepository = new AccountRepository()
      const result = await accountRepository.getAccounts()
      resp.status(result.status).json(result.message)
    } catch (error) {
      resp.status(error.status).json(error.message)  
    }
  
  }

const getAccountsByUser = async (req, resp) => {
    try {
        const accountRepository = new AccountRepository()
        const result = await accountRepository.getAccountsByUser(req)
        resp.status(result.status).json(result.message)
    } catch (error){
        resp.status(error.status).json(error.message) 
    }
    
  }

const createAccount = async (req, resp) => {
    try {
        const accountRepository = new AccountRepository()
        const result = await accountRepository.createAccount(req, resp)
        resp.status(result.status).json(result.message)
    } catch (error) {
        resp.status(error.status).json(error.message) 
    }
  
  }

const updateAccount = async (req, resp) => {
    try {
        const accountRepository = new AccountRepository()
        const result = await accountRepository.updateAccount(req, resp)
        resp.status(result.status).json(result.message)
    } catch (error) {
        resp.status(error.status).json(error.message) 
    }
}

  module.exports = {
    getAccounts,
    createAccount,
    updateAccount,
    getAccountsByUser
  }
