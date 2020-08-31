import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Characters } from '@core/interfaces/breaking-bad-api/characters';
import { BreakingBadApiService } from '@core/services/breaking-bad-api/breaking-bad-api.service';
import { Options } from '@core/interfaces/options';
import { Mortality } from '@core/enums/breaking-bad-api/mortality.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // TODO Docs https://github.com/haykoyaghubyan/angular-data-filters/blob/master/src/app/pipe/filter.pipe.ts
  public filteredData: any;
  public fetchedData: Characters[];
  public form: FormGroup;
  public isDataLoaded = false;
  public allOccupations: any = [];
  public filteredOccupationsOptions: Options[]  = [
    {
      label: 'All',
      value: 'all'
    }
  ];

  constructor(
    private breakingBadApiService: BreakingBadApiService
  ) {
  }

  public ngOnInit(): void {
    this.fetchData();
  }

  public filterSearchData(filter): void {
    const { searchByShow } = filter;

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
    this.filterByProfession(filter);
    this.filterByRIP(filter);
    // TODO Every time there is a change. I need to get this.form.value
    // Create search: It should contain:
    // 1) Search by Name.
    // 2) Search by Nickname
    // 3) Radio buttons. Display only breaking bad characters, only better call saul characters. Display both characters
    // 4) Display characters who was in both breaking bad and better call saul.
    // 4) Dropdown for all occupations. Clicking on it will display users who have that occupation.
    // 5) Radio button show all dead characters, show all alive characters, show all.
    // 6) Multiple search is valid. For example Click display only alive characters, and search by name.
  }

  private fetchData(): void {
    this.isDataLoaded = false;
    this.breakingBadApiService.fetchAllCharacters().subscribe((task: Characters[]) => {
      if (task) {
        this.isDataLoaded = true;
        this.fetchedData = task;
        this.filteredData = task;
        this.findAllPairOccupations(task);
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

  private filterByProfession(form): void {
    if (form.searchByOccupation !== 'all') {
      this.filteredData = this.filteredData
        .filter(person => person.occupation
          .every(occupation => occupation.includes(form.searchByOccupation)));
      }
    }

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

  private findAllPairOccupations(task): void {
    // Get all occupations
    task.forEach((person) => {
      person.occupation.map((occupation) => {
          this.allOccupations.push({
            label: occupation,
            value: occupation
          });
      });
    });

    // Remove all unique values.
    for (let i = 0; i < this.allOccupations.length - 1; i++) {
      if (this.allOccupations[i + 1].value === this.allOccupations[i].value) {
       this.filteredOccupationsOptions.push(this.allOccupations[i]);
      }
    }

    // Remove duplicate values
    this.filteredOccupationsOptions = [...new Set(this.filteredOccupationsOptions
      .map(({value}) => value))]
      .map(e => this.filteredOccupationsOptions.
      find(({value}) => value === e));

  //  Remove unknown value
    this.filteredOccupationsOptions = this.filteredOccupationsOptions.filter((option) => {
      return option.label !== 'unknown';
    });
  }
}
