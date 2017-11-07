import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductModel } from '../../models/porduct.model';
import { ProductServices } from '../../services/products-services/products-services';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products$: Observable<ProductModel[]>
  constructor(public navCtrl: NavController,
    private storage: Storage,
    private productService: ProductServices) { 

    }
  ionViewWillLoad() {
    this.storage.get('user').then((val) => {
      if (!val) {
        this.navCtrl.setRoot('LoginPage');
      }
      console.log(val);
    });
    this.getProducts();
  }
  getProducts(): void {
    this.products$ = this.productService.getList()
    .snapshotChanges()
    .map(data => {
      return data.map(f => ({
        key: f.payload.key, ...f.payload.val()
      }));
    });
  }

}
