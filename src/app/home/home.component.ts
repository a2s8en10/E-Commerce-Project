import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  popularProduct: undefined | product[];
  trendProducts: undefined | product[];
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.topProducts().subscribe((data) => {
      this.popularProduct = data;
    });

    this.product.topSellProduct().subscribe((data) => {
      this.trendProducts = data;
    });
  }
}
