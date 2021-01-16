import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HintDirective } from './hint.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { TypesOfRoomsComponent } from './types-of-rooms/types-of-rooms.component';
import { HttpClientModule }   from '@angular/common/http';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FixedPointNotationPipe } from './fixed-point-notation.pipe';
import { HintProDirective } from './hint-pro.directive';
import { TimeOutDirectiveDirective } from './time-out-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HintDirective,
    MainPageComponent,
    TypesOfRoomsComponent,
    ErrorPageComponent,
    FixedPointNotationPipe,
    HintProDirective,
    TimeOutDirectiveDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
