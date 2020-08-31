import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Options } from '@core/interfaces/options';
import { Mortality } from '@core/enums/breaking-bad-api/mortality.enum';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  @Input() filteredOccupationsOptions: Options[];
  public mortalityOptions: Options[] = [
    {
      label: Mortality.ALL,
      value: Mortality.ALL
    },
    {
      label: Mortality.ALIVE,
      value: Mortality.ALIVE
    },
    {
      label: Mortality.DECEASED,
      value: Mortality.DECEASED
    },
    {
      label: Mortality.UNKNOWN,
      value: Mortality.UNKNOWN
    },
  ];

  public searchQuery = '';
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onChange(filters: any): void {
    this.searchEvent.emit(filters);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      searchByName: [''],
      searchByNickname: [''],
      searchByShow: this.formBuilder.group( {
        breakingBad: '',
        betterCallSaul: ''
      }),
      searchByRIP: '',
      searchByOccupation: '',
    });
  }
}
