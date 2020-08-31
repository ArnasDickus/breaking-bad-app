import { Component, Input } from '@angular/core';
import { Characters } from '@core/interfaces/breaking-bad-api/characters';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() public filteredData: Characters[];
  public errorImage = '../../../../../assets/images/breaking-bad-api/missing-person-2.jpg';
}
