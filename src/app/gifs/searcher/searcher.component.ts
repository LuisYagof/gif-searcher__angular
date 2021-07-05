import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  search() {
    const searchValue = this.txtSearch.nativeElement.value;

    if (searchValue.trim().length === 0) {
      return
    }
    this.gifsService.searchGifs(searchValue);
    this.txtSearch.nativeElement.value = '';
  }

}
