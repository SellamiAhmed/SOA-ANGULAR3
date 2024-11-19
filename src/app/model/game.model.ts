import { Studio } from './studio.model';
import { Image } from './image.model';
export class Game {
  idGame!: number;
  nomGame!: string;
  rating!: string;
  releaseDate!: Date;
  studio!: Studio;

  image!: Image;
  imageStr!: string;

  images!: Image[];

}
