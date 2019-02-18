import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Board } from './classes'

@Injectable({
  providedIn: 'root'
})
export class PatchsService {
  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed`, error)
      return of(result as T)
    }
  }

  changeBoard(id, name, single): Observable<Board[]> {
    return this.http.patch<Board[]>(`http://localhost:3434/changeBoard`, { id, name, single })
      .pipe(
        tap(_ => console.log, catchError(this.handleError('change board', [])))
      )
  }

  changeGoal(id, name): Observable<Board[]> {
    return this.http.patch<Board[]>(`http://localhost:3434/changeGoal`, { id, name })
      .pipe(
        tap(_ => console.log, catchError(this.handleError('change goal', [])))
      )
  }

  changeTask(body): Observable<Board[]> {
    return this.http.patch<Board[]>(`http://localhost:3434/changeTask`, { body })
      .pipe(
        tap(_ => console.log, catchError(this.handleError('change task', [])))
      )
  }
}
