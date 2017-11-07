import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { ProductServices } from '../../services/products-services/products-services';
@NgModule({
    imports: [
        IonicPageModule.forChild(HomePage)
    ],
    exports: [],
    declarations: [HomePage],
    providers: [ProductServices],
})
export class HomeModule { }
