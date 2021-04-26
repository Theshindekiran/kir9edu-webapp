import { Component } from '@angular/core';
import { userModel } from './component/user-registration/user.model';
import { UserService } from './component/user-registration/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kira9edu';
  editedUser: any;
  editedOperation_Fl : boolean = false;
  constructor(private userServices: UserService){
    
  }


  formDataOpe_Mth(data: any){
    this.editedUser = data[0]
  }

  editedOperation_Mth(event: any){
    console.log('asdasd');
    
    this.editedOperation_Fl = true;
    console.log(this.editedOperation_Fl);
    
  }

  flagReset(event: any){
    this.editedOperation_Fl = event;
  }


}
