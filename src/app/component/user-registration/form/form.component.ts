import { Component, OnInit, Output, EventEmitter, Input, ViewChild,
  AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from '../table/table.component';
import { userModel } from '../user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, DoCheck{
  registrationForm: any;
  @Input() flag: any;
  @Output() resetEdited_OMth = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
    private userServices: UserService) { 
    this.registrationForm =  this.userServices.registrationForm;
  }

  ngDoCheck(): void{
  }
 
  ngOnInit(): void {
  }

  register_Mth(){
    this.userServices.userOperation(this.registrationForm.value, this.flag);
    this.registrationForm.reset();
    this.resetEdited_OMth.emit(false);
  }

  reset_Mth(){
    //this.flag = false;
    this.userServices.resetForm_Mth();
    this.resetEdited_OMth.emit(false);
    //this.isNewUser_Fl   = false;
  }

}

/*
Round2 is the assignment as below.

Assignment:

Create a CRUD operation with the following 4 fields (Name, Email, Phone, Address).

The complete application will reside on just one page.  

Parent component (app.component.ts) 
Form Component (form.component.ts)
Table Component (table.component.ts)

The Form and The Table component will reside inside App Component. as a parent child relationship.

The table component will list all the entries added/edited/deleted from the form realtime.

Please complete the assignment, upload it on GitHub and send me the link by 26-04-2021.


Incase you have any queries please revet back on this email. 
*/
