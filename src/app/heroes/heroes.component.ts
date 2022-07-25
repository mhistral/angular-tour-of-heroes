import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  // selected hero default none
  selectedHero?: Hero;

  // When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter to the singleton instance of HeroService.
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
      this.getHeroes();
  }

  getHeroes(): void {
    // The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}
