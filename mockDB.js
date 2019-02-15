module.exports = {
    teams: [{
        id: 1,
        users: ['John Henry', 'Mary Holland', 'Levi Aaron Straus']
    }],
    boards: [{
        id: 1,
        name: 'Test Board 1',
        teamId: 1
    },{
        id: 2,
        name: 'Test Board 2',
        teamId: 1
    },{
        id: 3,
        name: "you shouldn't see me",
        teamI: 2
    }],
    goals: [{
        id: 1,
        name: 'Goal 1',
        boardId: 1
    },{
        id: 2,
        name: 'Goal 2',
        boardId: 1
    },{
        id: 3,
        name: 'Goal 3',
        boardId: 1
    },{
        id: 4,
        name: 'Goal 4',
        boardId: 2
    }],
    tasks: [{
        id: 1,
        task: 'Task 1',
        status: 'Added',
        goalId: 1,
        assignedUser: false
    },{
        id: 2,
        task: 'Task 2',
        status: 'Added',
        goalId: 2,
        assignedUser: 'John Henry'
    },{
        id: 3,
        task: 'Task 3',
        status: 'Added',
        goalId: 2,
        assignedUser: 'John Henry'
    },{
        id: 4,
        task: 'Task 4',
        status: 'Added',
        goalId: 3,
        assignedUser: 'Mary Holland'
    },{
        id: 5,
        task: 'Task 5',
        status: 'Added',
        goalId: 3,
        assignedUser: 'Levi Aaron Straus'
    },{
        id: 6,
        task: 'Task 6',
        status: 'Added',
        goalId: 3,
        assignedUser: 'Levi Aaron Straus'
    },{
        id: 7,
        task: 'Task 7',
        status: 'Added',
        goalId: 4,
        assignedUser: 'John Henry'
    }]
}