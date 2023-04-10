import { User } from './../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../service/api.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  public userID!: number;
  userDetail!: User
  constructor(private activatedroute: ActivatedRoute, private api: ApiService) { }
  ngOnInit() {
    this.activatedroute.params.subscribe(val => {
      this.userID = val['id']
      this.fetchUserDetail(this.userID)
    })
  }
  fetchUserDetail(userID: number) {
    this.api.getRegisterUserId(userID).subscribe(res => {
      this.userDetail = res
      console.log(this.userDetail);

    })
  }
}
