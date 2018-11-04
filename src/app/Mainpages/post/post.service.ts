import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { HealthComponent } from '../health/health.component';
import { PromotionComponent } from '../promotions/promotions.component';
import { PostItem } from './post-item';
import { PostInterface} from './postinterface';

@Injectable()
export class PostService {

 constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  loadComponent(viewContainerRef: ViewContainerRef, postItem: PostItem) {
		let componentFactory = this.componentFactoryResolver
		                      .resolveComponentFactory(postItem.component);
		viewContainerRef.clear();
		let componentRef = viewContainerRef.createComponent(componentFactory);
		let myPost: PostInterface = <PostInterface>componentRef.instance;
		myPost.post = postItem.data;
	}

   getAllPosts(){
     return [
        new PostItem(PromotionComponent, { name: 'Enjoy Pizza Promotion after 8pm!!' }),

        new PostItem(HealthComponent, { name: 'Exercise regularly' } )



     ];
   }
}
