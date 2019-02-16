const express = require('express')
    , bodyParser = require('body-parser')
    , mockDB = require('./mockDB')
    , cors = require('cors')

const app = new express()
app.use(bodyParser.json())
app.use(cors())

app.get('/teamBoards/:id', (req, res) => {
    let {id} = req.params
    let boards = mockDB.boards.filter(val => val.teamId === +id)
    res.send(boards)
})
app.get('/board/:id', (req, res) => {
    let {id} = req.params
    let board = mockDB.boards.filter(val => val.id === +id)[0]
    let goals = mockDB.goals.filter(val => val.boardId === +id).map(val => {
        let tasks = mockDB.tasks.filter(v => v.goalId === val.id)
        return {...val, tasks}
    })
    res.send({...board, goals})
})
app.get('/teamMates/:id', (req, res) => {
    let {id} = req.params
    let team = mockDB.teams.filter(val => val.id === +id)[0]
    res.send(team.users)
})

app.post('/addBoard', ({body}, res) => {
    let newId = Math.max.apply(null, mockDB.boards.map(val => val.id))
    mockDB.boards.push({id: ++newId, ...body})
    let boards = mockDB.boards.filter(val => val.teamId === +body.teamId)
    res.send(boards)
})
app.post('/addGoal', ({body}, res) => {
    let newId = Math.max.apply(null, mockDB.goals.map(val => val.id))
    mockDB.goals.push({id: ++newId, ...body})
    let goals = mockDB.goals.filter(val => val.boardId === +body.boardId).map(val => {
        let tasks = mockDB.tasks.filter(v => v.goalId === val.id)
        return {...val, tasks}
    })
    res.send(goals)
})
app.post('/addTask', ({body}, res) => {
    let newId = Math.max.apply(null, mockDB.tasks.map(val => val.id))
    mockDB.tasks.push({id: ++newId, ...body, status: 'Added', assignedUser: false})
    let tasks = mockDB.tasks.filter(val => val.goalId === +body.goalId)
    res.send(tasks)
})

app.patch('/changeGoal', ({body}, res) => {
    let newGoals = mockDB.goals.map(val => {
        if (val.id === +body.id) {
            return Object.assign({}, val, body)
        }
        return val
    })
    mockDB.goals = newGoals
    let goals = mockDB.goals.filter(val => val.boardId === +body.id).map(val => {
        let tasks = mockDB.tasks.filter(v => v.goalId === val.id)
        return {...val, tasks}
    })
    res.send(goals)
})
app.patch('/changeTask', ({body}, res) => {
    let {goalId} = mockDB.tasks.filter(val => val.id === body.id)[0] 

    let newTasks = mockDB.tasks.map(val => {
        if (val.id === +body.id) {
            return {...val, ...body}
        }
        return val
    })

    mockDB.tasks = newTasks
    
    let { boardId } = mockDB.goals.filter(val => val.id === goalId)[0]
    let board = mockDB.boards.filter(val => val.id === boardId)[0]
    let goals = mockDB.goals.filter(val => val.boardId === boardId).map(val => {
        let tasks = mockDB.tasks.filter(v => v.goalId === val.id)
        return {...val, tasks}
    })
    res.send({...board, goals})
})

app.delete('/removeBoard/:team', ({query, params}, res) => {
    let newTasks = []
    let newGoals = []
    let newBoards = []

    mockDB.goals.forEach(val => {
        if (val.boardId === +query.id) {
        } else {
            newGoals.push(val)
            mockDB.tasks.forEach(v => {
                if (v.goalId === val.id) {
                    newTasks.push(v) 
                }
            })
        }
    })
    mockDB.boards.forEach(val => val.id !== +query.id ? newBoards.push(val) : null)

    mockDB.boards = newBoards
    mockDB.goals = newGoals
    mockDB.tasks = newTasks

    let boards = mockDB.boards.filter(val => val.teamId === +params.team)
    res.send(boards)
})
app.delete('/removeGoal/:id', (req, res) => {
    let {id} = req.params
    let newTasks = []
    let newGoals = []
    let {boardId} = mockDB.goals.filter(val => val.id === +id)[0]

    mockDB.goals.forEach(val => {
        if (val.id !== +id) {
            newGoals.push(val)
            mockDB.tasks.forEach(v => {
                if (v.goalId === val.id) {
                    newTasks.push(v) 
                }
            })
        }
    })

    mockDB.goals = newGoals
    mockDB.tasks = newTasks

    let board = mockDB.boards.filter(val => val.id === boardId)[0]
    let goals = mockDB.goals.filter(val => val.id !== +id).map(val => {
        let tasks = mockDB.tasks.filter(v => v.goalId === val.id)
        return {...val, tasks}
    })
    res.send({...board, goals})
})
app.delete('/removeTask/:id', (req, res) => {
    let {id} = req.params
    let newTasks = []
    let {goalId} = mockDB.tasks.filter(val => val.id === +id)[0]

    mockDB.tasks.forEach(v => {
        if (v.id !== +id) {
            newTasks.push(v) 
        }
    })

    mockDB.tasks = newTasks

    let tasks = mockDB.tasks.filter(v => v.goalId === goalId)

    res.send(tasks)
})

app.listen(3434, _=> {
    console.log('everthing is running fine captain on port 3434')
})