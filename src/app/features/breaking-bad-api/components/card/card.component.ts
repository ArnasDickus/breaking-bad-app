import { Component, Input, OnInit } from '@angular/core';
import { Characters } from '@core/interfaces/breaking-bad-api/characters';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public filteredData: Characters[];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.filteredData);
    }, 2000);
  }

}
