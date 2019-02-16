import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

class Board {
  id: number
  name: string
  teamId: number
}

class Goal {
  id: number
  name: string
  boardId: number
  tasks: Task[]
}

class Task {
  id: number
  task: string
  status: string
  goalId: number
  assignedUser: any
}

class SingleBoard {
  id: number
  name: string
  teamId: number
  goals: Goal[]
}

@Injectable({
  providedIn: 'root'
})

export class HttpcallsService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed`, error)
      return of(result as T)
    }
  }

  getBoards(id): Observable<Board[]> {
    return this.http.get<Board[]>(`http://localhost:3434/teamBoards/${id}`)
      .pipe(
        tap(_ => console.log, catchError(this.handleError('get boards by team', [])))
      )
  }

  getBoard(id): Observable<SingleBoard> {
    return this.http.get<SingleBoard>(`http://localhost:3434/board/${id}`)
      .pipe(
        tap(_ => console.log, catchError(this.handleError('get board info', [])))
      )
  }

  // POSTS

  addBoard(): Observable<Board[]> {
    return this.http.post<Board[]>(`http://localhost:3434/addBoard`,{teamId: 1})
      .pipe(
        tap(_ => console.log, catchError(this.handleError('add board', [])))
      )
  }

  addGoal(boardId): Observable<Goal[]> {
    console.log(boardId)
    return this.http.post<Goal[]>(`http://localhost:3434/addGoal`,{boardId})
      .pipe(
        tap(_ => console.log, catchError(this.handleError('add board', [])))
      )
  }
  
  // PATCH

  changeBoard(id, name): Observable<Board[]> {
    return this.http.patch<Board[]>(`http://localhost:3434/changeBoard`,{id, name})
      .pipe(
        tap(_ => console.log, catchError(this.handleError('add board', [])))
      )
  }

  // DELETE

  deleteBoard(teamId, boardId): Observable<Board[]> {
    return this.http.delete<Board[]>(`http://localhost:3434/removeBoard/${teamId}?id=${boardId}`)
      .pipe(
        tap(_ => console.log, catchError(this.handleError('delete', [])))
      )
  }

  deleteGoal(id): Observable<Board[]> {
    return this.http.delete<Board[]>(`http://localhost:3434/removeGoal/${id}`)
      .pipe(
        tap(_ => console.log, catchError(this.handleError('delete', [])))
      )
  }
}
