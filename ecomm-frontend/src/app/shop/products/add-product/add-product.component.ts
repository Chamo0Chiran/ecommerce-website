import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { error } from 'console';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ecom-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  product: any = {
    id: 0,
    name: '',
    description: '',
    category: '',
    brand: '',
    price: 0,
    releaseDate: '',
    quantity: 0,
    available: true,
    rating: 0,
    color: '',
    imageType: '',
    imageName: '',
    imageData: null,
  };
  imageFile: File | null = null;
  errorMessage: string = '';

  private http = inject(HttpClient);

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.imageFile) {
      const formData = new FormData();
      formData.append(
        'product',
        new Blob([JSON.stringify(this.product)], {
          type: 'application/json',
        })
      );
      formData.append('imageFile', this.imageFile);

      this.http
        .post('http://localhost:8080/api/products/add', formData)
        .subscribe({
          next: (data) => {
            console.log('Product added successfully.', data);
          },
          error: (error) => {
            console.error('Error adding products', error);
            this.errorMessage = 'Server is Offline';
          },
        });
    } else {
      this.errorMessage = 'Please select an image file.';
    }
  }
}
