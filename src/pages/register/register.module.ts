import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { UserServices } from '../../services/user-services/user-services';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
  ],
  providers: [
    UserServices
  ]
})
export class RegisterPageModule {}
