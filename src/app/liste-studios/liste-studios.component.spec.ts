import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeStudiosComponent } from './liste-studios.component';

describe('ListeStudiosComponent', () => {
  let component: ListeStudiosComponent;
  let fixture: ComponentFixture<ListeStudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeStudiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeStudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
