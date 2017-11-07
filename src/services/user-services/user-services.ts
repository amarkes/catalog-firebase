import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../models/user.model';
@Injectable()
export class UserServices {
    
    constructor(private storage: Storage) { }
    setUser(user: UserModel): void {
        this.storage.set('user', {email: user.email, uid: user.uid});
    }
    
}