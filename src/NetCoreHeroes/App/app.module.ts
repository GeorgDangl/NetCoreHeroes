import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { DashboardComponent } from './dashboard.component';
import { FooterComponent } from './footer.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        FooterComponent,
        HeroDetailComponent,
        HeroesComponent
    ],
    providers: [
        HeroService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }