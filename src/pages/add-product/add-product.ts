import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductServices } from '../../services/products-services/products-services';
import { ImageProvider } from '../../providers/image/image';

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  form : FormGroup;
  filmImage: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private services: ProductServices,
    private toast: ToastController,
    private _IMG: ImageProvider ) {
      this.creatForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingItemPage');
  }
  creatForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  addForm(): void {
    const add = this.services.addProduct(this.form.value);
    if (add) {
      this.toast.create({
        message: `Product added sucess`,
        duration: 3000
      }).present();
      this.navCtrl.setRoot('HomePage');
    }
  }
  selectImage()
  {
     this._IMG.selectImage()
     .then((data) =>
     {
        this.filmImage = data;
     });
  }

}
