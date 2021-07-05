import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "QT4i9OsfTBmGDt6ra3sPXs3I0MZAlDK3"
  private base_url: string = "https://api.giphy.com/v1/gifs"
  private _history: string[] = [];
  public results: Gif[] = []

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {

    // if (localStorage.getItem('history')) {
    //   this._history = JSON.parse(localStorage.getItem('history')!)
    // }

    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];

  }

  searchGifs(query: string) {

    query = query.trim().toLowerCase()

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 9)

      localStorage.setItem('history', JSON.stringify(this._history))
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)

    this.http.get<SearchGifsResponse>(`${this.base_url}/search`, { params })
      .subscribe((resp) => {
        this.results = resp.data
        localStorage.setItem('results', JSON.stringify(this.results))
      });


  }
}
