import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './component/user-registration/form/form.component';
import { TableComponent } from './component/user-registration/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Angular-Material
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { UserService } from './component/user-registration/user.service';
import { shortenPipe } from './shorten.pipe';
import { hindDirective } from './hint.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    shortenPipe,
    hindDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatInputModule, MatCardModule,

    FormsModule, ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
