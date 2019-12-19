
 import { Component, OnInit } from '@angular/core';
 import { RouterModule, Routes ,Router} from '@angular/router';
 import { ToastrService } from 'ngx-toastr';

 // Components
 import { PostListComponent } from '../Post Management/post-list/post-list.component';
import { PostAddComponent } from '../Post Management/post-add/post-add.component';
import { PostDetailsComponent } from '../Post Management/post-details/post-details.component';

 // Services
 import { routerTransition } from '../../services/config/config.service';


 @Component({
 	selector: 'app-home',
 	templateUrl: './home.component.html',
 	styleUrls: ['./home.component.css'],
 	animations: [routerTransition()],
 	host: {'[@routerTransition]': ''}
 })


 export class HomeComponent implements OnInit {
 	active:string;
 	constructor(private router: Router,private toastr: ToastrService) {
 		// Detect route changes for active sidebar menu
 		this.router.events.subscribe((val) => {
 			this.routeChanged(val);
 		});
 	}

 	ngOnInit() {
 	}

 	// Detect route changes for active sidebar menu
 	routeChanged(val){
 		this.active = val.url;
 	}
 }

 export const homeChildRoutes : Routes = [
	{
		path: '',
		component: PostListComponent
	},
	{
		path: 'add',
		component: PostAddComponent
	},
	{
		path: 'update/:id',
		component: PostAddComponent
	},
	{
		path: 'detail/:id',
		component: PostDetailsComponent
	}
	];
