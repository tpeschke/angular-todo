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
}
