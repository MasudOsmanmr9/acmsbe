import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usersLists: any[] = [];
  fieldsPermission: any[] = ['id', 'name', 'useremail', 'userpassword', 'type'];
  constructor(private UserService: UserService) { }

  async ngOnInit(): Promise<void> {
    // this.usersLists = this.UserService.getUsers();
    var res = await this.UserService.fetchUsersList();
    if (res.Success) {
      this.usersLists = res.Data;
    }
  }

  userEditf: Function = (value: any) => {
    console.log('this is working for edit', value);
  }
  userDeletef: Function = (value: any) => {
    console.log('this is working for delete', value);
  }

}
