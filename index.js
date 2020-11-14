const { ApolloServer } = require('apollo-server')


const typeDefs = `

    type Notebook{
        id: Int
        name: String
    }

    type TaskList {
        id: Int
        idNotebook: Int
        name: String
        color: String
    }

    type Task {
        id: String
        idList: Int
        checked: Boolean
        priority: Boolean
        note: String
        title: String
    }

    type Query {
        notebooks: [Notebook]
        tasklists: [TaskList]
        tasks (checked: Boolean): [Task]
    }

    input TaskInput {
        idList: Int
        checked: Boolean
        priority: Boolean
        note: String
        title: String
    }

    type Mutation {
        saveTask(task: TaskInput) : Task
    }

`
    const notebooks = [
        {id: 1, name: 'Pessoal'},
        {id: 2, name: 'Trabalho'},
        {id: 3, name: 'Freelance'}
      ]

    const taskLists = [
            {id: 3265987, idNotebook: 1, name: 'Mercado', color: '#000000'},
            {id: 1234567, idNotebook: 2, name: 'Trabalho', color: '#8600b3'},
            {id: 1478523, idNotebook: 1, name: 'Coisas Casa', color: '#70db70'},
            {id: 9632587, idNotebook: 1, name: 'Lazer', color: '#997a00'},
            {id: 7946135, idNotebook: 3, name: 'Concursos', color: '#babaca'}
        ]

    const tasks = [
                {idList: 3265987,  checked:false, priority: false, note : "Aqui vai a nota", title:"Maçã",id:1603473327910},
                {idList: 3265987,  checked:true, priority: false, note : "Aqui vai a nota", title:"Banana",id:1603473332177},
                {idList: 3265987,  checked:false, priority: false, note : "Aqui vai a nota", title:"Manga",id:1603473336494},
                {idList: 3265987,  checked:false, priority: false, note : "Aqui vai a nota", title:"Pera",id:1603412327910},
                {idList: 3265987,  checked:true, priority: false, note : "Aqui vai a nota", title:"Uva",id:1603473332327},
                {idList: 3265987,  checked:false, priority: false, note : "Aqui vai a nota", title:"Melancia",id:1656473336494},
                {idList: 3265987,  checked:false, priority: false, note : "Aqui vai a nota", title:"Abóbora",id:1603476327910},
                {idList: 3265987,  checked:true, priority: false, note : "Aqui vai a nota", title:"leite",id:1603473892177},
                {idList: 3265987,  checked:false, priority: false, note : "Aqui vai a nota", title:"Pão",id:1603473337894},
                {idList: 1234567,  checked:false, priority: false, note : "Aqui vai a nota", title:"Movimentações",id:1606789342139},
                {idList: 1234567,  checked:true, priority: false, note : "Aqui vai a nota", title:"Capturas",id:1603234346271},
                {idList: 1478523,  checked:false, priority: false, note : "Aqui vai a nota", title:"Pintar parede",id:1603476342139},
                {idList: 1478523,  checked:true, priority: false, note : "Aqui vai a nota", title:"Colocar Quadros",id:1603472346271},
                {idList: 9632587,  checked:false, priority: false, note : "Aqui vai a nota", title:"Praia",id:1603234340121},
                {idList: 9632587,  checked:false, priority: false, note : "Aqui vai a nota", title:"Casa de Campo",id:1641776342139},
                {idList: 9632587,  checked:true, priority: false, note : "Aqui vai a nota", title:"Andar de Bug",id:1603465746271},
                {idList: 7946135,  checked:false, priority: false, note : "Aqui vai a nota", title:"Analisar Edital",id:16034097646271}
              ]

const resolvers = {
    Query: {
        notebooks(){
            return notebooks
        },
        tasklists(){
            return taskLists
        },
        tasks(_, args){
            console.log(args)
            return tasks.filter( item => item.checked === args.checked)
        }
    },
        Mutation: {
            saveTask(_, args){
                const task = args.task
                task.id = Date.now()
                tasks.push(task)
            }
        }
}
const server = new ApolloServer( {typeDefs, resolvers} )
server.listen()