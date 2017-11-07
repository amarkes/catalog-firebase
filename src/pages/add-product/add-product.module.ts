import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProductPage } from './add-product';
import { ProductServices } from '../../services/products-services/products-services';
import { ImageProvider } from '../../providers/image/image';

@NgModule({
  declarations: [
    AddProductPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProductPage),
  ],
  providers: [ProductServices, ImageProvider]
})
export class AddShoppingItemPageModule {}
