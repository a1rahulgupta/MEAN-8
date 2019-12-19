import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../services/config/config.service';
import { PostService } from '../../../services/post/post.service';
import { routerTransition } from '../../../services/config/config.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  postAddForm: FormGroup;
  postId: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private postService: PostService, private toastr: ToastrService) {
    this.route.params.subscribe(params => {
			this.postId = params['id'];
			// check if ID exists in route & call update or add methods accordingly
			if (this.postId && this.postId !== null && this.postId !== undefined) {
				this.getPostDetails(this.postId);
			} else {
				this.createForm(null);
			}
		});
  }
  ngOnInit() {

  }

  doRegister() {
		if (this.postId && this.postId !== null && this.postId !== undefined) {
      this.postAddForm.value.id = this.postId;
      this.updatePost();
		} else {
      this.postId = null;
      this.addNewPost();
    }
}

addNewPost(){
  this.postService.addNewPost(this.postAddForm.value).subscribe((res: any) => {	
    if (res.code === 200) {
      this.toastr.success(res.message, 'Success');
      this.router.navigate(['/']);
    } else {
      this.toastr.error(res.message, 'Failed');
    }
})
}
updatePost(){
  this.postService.updatePost(this.postAddForm.value).subscribe((result) => {
    const rs = result;
    if (rs.code === 200) {
      this.router.navigate(['/']);
      this.toastr.success("success",rs.message);
    } else {
      this.toastr.error(rs.message);
    }
  });
}
  getPostDetails(postId){
    this.postService.getPostById({postId:postId}).subscribe((result) => {
      const rs = result;
      if (rs.code === 200) {
        this.createForm(rs.data);
      } else {
        this.toastr.error(rs.message);
      }
    });
  }

  createForm(data) {
    if (data === null) {
      this.postAddForm = this.formBuilder.group({
        postName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        postDesc: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        postCategory: ['', [Validators.required]],
        postStatus: ['', [Validators.required, Validators.required]]
      });
    } else {
      this.postAddForm = this.formBuilder.group({
        postName: [data.postData.postName, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        postDesc: [data.postData.postDesc, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        postCategory: [data.postData.postCategory, [Validators.required]],
        postStatus: [data.postData.postStatus, [Validators.required]]
      });
    }
  }

}

