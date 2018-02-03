import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
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
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    delete(hero: Hero) {
        let url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .delete(url, { headers: this.headers })
            .toPromise()
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero | void> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    resetHeroes() {
        var url = `${this.heroesUrl}/reset`;
        return this.http.post(url, null)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}