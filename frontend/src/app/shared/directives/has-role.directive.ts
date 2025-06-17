import { Directive } from '@angular/core';

@Directive({
  selector: '[appHasRole]',
  standalone: false
})
export class HasRoleDirective {

  constructor() { }

}
