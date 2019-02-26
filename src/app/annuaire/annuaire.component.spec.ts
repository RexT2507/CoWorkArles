import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuaireComponent } from './annuaire.component';

describe('AnnuaireComponent', () => {
  let component: AnnuaireComponent;
  let fixture: ComponentFixture<AnnuaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnuaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnuaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
