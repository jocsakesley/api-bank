
class User {
    saldo = 0
    constructor(name, email, account) {
        this.name = name;
        this.email = email
        this.senha = senha
        this.account = account

    }

    query() {
        console.log(`Saldo atual R$${this.saldo}`)
    }

    sacar(valor) {
        if (valor > this.saldo) {
            console.log("Você não tem saldo suficiente para efetuar a transação")
        } else {
            this.saldo -= valor
            console.log(`Saque de R$${valor} efetuado com sucesso`)
        } 
    }

    depositar(valor) {
        this.saldo += valor
        console.log(`Valor de R$${valor} depositado. Saldo atual: R$ ${this.saldo}`)
    }

    transferir(user, valor) {
        console.log(`Transferindo valor de R$${valor} para ${user.name}...`)
        if (this.saldo) {
            this.saldo -= valor
            user.saldo += valor
        } else {
            console.log("Você não tem saldo suficiente para efetuar a transação")
        }
        
    }
}


const user = new User("jocsa", "jocsadm@gmail.com", "122312312321")

const user2 = new User("pedro", "pedro@gmail.com", "122312321")

user.consultar()
user.sacar(10)
user.depositar(20.43)
user.sacar(10)
user.consultar()
user.transferir(user2, 10)
console.log("--------------------------------")
user.consultar()
user2.consultar()


