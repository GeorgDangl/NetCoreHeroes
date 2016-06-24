import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getHero(id: number) {
        return this.getHeroes()
            .then(heroes => heroes.filter(hero => hero.id === id)[0]);
    }

    // Add new hero
    private post(hero: Hero): Promise<Hero> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    // Update existing Hero
    private put(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), { headers: headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(hero: Hero) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    save(hero: Hero): Promise<Hero> {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}