import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { Message } from "./message.model";
import { ErrorService } from "../../Components/errors/error.service";

@Injectable()
export class MessageService {

  private posts: Message[] = [];
  private postsUpdated = new Subject<{ posts: Message[]; postCount: number }>();

   constructor(private http: HttpClient, private router : Router){

   }

   getMessages(postsPerPage: number, currentPage: number) {
     const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
     this.http
       .get<{ message: string; posts: any; maxPosts: number }>(
         "https://benfood.herokuapp.com/api/messages" + queryParams
       )
       .pipe(
         map(postData => {
           return {
             posts: postData.posts.map(post => {
               return {
                 title: post.title,
                 content: post.content,
                    id: post._id,
                  creator: post.creator
               };
             }),
             maxPosts: postData.maxPosts
           };
         })
       )
       .subscribe(transformedPostData => {
         this.posts = transformedPostData.posts;
         this.postsUpdated.next({
           posts: [...this.posts],
           postCount: transformedPostData.maxPosts
         });
       });
   }

    updateMessage(id: string, title: string, content: string){
        let messageData: Message | FormData;
        messageData = new FormData();

        messageData.append("id", id);
        messageData.append("title", title);
        messageData.append("content", content);

        messageData = {
        id: id,
        title: title,
        content: content,
        creator: null
      };

      this.http
      .put("https://benfood.herokuapp.com/api/messages/" + id, messageData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
    }


     getMessageUpdateListener() {
       return this.postsUpdated.asObservable();
     }

     getMessage(id: string) {
       return this.http.get<{
         _id: string;
         title: string;
         content: string;
         creator: string;
       }>("https://benfood.herokuapp.com/api/messages/" + id);
     }

   addMessage(content : string, title: string, creator: string){
       const message: Message = {id: null, title: title, content: content, creator: creator};
       this.http.post<{ message: string; postId: string} >(
         "https://benfood.herokuapp.com/api/messages" , message
       ).subscribe(responseData => {
         this.router.navigate(["/"]);
       })
       console.log(content);
   }

   deleteMessage(postId: string) {
       return this.http.delete("https://benfood.herokuapp.com/api/messages/" + postId);
     }


}
