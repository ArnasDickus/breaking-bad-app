import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Characters } from '@core/interfaces/breaking-bad-api/characters';
import { BreakingBadApiService } from '@core/services/breaking-bad-api/breaking-bad-api.service';
import { Options } from '@core/interfaces/options';
import { Mortality } from '@core/enums/breaking-bad-api/mortality.enum';

@Component({
  selector: 'app-search-characters',
  templateUrl: './search-characters.component.html',
  styleUrls: ['./search-characters.component.scss']
})
export class SearchCharactersComponent implements OnInit {
  public filteredData: any;
  public fetchedData: Characters[];
  public form: FormGroup;
  public isDataLoaded = false;
  public allOccupations: any = [];
  public filteredOccupationsOptions: Options[]  = [
    {
      label: 'Everyone',
      value: 'all'
    },
  ];

  constructor(
    private breakingBadApiService: BreakingBadApiService
  ) {
  }

  public ngOnInit(): void {
    this.fetchData();
  }

  public filterSearchData(filter): void {
    // Filtered Data filters when I change search By occupation Why???
    const { searchByShow } = filter;
    console.log(filter);
    this.filteredData = this.fetchedData;

    if (filter.searchByName !== '') {
      this.filteredData = this.filteredData.filter(
        data => data.name.toLocaleLowerCase()
        .match(filter.searchByName.toLowerCase()));
    }

    if (filter.searchByNickname !== '') {
      this.filteredData = this.filteredData.filter(
        data => data.nickname.toLocaleLowerCase()
          .match(filter.searchByNickname.toLowerCase()));
    }

    this.filterByShow(searchByShow);
    // this.filterByProfession(filter);
    this.filterByRIP(filter);
  }

  private fetchData(): void {
    this.isDataLoaded = false;
    this.breakingBadApiService.fetchAllCharacters().subscribe((task: Characters[]) => {
      if (task) {
        this.isDataLoaded = true;
        this.fetchedData = task;
        this.filteredData = task;
        this.findAllOccupations(task);
      }
    });
  }

  private filterByShow(filter): void {
    if (filter.breakingBad[0]) {
      this.filteredData = this.filteredData.filter(
        data => data.category.match('Breaking Bad'));
    }

    if (filter.betterCallSaul[0]) {
      this.filteredData = this.filteredData.filter(
        data => data.category.match('Better Call Saul'));
    }
  }

  // private filterByProfession(filter): void {
  //   if (filter.searchByOccupation !== 'all') {
  //     console.log(this.filteredData);
  //     this.filteredData = this.filteredData
  //       .filter(person => person.occupation
  //         .every(occupation => occupation.includes(filter.searchByOccupation)));
  //     }
  //
  //   if (filter.searchByOccupation !== 'all') {
  //     console.log(this.filteredData);
  //     this.filteredData = this.filteredData
  //       .filter(person =>  {
  //         console.log(person);
  //     });
  //     }
  // }

  private filterByRIP(form): void {
    if (form.searchByRIP !== Mortality.ALL) {
      if (form.searchByRIP === Mortality.ALIVE) {
        this.filteredData = this.filteredData
          .filter(person => person.status ===  Mortality.ALIVE);

      } else if (form.searchByRIP === Mortality.DECEASED) {
        this.filteredData = this.filteredData
          .filter(person => person.status ===  Mortality.DECEASED);

      } else if (form.searchByRIP === Mortality.UNKNOWN) {
        this.filteredData = this.filteredData
          .filter(person => person.status !==  Mortality.DECEASED && person.status !== Mortality.ALIVE);
      }
    }
  }

  private findAllOccupations(task): void {
    task.forEach((person) => {
        person.occupation.map((occupation) => {
        this.allOccupations.push(occupation);
      });
    });

    // Remove duplicate values
    this.allOccupations = [...new Set(this.allOccupations)];

    // Remove unknown value
    this.allOccupations = this.allOccupations.filter(value => value !== 'unknown' && value !== 'Unknown');

    // Transform array to Object
    this.allOccupations.forEach((occupation) => {
      this.filteredOccupationsOptions.push({
        label: occupation,
        value: occupation
      });
    });
  }
}
