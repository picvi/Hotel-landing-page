import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>
}

@Injectable({
  providedIn: 'root'
})
export class DeactivateOnSavingGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: ComponentCanDeactivate): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return component.canDeactivate ? component.canDeactivate() : true;
  }
  
}
