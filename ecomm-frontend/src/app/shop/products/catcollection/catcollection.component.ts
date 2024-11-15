import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'ecom-catcollection',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './catcollection.component.html',
  styleUrl: './catcollection.component.scss',
})
export class CatcollectionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  products: any[] = [];
  category: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      if (this.category) {
        this.fetchProducts();
      }
    });
  }

  fetchProducts() {
    this.http
      .get<any[]>(`http://localhost:8080/api/products/${this.category}`)
      .pipe(
        catchError((err) => {
          this.errorMessage = 'Server is Offline';
          return of([]);
        })
      )
      .subscribe((data) => {
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
