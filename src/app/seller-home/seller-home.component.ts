import { Component, importProvidersFrom } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productMassage : undefined | string;
  icon = faTrash;
  editIcon = faEdit;
  constructor(private product: ProductService) { }

  ngOnInit() {
    this.list();
  }
  list(){
    this.product.productList().subscribe((result)=>{
      console.log(result);
      this.productList = result;
    })
  }

  deleteProduct(id: number){
    console.log("test id", id);

    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMassage = "Product is Remove";
        this.list();
      }
      setTimeout(() => (this.productMassage = undefined), 2000);
    });
  }
}
