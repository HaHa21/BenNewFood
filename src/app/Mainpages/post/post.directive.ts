import { Directive, ViewContainerRef } from '@angular/core';

@Directive({

  selector: 'MyPost',

})

export class PostComponent {
      constructor(public viewContainerRef: ViewContainerRef) { }

}
