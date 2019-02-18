export class Board {
    id: number
    name: string
    teamId: number
  }
  
export class Goal {
    id: number
    name: string
    boardId: number
    tasks: Task[]
  }
  
export class Task {
    id: number
    task: string
    status: string
    goalId: number
    assignedUser: any
  }
  
export class SingleBoard {
    id: number
    name: string
    teamId: number
    goals: Goal[]
  }