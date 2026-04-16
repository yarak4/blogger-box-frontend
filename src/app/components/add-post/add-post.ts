import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { Category } from '../../data/category';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-post',
  standalone: false,
  templateUrl: './add-post.html',
  styleUrl: './add-post.css',
})

export class AddPost implements OnInit {
  categories: Category[] = [];
  postForm: FormGroup;

  
  constructor (private fb: FormBuilder, private categoryService: CategoryService, private postService: PostService, private router: Router) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      categoryId: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(2500)]],
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  get title() {
    return this.postForm.get('title');
  }

  get categoryId() {
    return this.postForm.get('categoryId');
  }

  get content() {
    return this.postForm.get('content');
  }

  onSubmit() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please review your post",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.postService.createPost(this.postForm.value).subscribe(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Post submitted successfully",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/']);
    });
  }

  onClose() {
    this.router.navigate(['/']);
  }
}