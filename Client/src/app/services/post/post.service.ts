
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = 'http://localhost:3000/api/';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  getAllPost(data): Observable<any> {
    const url = apiUrl + 'getAllPost';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  addNewPost(data): Observable<any> {
    const url = apiUrl + 'addNewPost';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPostById(postId): Observable<any> {
    const url = apiUrl + 'getPostById';
    return this.http.post(url,postId, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  deletePost(data): Observable<any> {
    const url = apiUrl + 'deletePost';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePost(data): Observable<any> {
    const url = apiUrl + 'updatePost';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}