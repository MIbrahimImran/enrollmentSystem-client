import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  @Output() query = new EventEmitter<Object>();
  @Input() filters: string[] = [];

  inputControl = new FormControl('');
  filterControl = new FormControl('');

  ngOnInit() {
    this.filterControl.valueChanges.subscribe((selectedFilter) => {
      if (selectedFilter === 'All') {
        this.inputControl.disable();
      } else {
        this.inputControl.enable();
      }
    });
  }

  onSearch() {
    if (this.filterControl.value === 'All') {
      this.query.emit({ input: '', filter: 'All' });
    } else {
      this.query.emit({
        input: this.getFormattedInputValue(),
        filter: this.filterControl.value,
      });
    }
  }

  getFormattedInputValue() {
    return this.inputControl.value?.trim() || '';
  }
}
