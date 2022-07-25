import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  /**
   * This is an example of a typical service-in-service scenario in which you inject the MessageService into the HeroService which is injected into the HeroesComponent.
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private heroesUrl = 'api/heroes'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * In this tutorial, HeroService.getHeroes() returns an Observable so that it can use the Angular HttpClient.get method to fetch the heroes and have HttpClient.get() return an Observable.
   * GET heroes from the server
   * @returns
   */
  getHeroes(): Observable<Hero[]> {
    //This particular call to HttpClient.get() returns an Observable<Hero[]>, which is an observable of hero arrays.
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      // tap() operator enables this ability by looking at the observable values, doing something with those values, and passing them along.
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /**
   * getHero() constructs a request URL with the desired hero's id
   * The server should respond with a single hero rather than an array of heroes
   * getHero() returns an Observable<Hero>, which is an observable of Hero objects rather than an observable of Hero arrays.
   * @param id
   * @returns
   */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    /**
     * The URL
     * The data to update, which is the modified hero in this case
     * Options
     */
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: Send the error to remote loggin infrastructure
      console.error(error);

      //TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
