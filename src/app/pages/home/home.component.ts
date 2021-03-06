import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users=[];
  posts=[];
  
  isLoading=false;


  constructor(private db:AngularFireDatabase,
    private toastr:ToastrService) { 
      this.isLoading=true;

      //get all the users
      db.object('/users')
      .valueChanges()
      .subscribe((obj)=>{
        if(obj){
          this.users =Object.values(obj);
          this.isLoading=false;
        }else{
          toastr.error('No User Found');
          this.users=[]
          this.isLoading=false;

        }
      });

      //grab all the posts from firebase
      db.object('/posts')
      .valueChanges()
      .subscribe((obj) =>{
        if(obj){
          this.posts=Object.values(obj).sort((a,b) => b.date - a.date);
          this.isLoading=false;

        }else{
          toastr.error('No Posts to Display');
          this.posts=[];
          this.isLoading=false;
        }
      });
    }

  ngOnInit(): void {
  }

}
