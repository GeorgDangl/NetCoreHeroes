// Structure (and most code=) taken from https://raw.githubusercontent.com/angular/angular.io/master/public/docs/_examples/testing/ts/app/http-hero.service.spec.ts at commit abd860c

import { async, inject, TestBed, withModule } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestComponentBuilder } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
    Http, HTTP_PROVIDERS,
    ConnectionBackend, XHRBackend,
    Request, RequestMethod, BaseRequestOptions, RequestOptions,
    Response, ResponseOptions,
    URLSearchParams,
    HttpModule
} from '@angular/http';

// Add all operators to Observable
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

type HeroData = { id: string, name: string }

const makeHeroData = () => [
    { id: '1', name: 'Windstorm' },
    { id: '2', name: 'Bombasto' },
    { id: '3', name: 'Magneta' },
    { id: '4', name: 'Tornado' }
];

// The following initializes the test environment for Angular 2. This call is required for Angular 2 dependency injection.
TestBed.resetTestEnvironment();
TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

////////  SPECS  /////////////
describe('HeroService', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                { provide: XHRBackend, useClass: MockBackend },
                HeroService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('can instantiate service when inject service',
        withModule({
            providers: [
                HeroService
            ]
        }, inject([HeroService], (service: HeroService) => {
            expect(service instanceof HeroService).toBe(true);
        }))
    );

    it('can instantiate service with "new"', inject([Http], (http: Http) => {
        expect(http).not.toBeNull('http should be provided');
        let service = new HeroService(http);
        expect(service instanceof HeroService).toBe(true, 'new service should be ok');
    }));

    it('can provide the mockBackend as XHRBackend',
        inject([XHRBackend], (backend: MockBackend) => {
            expect(backend).not.toBeNull('backend should be provided');
        }));

    describe('getHeroes', () => {
        let backend: MockBackend;
        let service: HeroService;
        let fakeHeroes: HeroData[];
        let response: Response;

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            backend = be;
            service = new HeroService(http);
            fakeHeroes = makeHeroData();
            let options = new ResponseOptions({ status: 200, body: fakeHeroes });
            response = new Response(options);
        }));

        it('should have expected fake heroes', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            service.getHeroes()
                .then(heroes => {
                    expect(heroes.length).toEqual(fakeHeroes.length,
                        'should have expected no. of heroes');
                });
        })));

        it('should be OK returning no heroes', async(inject([], () => {
            let resp = new Response(new ResponseOptions({ status: 200, body: [] }));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

            service.getHeroes()
                .then(heroes => {
                    expect(heroes.length).toEqual(0, 'should have no heroes');
                });
        })));
    });

    describe('save', () => {
        it('should call PUT when hero has id', async(inject([HeroService, XHRBackend], (heroService: HeroService, mockBackend: MockBackend) => {
            var hero = new Hero();
            hero.name = 'George';
            hero.id = 5;
            var calledRequestMethod: RequestMethod;
            mockBackend.connections.subscribe((c: MockConnection) => {
                calledRequestMethod = c.request.method;
                let options = new ResponseOptions({ status: 200, body: hero });
                var response = new Response(options);
                c.mockRespond(response);
            });
            heroService.save(hero)
                .then(() => {
                    expect(calledRequestMethod).toBe(RequestMethod.Put);
                });
        })));

        it('should call POST when hero has no id', async(inject([HeroService, XHRBackend], (heroService: HeroService, mockBackend: MockBackend) => {
            var hero = new Hero();
            hero.name = 'George';
            var calledRequestMethod: RequestMethod;
            mockBackend.connections.subscribe((c: MockConnection) => {
                calledRequestMethod = c.request.method;
                hero.id = 5;
                let options = new ResponseOptions({ status: 200, body: hero });
                var response = new Response(options);
                c.mockRespond(response);
            });
            heroService.save(hero)
                .then(() => {
                    expect(calledRequestMethod).toBe(RequestMethod.Post);
                });
        })));
    });
});