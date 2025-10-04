import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMassage: undefined | string;
  constructor(
    private route: ActivatedRoute,
    private product: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId &&
      this.product.getProducts(productId).subscribe((data) => {
        console.log(data);
        this.productData = data;
      });
  }

  submit(data: product) {
    console.log(data);
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMassage = 'Product Update Hua';
      }
    });

    setTimeout(() => {
      this.productMassage = undefined;
      this.router.navigate(['seller-home']); // product add hote hi redirect kar raha hai list me jis se form khali ho jaye
    }, 1000);


  }
}
