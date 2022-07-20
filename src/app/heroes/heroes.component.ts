import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes = HEROES;
  // selected hero default none
  selectedHero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

  // once onSelect is triggered, we set the selectedHero to passed hero parameter
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}