import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { blob } from 'stream/consumers';

@Component({
  selector: 'ecom-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  ngOnInit(): void {
    this.fetchData();
  }
  private http = inject(HttpClient);

  products: any = [];
  errorMessage: any = [];
  errorMessageImg: any = [];

  fetchData() {
    this.http
      .get('http://localhost:8080/api/products')
      .pipe(
        catchError((err) => {
          this.errorMessage = 'Server is Offline';
          return of([]);
        })
      )
      .subscribe((data: any) => {
        console.log(data);
        this.products = data.map((product: any) => {
          const imageUrl = `http://localhost:8080/api/products/${product.id}/image`;
          return { ...product, imageUrl };
        });
        if (data.length > 0) {
          this.errorMessage = '';
        }
      });
  }
}
