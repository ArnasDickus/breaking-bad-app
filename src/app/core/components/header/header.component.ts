import { Component, OnInit } from '@angular/core';
import { Allroutes } from '@core/enums/allroutes.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchCharactersRoute = Allroutes.SEARCHCHARACTERS;

  constructor() { }

  public ngOnInit(): void {
  }

}
