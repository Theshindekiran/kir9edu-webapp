import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceOperation, WebsocketService } from 'src/app/shared-services/websocket.service';
import { userModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData_L : userModel[] = [];
  //newUser_Fl : boolean = false;
  registrationForm: any;
  indexOfEdiEle: any;
  editedUserId: any;

  constructor(private formBuilder: FormBuilder,
      private httpSocket_Obj : WebsocketService
    ) { 
    this.registrationForm =  this.formBuilder.group({
      id:'',
      name : new FormControl('kiran', [Validators.required, Validators.maxLength(30)]),
      email : new FormControl('kiran@com', [Validators.required, Validators.email, Validators.maxLength(25)]),
      phone : new FormControl('876', [Validators.required, Validators.maxLength(10)]),
      address : new FormControl('jhjh', [Validators.required,  Validators.maxLength(40)])
    });
    //this.getAllUsers();
  }

  

  userOperation(newUserData: userModel, userAppearance: boolean){
    if(!userAppearance){
    
      this.httpSocket_Obj.post_Mth('new user', newUserData, ServiceOperation.userService)
        .subscribe( data => {
          this.userData_L.push(data); 
        }, (error: any) => {
           
        });

    }else{
      this.httpSocket_Obj.put_Mth('edit user', newUserData, newUserData.id, ServiceOperation.userService)
        .subscribe( data => {

          this.userData_L.splice(this.indexOfEdiEle, 1, newUserData);
 
        }, (error: any) => {
           
        })
    }
   
  }

  deleteUser(userData: userModel, index: number){
    this.userData_L.splice(index, 1);

    this.httpSocket_Obj.delete_Mth('delete user', userData.id, ServiceOperation.userService)
        .subscribe( data => {
          
          this.userData_L.splice(index, 0); 
        }, (error: any) => {
           
        });
    
  }

  editUser(userData: userModel, index: number){
    this.registrationForm.patchValue({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      id: userData.id
    })
    this.indexOfEdiEle = index;
    this.editedUserId = userData.id;
  }

  resetForm_Mth(){
    this.registrationForm.reset();
  }

 


}
