import { Component, OnInit, OnDestroy} from "@angular/core";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { AuthService } from "../auth/auth.service";

@Component({
   selector: 'app-message-list',
   template: `
   <mat-spinner *ngIf="isLoading"></mat-spinner>
<mat-accordion multi="true" *ngIf="posts.length > 0 && !isLoading">

<mat-expansion-panel *ngFor="let post of posts" >
<h2>{{ post.title }}</h2>
  <mat-expansion-panel-header class="post-bold">

        <mat-panel-description> {{ post.content }} </mat-panel-description>

    </mat-expansion-panel-header>

  <mat-action-row>
  <a mat-button (click)="onDeleteAdmin(post.id)" *ngIf="role === 'Admin' ">Delete By Admin</a>
  </mat-action-row>
  <mat-action-row *ngIf="userIsAuthenticated && userId === post.creator ">
    <a mat-button color="primary" [routerLink]="['/edit', post.id]">EDIT</a>
    <button mat-button color="warn" (click)="onDelete(post.id)">DELETE</button>
  </mat-action-row>
</mat-expansion-panel>
</mat-accordion>
<mat-paginator [length]="totalPosts" [pageSize]="postsPerPage" [pageSizeOptions]="pageSizeOptions" (page)="onChangedPage($event)"
*ngIf="posts.length > 0"></mat-paginator>
<p class="info-text mat-body-1" *ngIf="posts.length <= 0 && !isLoading">No posts added yet!</p>`,
    styleUrls: ['./message-list.css']
})

export class MessageListComponent implements OnInit, OnDestroy{
  posts: Message[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  role: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;



   constructor(private messageService: MessageService, private authService: AuthService){}

   ngOnInit(){
     this.isLoading = true;
  this.messageService.getMessages(this.postsPerPage, this.currentPage);
  this.userId = this.authService.getUserId();
  this.role = this.authService.getRole();
  this.postsSub = this.messageService
    .getMessageUpdateListener()
    .subscribe((postData: { posts: Message[]; postCount: number }) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  this.userIsAuthenticated = this.authService.getisAuth();
  this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
      this.role = this.authService.getRole();
    });
   }

   onChangedPage(pageData: PageEvent) {
  this.isLoading = true;
  this.currentPage = pageData.pageIndex + 1;
  this.postsPerPage = pageData.pageSize;
  this.messageService.getMessages(this.postsPerPage, this.currentPage);
}

onDelete(postId: string) {
  this.isLoading = true;
  this.messageService.deleteMessage(postId).subscribe(() => {
    this.messageService.getMessages(this.postsPerPage, this.currentPage);
  }, () => {
    this.isLoading = false;
  });
}

onDeleteAdmin(postId: string) {
  this.isLoading = true;
  this.messageService.deleteMessageAdmin(postId).subscribe(() => {
    this.messageService.getMessages(this.postsPerPage, this.currentPage);
  }, () => {
    this.isLoading = false;
  });
}

ngOnDestroy() {
  this.postsSub.unsubscribe();
  this.authStatusSub.unsubscribe();
}
}
