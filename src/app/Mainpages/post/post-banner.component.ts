import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { PostComponent } from './post.directive';
import { PostService } from './post.service';
import { PostItem } from './post-item';
import { PostInterface } from './postinterface';

@Component({
   selector: 'post-banner',
   templateUrl: './post.component.html',
   styleUrls: ['./post.component.css']

})

export class PostBannerComponent implements AfterViewInit, OnDestroy {

    @ViewChild(PostComponent)
    private postComponent : PostComponent;

    postItems: PostItem[];
    intervalId: any;
    postIndex: number = -1;

    constructor(private postService : PostService) { }

    ngAfterViewInit(){
       this.postItems = this.postService.getAllPosts();
       this.getAds();
    }

  
  getAds() {
    this.intervalId = setInterval(() => {
      this.postIndex = (this.postIndex === this.postItems.length) ? 0 : this.postIndex + 1;

      this.postService.loadComponent(this.postComponent.viewContainerRef, this.postItems[this.postIndex]);
    }, 3000);
  }

  ngOnDestroy() {
  clearInterval(this.intervalId);
  }
}
