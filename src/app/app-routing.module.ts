import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DeactivateOnSavingGuard } from './form/deactivate-on-saving.guard';
import { FormComponent } from './form/form.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TypesOfRoomsComponent } from './types-of-rooms/types-of-rooms.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'form', component: FormComponent , canDeactivate: [DeactivateOnSavingGuard]},
  { path: 'rooms/:type', component: TypesOfRoomsComponent },
  { path: 'error/:message', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
