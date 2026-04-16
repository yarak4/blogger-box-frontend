import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../services/post.service';
import { Post } from '../../data/post';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList implements OnInit {
  posts$: Observable<Post[]> = new Observable();

  constructor(private postService: PostService) {}
  
  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }
}