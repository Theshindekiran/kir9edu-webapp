import { AfterViewInit, Component, OnInit, Output, ViewChild,
  EventEmitter,
  Input} from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceOperation, WebsocketService } from 'src/app/shared-services/websocket.service';
import { FormComponent } from '../form/form.component';

import { userModel } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Output() editedUser_o = new EventEmitter<any>();
  users_L: userModel[] = [];

  constructor(private userServices: UserService,
    private httpSocket_Obj: WebsocketService) { 
      //this.users = this.userServices.userData_L
  } 

  ngOnInit(): void {
    this.getAllUsers();
   // this.users = this.getAllUsers();
    
  }

  getAllUsers(): userModel[]{
    this.httpSocket_Obj.getAll_Mth('get all user', ServiceOperation.userService)
        .subscribe( (data: userModel[]) => {
          //this.userServices.userData_L = data;
          this.users_L = this.userServices.userData_L = data;
        }, (error: any) => {

      }); return []
      //return observable<any[]>
  }

  ngAfterViewInit(): void {
  }

  deleteUser(userData: userModel, index: number){
    this.userServices.deleteUser(userData, index);
  }

  editUser(user: userModel, index: number){
    this.userServices.editUser(user, index);
    //this.userServices.newUser_Fl = false;
    this.editedUser_o.emit(false);
    
  }

}