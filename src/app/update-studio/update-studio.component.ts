import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Studio } from '../model/studio.model';


@Component({
  selector: 'app-update-studio',
  templateUrl: './update-studio.component.html',
  styleUrl: './update-studio.component.css'
})
export class UpdateStudioComponent {
  @Input() ajout!: boolean;
  @Output()
  studioUpdated = new EventEmitter<Studio>();
  @Input()
  studio!: Studio ;
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateStudio ",this.studio);
    }

    saveStudio(){
      this.studioUpdated.emit(this.studio);
      }

}
