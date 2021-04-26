import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'


export enum ServiceOperation{
  userService = 'users/',
  // deleteUser = 'users/',
  // updateUser = 'users/',
  // getAllUser = 'users/',
  // getOneUser = 'users/'
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  eventLog: string[] = [];
  BaseUrl: any;
  constructor(private httpSocket: HttpClient){
    this.BaseUrl = 'http://localhost:8080/kir9edu-api/';
    this.log('logCreationStart')
    
  }

  /**
   * To write logs
   * @param message 
   */
  log(message: any){
    this.eventLog.push(message);
    console.log(this.eventLog);
    
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: Response): Observable<T> => {
      console.log('service api error ocures');
      
      this.log(`${operation} failed: ${error.ok}`);
      // Let the app keep running by returning an empty result.
      //return of(result as T);
      return throwError(error)
    };
  }


  /**
   * Get all data list/object
   * @param message
   * @param dataId 
   * @param serviceType 
   */
   getAll_Mth(message:string, serviceType: ServiceOperation) : Observable<any[]>{
    var Url = `${this.BaseUrl}${serviceType}`; 
    return this.httpSocket.get<any[]>(Url)
    .pipe(
      tap(_=>this.log(`${message}`)),
      catchError(this.handleError<any>(`get ${message}`))
    );
  }


  /**
   * Get single data list
   *  @param message
   * @param dataId 
   * @param serviceType 
   */
   getSingle_Mth(message:string, serviceType: ServiceOperation, dataId: any) : Observable<any[]>{
    var Url = `${this.BaseUrl}${serviceType}${dataId}`; 
    return this.httpSocket.get<any[]>(Url)
    .pipe(
      tap(_=>this.log(`${message}`)),
      catchError(this.handleError<any>(`get ${message}`))
    );
  }

  /**
 * Create data
 * @param message 
 * @param postData 
 */
   post_Mth(message : string, postData: any, serviceType: ServiceOperation) : Observable<any>{ 
    var Url = `${this.BaseUrl}${serviceType}`;
      
    return this.httpSocket.post<any>(Url, postData)
    .pipe(
      tap(_ => this.log(`${message}  `)),
      catchError(this.handleError<any>(`get ${message}`))
    );
  }

  /**
 * update data By id -- Single updation --
 * @param message 
 * @param EditedData 
 */
    put_Mth(message: string, EditedData: any, id: any, serviceType: ServiceOperation): Observable<any>{
    var Url = `${this.BaseUrl}${serviceType}${id}`;
    return this.httpSocket.put<any>(Url, EditedData)
    .pipe(
      tap(_ => {
        this.log(`updated ${message} id=${EditedData.id}`);
    }),
      catchError(this.handleError<any>('updateCompany')) 
    );
  }

  delete_Mth(message: string, dataId: any, serviceType: ServiceOperation): Observable<any>{
    var Url = `${this.BaseUrl}${serviceType}${dataId}`;

    return this.httpSocket.delete<any>(Url)
    .pipe(
      tap(_ => this.log(`${message}  `)),
      catchError(this.handleError<any>(`get ${message}`))
    );
  }





}
