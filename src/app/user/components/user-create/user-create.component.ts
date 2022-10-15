import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollectionsBuilderService } from 'src/services/collections-builder-service.service';
import { UserService } from 'src/services/user.service';


export interface FormSchema {
  id: string
  type: string
  name: string
  useremail:string
  userpassword:string
  userCollectionAccess: any
  // selectOptions?: string[]
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  errorShowOnSubmit: boolean = false;
  date = new Date();
  collectionDropShow:boolean = false;
  usersOption: any[] = [
    'superAdmin',
    'admin',
    'user'
  ]

  userFormGroupHolder!: FormGroup;
  createUserformschema: FormSchema = {
    'id': '',
    'type': '',
    'name': '',
    'useremail':'',
    'userpassword':'',
    'userCollectionAccess': ''

  }
  createUserBuilderGroup = {
    'id': [this.date.getTime().toString(), [Validators.required]],
    'type': [],
    'name': ['', [Validators.required]],
    'useremail':[],
    'userpassword':[],
    'userCollectionAccess': []
  }
  collectionsLists: any[] = [];
  constructor(private fb: FormBuilder, private cs: CollectionsBuilderService, private UserService: UserService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    // this.collectionsLists = [...this.cs.getcollectionsList()];
     var res = await this.cs.fetchAllCollection();
    if (res.Success) {
      this.collectionsLists = res.Data;
    }
    this.userFormBuilderGroupInitialize();
  }

  async createUser() {
    this.errorShowOnSubmit = true;
    console.log('user data', this.userFormGroupHolder.value);
    let userSaved = await this.UserService.saveUser(this.userFormGroupHolder.value);
    if(userSaved?.Success){
      this.router.navigateByUrl('/user/user-list');
    }
  }

  userFormBuilderGroupInitialize() {
    this.userFormGroupHolder = this.fb.group(this.createUserBuilderGroup);
  }
  showCollectionDroplist(e:any){
    console.log('eventssssss ::',e);
    e == 'admin' ? this.collectionDropShow = true : this.collectionDropShow = false;
  }
}
