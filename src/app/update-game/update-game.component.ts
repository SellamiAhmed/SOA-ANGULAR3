import { Component } from '@angular/core';

import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Studio } from '../model/studio.model';

import { OnInit } from '@angular/core';

@Component({
  selector: 'app-update-game',
  templateUrl:'./update-game.component.html',
  styleUrl: './update-game.component.css'
})
export class UpdateGameComponent implements OnInit {

  currentGame = new Game();
  studios !: Studio[];
  updateStudioId!: number;

  constructor(private gameService: GameService,
    private activateroute: ActivatedRoute,private router: Router){}

  ngOnInit() {

    this.gameService.listeStudios().subscribe(studios => {
      if (Array.isArray(studios)) {
        this.studios = studios;
    } else {
        console.error('Studios is undefined or does not contain "studios" property');
    }
    });

    this.gameService.consulterGame(this.activateroute.snapshot.params['id']).subscribe(pls => {
      console.log(pls);
      this.currentGame = pls;
      this.updateStudioId = this.currentGame.studio.idStudio;
    });
}
  updateGame()

  {

    this.currentGame.studio = this.studios.find(studio => studio.idStudio == this.updateStudioId)!;

    this.gameService.updateGame(this.currentGame).subscribe(pls => {

      console.log(pls);

      this.router.navigate(['games']);

}

    );
  }
}
