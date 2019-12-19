import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public totalCount: number = 0;
  public pagination: any = {
    'page': 1,
    'count': 5,
  };
  allPostList: any = [];
  constructor(private postService: PostService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllPost();
  }

  public getAllPost() {
    this.postService.getAllPost(this.pagination).subscribe((result) => {
      if (result.code === 200) {
        this.totalCount = Math.ceil(parseInt(result.data.total_count) / this.pagination.count);
        this.allPostList = result.data.data;
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  next() {
    this.pagination.page = this.pagination.page + 1
    this.getAllPost();
  }

  prev() {
    this.pagination.page = this.pagination.page - 1;
    this.getAllPost();
  }

  deletePost(postId: number) {
    const r = confirm('Are you sure?');
    if (r === true) {
      this.postService.deletePost({ postId: postId }).subscribe((result) => {
        const rs = result;
        if (rs.code === 200) {
          this.toastr.success('Success', rs.message);
          this.getAllPost();
        } else {
          this.toastr.error(rs.message);
        }

      })
    }
  }
}