import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserServices } from '../../services/user-services/user-services';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  form : FormGroup;
  constructor(private toast: ToastController,
    private ofauth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private ofAuth: AngularFireAuth,
    private userService: UserServices) {
    this.creatForm();
  }

  ionViewDidLoad() {
  }
  creatForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  async register() {
    try {
      const result = await this.ofauth.auth.createUserWithEmailAndPassword(this.form.get('email').value, this.form.get('password').value);
      if (result) {
        this.ofAuth.authState.subscribe(data => {
          if (data && data.email && data.uid) {
            this.userService.setUser({email: data.email, uid: data.uid});
            this.toast.create({
              message: `Login sucess`,
              duration: 3000
            }).present();
            this.navCtrl.setRoot('HomePage');
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
      this.toast.create({
        message: `${e}`,
        duration: 3000
      }).present();
    }
    
  }

}
