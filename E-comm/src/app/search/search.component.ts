import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchResult : undefined | product[];

  constructor(private activeRoute: ActivatedRoute, private product:ProductService) {}

  ngOnInit(): void {
    let value = this.activeRoute.snapshot.paramMap.get('query'); //this 'query' is the router
    console.log(value);
    value && this.product.searchProducts(value).subscribe((result)=>{
      console.log(result);
      this.searchResult = result;
    })
  }
}
