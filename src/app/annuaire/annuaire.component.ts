import { Component, OnInit } from '@angular/core';
import { Annuaire } from './annuaire';
import { PERSONNES } from './mock-personnes';
 
@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.css']
})
export class AnnuaireComponent implements OnInit {

  personnes = PERSONNES;

  selectedPersonne: Annuaire;

  constructor() { }

  ngOnInit() {
  }

  onSelect(personne: Annuaire): void
  {
    this.selectedPersonne = personne;
  }

}
