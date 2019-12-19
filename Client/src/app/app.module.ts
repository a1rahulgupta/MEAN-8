import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';

// Modules
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './pipes/filter.pipe';
// Components
import { AppComponent } from './components/index/app.component';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { PostAddComponent } from './components/Post Management/post-add/post-add.component';
import { PostListComponent } from './components/Post Management/post-list/post-list.component';
import { PostDetailsComponent } from './components/Post Management/post-details/post-details.component';
import { PostService } from './services/post/post.service';




@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		PostAddComponent,
		PostListComponent,
		PostDetailsComponent,
		FilterPipe
		

	],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: 'toast-bottom-right',
			preventDuplicates: true,
		}),
	],
	providers: [PostService],
	bootstrap: [AppComponent]
})

// enableProdMode();

export class AppModule { }
