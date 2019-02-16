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

app.post('/addBoard', (req, res) => {
    let {teamId} = req.body
    let newId = Math.max.apply(null, mockDB.boards.map(val => val.id))
    mockDB.boards.push({id: ++newId, teamId: +teamId, name: `New Board`})
    let boards = mockDB.boards.filter(val => val.teamId === +teamId)
    res.send(boards)
})
app.post('/addGoal', (req, res) => {
    let {boardId} = req.body
    let teamId = mockDB.boards.filter(val => val.id === boardId)[0].teamId
    let newId = Math.max.apply(null, mockDB.goals.map(val => val.id))
    mockDB.goals.push({id: ++newId, boardId, name: 'New Goal'})
    let board = mockDB.boards.filter(val => val.id === +teamId)[0]
    let goals = mockDB.goals.filter(val => val.boardId === +boardId).map(val => {
        let tasks = mockDB.tasks.filter(v => v.goalId === val.id)
        return {...val, tasks}
    })
    res.send({...board, goals})
})
app.post('/addTask', (req, res) => {
    let {goalId} = req.body
    let boardId = mockDB.goals.filter(val => val.id === +goalId)[0].boardId

    let newId = Math.max.apply(null, mockDB.tasks.map(val => val.id))
    mockDB.tasks.push({id: ++newId, task: "New Task", goalId, status: 'Added', assignedUser: false})
    
    let board = mockDB.boards.filter(val => val.id === +boardId)[0]
    let goals = mockDB.goals.filter(val => val.boardId === +boardId).map(val => {
        let tasks = mockDB.tasks.filter(v => v.goalId === val.id)
        return {...val, tasks}
    })
    res.send({...board, goals})
})

app.patch('/changeBoard', (req, res) => {
    let {id, name} = req.body
    let teamId = 0
    let newBoards = mockDB.boards.map(val => {
        if (val.id === id) {
            teamId = val.teamId
            return Object.assign({}, val, {name})
        }
        return val
    })

    mockDB.boards = newBoards

    res.send('done')
})
app.patch('/changeGoal', (req, res) => {
    let {id, name} = req.body
    let newGoals = mockDB.goals.map(val => {
        if (val.id === +id) {
            return Object.assign({}, val, {id, name})
        }
        return val
    })
    mockDB.goals = newGoals

    res.send('done')
})
app.patch('/changeTask', ({body}, res) => {
    let newTasks = mockDB.tasks.map(val => {
        if (val.id === +body.id) {
            return {...val, ...body}
        }
        return val
    })

    mockDB.tasks = newTasks

    res.send('done')
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
    let {goalId} = mockDB.tasks.filter(v => v.id === +id)[0]
    let {boardId} = mockDB.goals.filter(v => v.id === goalId)[0]

    mockDB.tasks.forEach(v => {
        if (v.id !== +id) {
            newTasks.push(v) 
        }
    })

    mockDB.tasks = newTasks

    let board = mockDB.boards.filter(val => val.id === boardId)[0]
    let goals = mockDB.goals.filter(val => val.boardId === +boardId).map(val => {
        let tasks = mockDB.tasks.filter(v => v.goalId === val.id)
        return {...val, tasks}
    })
    res.send({...board, goals})
})

app.listen(3434, _=> {
    console.log('everthing is running fine captain on port 3434')
})