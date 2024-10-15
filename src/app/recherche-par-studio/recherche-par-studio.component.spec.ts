import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParStudioComponent } from './recherche-par-studio.component';

describe('RechercheParStudioComponent', () => {
  let component: RechercheParStudioComponent;
  let fixture: ComponentFixture<RechercheParStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RechercheParStudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheParStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
