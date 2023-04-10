import { NgToastService } from 'ng-angular-popup';
import { Component, OnInit, ViewChild } from '@angular/core';
//metarila
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// ng-confirm -box
import { NgConfirmService } from 'ng-confirm-box';

import { User } from '../models/user.model';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {
  public dataSource!: MatTableDataSource<User>
  public users!: User[]
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'mobile',
    'bmiResult',
    'gender',
    'package',
    'enquiryDate',
    'action',
  ]
  constructor(
    private api: ApiService,
    private router: Router,
    private confrm: NgConfirmService,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.api.getRegisterUser()
      .subscribe(res => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number) {
    this.router.navigate(['update', id])
  }

  delete(id: number) {
    this.confrm.showConfirm(("Are you sure want to delete ?"),

      () => {
        this.api.deleteRegister(id)
          .subscribe(res => {
            this.toast.success({ detail: "Success", summary: "Delete Update", duration: 3000 });
            this.getUser()
          })
      },

      () => {

      }
    )

  }
}
