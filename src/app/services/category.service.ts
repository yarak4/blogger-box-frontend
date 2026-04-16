import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Category } from '../data/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}api/v1/categories`);
  }
}