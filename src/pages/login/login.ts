import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';

import { UserServices } from '../../services/user-services/user-services';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form : FormGroup;
  constructor(private toast: ToastController,
    private ofAuth: AngularFireAuth,
    public nav: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private userService: UserServices) {
    this.creatForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.remove('user');
  }
  creatForm(): void {
    this.form = this.formBuilder.group({
      email: ['asdf@asdf.com', Validators.required],
      password: ['asdfasdf', Validators.required]
    });
  }
  async loginForm() {
    try {
      const result = await this.ofAuth.auth.signInWithEmailAndPassword(this.form.get('email').value, this.form.get('password').value);
      if (result) {
        
        this.ofAuth.authState.subscribe(data => {
          if (data && data.email && data.uid) {
            this.userService.setUser({email: data.email, uid: data.uid});
            this.toast.create({
              message: `Login sucess`,
              duration: 3000
            }).present();
            this.nav.setRoot('HomePage');
          } else {
            this.toast.create({
              message: `User not found!`,
              duration: 3000
            }).present();
          }
        });
        
      }
    }
    catch(e) {
      console.error(e);
      this.toast.create({
        message: `${e}`,
        duration: 3000
      }).present();
    }
  }

}
