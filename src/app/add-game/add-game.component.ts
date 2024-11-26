import { Component } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { Studio } from '../model/studio.model';
import { Image } from '../model/image.model';
import { Router } from '@angular/router';
import { StudioWrapper } from '../model/studioWrapped.model';
@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.css',
})
export class AddGameComponent {
  uploadedImage!: File;
  imagePath: any;

  newGame = new Game();
  studios: Studio[] = [];
  newIdStudio!: number;
  newStudio!: Studio;
  message?: string;
  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudio();
  }

  loadStudio() {
    this.gameService.listeStudios().subscribe(
      (response: any) => {
        console.log('data studio', response);
        if (response && response._embedded && response._embedded.studios) {
          this.studios = response._embedded.studios;
        } else if (Array.isArray(response)) {
          this.studios = response;
        } else {
          console.error('Unexpected response format:', response);
          this.studios = [];
        }
      },
      (error) => {
        console.error('Error loading studios:', error);
        this.studios = [];
      }
    );
  }
  addGame() {
    this.newGame.studio = this.studios.find(
      (ty) => ty.idStudio == this.newIdStudio
    )!;

    this.gameService.ajouterGame(this.newGame).subscribe((e) => {
      this.gameService
        .uploadImageProd(this.uploadedImage, this.uploadedImage.name, e.idGame)
        .subscribe((img: Image) => {});
      this.router.navigate(['games']);
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
}
