import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../services/config/config.service';
import { PostService } from '../../../services/post/post.service';
import { routerTransition } from '../../../services/config/config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  postId: any;
  postDetail: any ={};
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private postService: PostService, private toastr: ToastrService) {
    this.route.params.subscribe(params => {
			this.postId = params['id'];
			// check if ID exists in route & call update or add methods accordingly
			if (this.postId && this.postId !== null && this.postId !== undefined) {
				this.getPostDetails(this.postId);
			}
		});
  }

  ngOnInit() {
  }

  getPostDetails(postId){
    this.postService.getPostById({postId:postId}).subscribe((result) => {
      const rs = result;
      if (rs.code === 200) {
        this.postDetail = rs.data.postData;
      } else {
        this.toastr.error(rs.message);
      }
    });
  }
}
