import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addProductMassage: string | undefined;
  constructor(private product: ProductService, private router: Router) {}

  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMassage = 'Product mil gaya hai bhai';
      }
     setTimeout(() => {
      this.addProductMassage = undefined;
      this.router.navigate(['seller-home']); // product add hote hi redirect kar raha hai list me jis se form khali ho jaye
    }, 2000);
    });
  }
}
