import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

import { ProductModel } from '../../models/porduct.model';

@Injectable()
export class ProductServices {
    private productsListRef$ = this.db.list<ProductModel>('products-list')
    constructor(private db: AngularFireDatabase) { }
    getList(): AngularFireList<ProductModel> {
        return this.productsListRef$;
    }
    addProduct(product: ProductModel) {
        return this.productsListRef$.push(product);
    }
    uploadImage(imageString) : Promise<any>
    {
       let image       : string  = 'movie-' + new Date().getTime() + '.jpg',
           storageRef  : any,
           parseUpload : any;
 
       return new Promise((resolve, reject) =>
       {
          storageRef       = firebase.storage().ref('posters/' + image);
          parseUpload      = storageRef.putString(imageString, 'data_url');
 
          parseUpload.on('state_changed', (_snapshot) =>
          {
             // We could log the progress here IF necessary
             // console.log('snapshot progess ' + _snapshot);
          },
          (_err) =>
          {
             reject(_err);
          },
          (success) =>
          {
             resolve(parseUpload.snapshot);
          });
       });
    }
}