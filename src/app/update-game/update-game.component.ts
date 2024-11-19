import { Component } from '@angular/core';

import { Game } from '../model/game.model';
import { GameService } from '../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Studio } from '../model/studio.model';

import { OnInit } from '@angular/core';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrl: './update-game.component.css',
})
export class UpdateGameComponent implements OnInit {
  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  currentGame = new Game();
  studios!: Studio[];
  updateStudioId!: number;

  myImage!: string;

  constructor(
    private gameService: GameService,
    private activateroute: ActivatedRoute,
    private router: Router
  ) {}

  // ngOnInit() {
  //   this.gameService.listeStudios().subscribe((studios) => {
  //     if (Array.isArray(studios)) {
  //       this.studios = studios;
  //     } else {
  //       console.error(
  //         'Studios is undefined or does not contain "studios" property'
  //       );
  //     }
  //   });
  //   this.gameService
  //     .consulterGame(this.activateroute.snapshot.params['id'])
  //     .subscribe((pls) => {
  //       console.log(pls);
  //       this.currentGame = pls;
  //       this.updateStudioId = this.currentGame.studio.idStudio;
  //       console.log(this.currentGame);
  //       this.gameService
  //         .loadImage(this.currentGame.image.idImage)
  //         .subscribe((img) => {
  //           this.myImage = 'data:' + img.type + ';base64,' + img.image;
  //         });
  //     });
  // }

  ngOnInit(): void {
    this.gameService.listeStudios().subscribe((studios) => {
      if (Array.isArray(studios)) {
        this.studios = studios;
      } else {
        console.error(
          'Studios is undefined or does not contain "studios" property'
        );
      }
    });

    this.gameService
      .consulterGame(this.activateroute.snapshot.params['id'])
      .subscribe((prod) => {
        this.currentGame = prod;
        this.updateStudioId = prod.studio.idStudio;
      });
  }

  // updateGame() {
  //   this.currentGame.studio = this.studios.find(
  //     (studio) => studio.idStudio == this.updateStudioId
  //   )!;
  //   if (this.isImageUpdated) {
  //     this.gameService
  //       .uploadImage(this.uploadedImage, this.uploadedImage.name)
  //       .subscribe((img: Image) => {
  //         this.currentGame.image = img;
  //         this.gameService.updateGame(this.currentGame).subscribe((game) => {
  //           this.router.navigate(['games']);
  //         });
  //       });
  //   } else {
  //     this.gameService.updateGame(this.currentGame).subscribe((game) => {
  //       this.router.navigate(['games']);
  //     });
  //   }
  // }

  updateGame() {
    this.currentGame.studio = this.studios.find(
      (cat) => cat.idStudio == this.updateStudioId
    )!;
    this.gameService.updateGame(this.currentGame).subscribe((game) => {
      this.router.navigate(['games']);
    });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  onAddImageGame() {
    this.gameService
      .uploadImageProd(
        this.uploadedImage,
        this.uploadedImage.name,
        this.currentGame.idGame
      )
      .subscribe((img: Image) => {
        this.currentGame.images.push(img);
      });
  }
  supprimerImage(img: Image) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.gameService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentGame.images.indexOf(img, 0);
        if (index > -1) {
          this.currentGame.images.splice(index, 1);
        }
      });
  }
}
