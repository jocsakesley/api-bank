const { AccountRepository } = require("../../infra/db/repositories/accountRepository")


const getAccountsByUser = (req, resp) => {
  const accountRepository = new AccountRepository()
  accountRepository.getAccountsByUser(req, resp)
}

const createAccount = (req, resp) => {
  const accountRepository = new AccountRepository()
  accountRepository.createAccount(req, resp)
  }

  module.exports = {
    getAccountsByUser,
    createAccount
  }
