import { Component, OnInit } from '@angular/core';
import { PostService } from '../post/post.service';
import { PostItem } from '../post/post-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ads : PostItem[];

  constructor(private postService : PostService) { }

  ngOnInit() {
     this.ads = this.postService.getAllPosts();
  }

}
