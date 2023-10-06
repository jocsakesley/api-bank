const { UserRepository } = require("../../infra/db/repositories/usersRepository")


const getUsers = (req, resp) => {
  const userRepository = new UserRepository()
  userRepository.getAllUsers(req, resp)
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
  }