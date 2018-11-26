import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { AuthService } from "../auth/auth.service";

@Component({
   selector: 'app-message-component',
   templateUrl: './message.component.html',
   styleUrls: ['./messages.component.css']
})

export class MessageComponent implements OnInit, OnDestroy{
  enteredTitle = "";
  enteredContent = "";
  post: Message;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private postId: string;
  private authStatusSub: Subscription;

   constructor(public messageService : MessageService, public route : ActivatedRoute, private authService : AuthService){

   }

   ngOnInit(){
     this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
     this.form = new FormGroup({
       title: new FormControl(null, {
  validators: [Validators.required, Validators.minLength(3)]
}),
           content: new FormControl(null, { validators: [Validators.required] })
     })
     this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has("postId")) {
      this.mode = "edit";
      this.postId = paramMap.get("postId");
      this.isLoading = true;
      this.messageService.getMessage(this.postId).subscribe(postData => {
        this.isLoading = false;
        this.post = {

          id: postData._id,
          title: postData.title,
          content: postData.content,
          creator: postData.creator
        };
        this.form.setValue({
          title: this.post.title,
          content: this.post.content

        });
      });
    } else {
      this.mode = "create";
      this.postId = null;
    }
  });
   }

   onSavePost() {
     if (this.form.invalid) {
       return;
     }
     this.isLoading = true;
     if (this.mode === "create") {
       console.log(this.form.value.content);
       this.messageService.addMessage(
         this.form.value.title,
         this.form.value.content,
         this.postId

       );
     } else {
       this.messageService.updateMessage(
      this.postId,

      this.form.value.title,
      this.form.value.content

    );
     }
     this.form.reset();
   }

   ngOnDestroy() {
     this.authStatusSub.unsubscribe();
   }
}
