const { UserRepository } = require("../../infra/db/repositories/usersRepository")


const userQueryBalance = async (req, resp) => {
    try {
        const userRepository = new UserRepository()
        const user_id = parseInt(req.params.user_id)
        const account_id = parseInt(req.params.account_id)
        const result = await userRepository.queryBalance(user_id, account_id)
        resp.status(result.status).json(result.message)
    } catch (error) {
        resp.status(error.status).json(error.message)
    }
}

const userWithdraw = async (req, resp) => {
    try {
        const userRepository = new UserRepository()
        const user_id = parseInt(req.params.user_id)
        const account_id = parseInt(req.params.account_id)
        const { value } = req.body;
        let result = await userRepository.queryBalance(user_id, account_id)
        console.log("result", result)
        let balance = parseFloat(result.message.balance.replace("$", ""))
        if (balance < value ) {
            resp.status(400).json({message: "Você não tem saldo suficiente para realizar o saque", balance: result.message.balance})
        } else {
            balance -= value
            result = await userRepository.userUpdateBalance(user_id, account_id, balance)
            result = await userRepository.queryBalance(user_id, account_id)
            console.log("result", result)
            resp.status(result.status).json({message: "Saque realizado com sucesso", balance: result.message.balance})
        }
            
    } catch (error) {
        resp.status(error.status).json(error.message)
    }
}

const userDeposit = async (req, resp) => {
    try {
        const userRepository = new UserRepository()
        const user_id = parseInt(req.params.user_id)
        const account_id = parseInt(req.params.account_id)
        const { value } = req.body;
        let result = await userRepository.queryBalance(user_id, account_id)
        let balance = parseFloat(result.message.balance.replace("$", ""))

        balance += value
        result = await userRepository.userUpdateBalance(user_id, account_id, balance)
        result = await userRepository.queryBalance(user_id, account_id)
        resp.status(result.status).json({message: "Depósito realizado com sucesso", balance: result.message.balance})
                    
    } catch (error) {
        console.log(error)
        resp.status(error.status).json(error.message)
    }
}

const userTransfer = async (req, resp) => {
    try {
        const userRepository = new UserRepository()
        const user_id = parseInt(req.params.user_id)
        const account_id = parseInt(req.params.account_id)
        const { value, user_id_destination, account_id_destination } = req.body;
        let result = await userRepository.queryBalance(user_id, account_id)
        let balance = parseFloat(result.message.balance.replace("$", ""))
        if (balance < value ) {
            resp.status(400).json({message: "Você não tem saldo suficiente para fazer a tranferência", balance: result.message.balance})
        } else {
            balance -= value
            result = await userRepository.userUpdateBalance(user_id, account_id, balance)

            result = await userRepository.queryBalance(user_id_destination, account_id_destination)
            balanceDestination = parseFloat(result.message.balance.replace("$", ""))
            balanceDestination += value
            result = await userRepository.userUpdateBalance(user_id_destination, account_id_destination, balanceDestination)
            result = await userRepository.queryBalance(user_id, account_id)
            resp.status(result.status).json({message: "Tranferencia realizada com sucesso", balance: result.message.balance})
        }
    } catch (error) {
        console.log(error)
        resp.status(error.status).json(error.message)
    }
   
}

const getUsers = async (req, resp) => {
    try {
        const userRepository = new UserRepository()
        const result = await userRepository.getAllUsers(req, resp)
        resp.status(result.status).send(result.message)
    } catch (error) {
        resp.status(error.status).send(error.message)
    }
}

const getUserById = (req, resp) => {
  const userRepository = new UserRepository()
  userRepository.getOneUser(req, resp)
  }

const createUser = (req, resp) => {
    const userRepository = new UserRepository()
    userRepository.insertUser(req, resp)
  }

const updateUser = (req, resp) => {
    const userRepository = new UserRepository()
    userRepository.updateUser(req, resp)
  }

const deleteUser = (req, resp) => {
    const userRepository = new UserRepository()
    userRepository.deleteUser(req, resp)
  }


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    userQueryBalance,
    userWithdraw,
    userDeposit,
    userTransfer
  }