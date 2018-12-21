import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VictorServiceService } from '../../apiService/victor-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  user_name;
  grant_type;
  password;
  bUserName= false;
  bPassword = false;
  bForm = false;
  val1: string;
  val2: string;
  result: any;
  result1: any;
  failedLogin = false;
  loginResult;
  constructor(private router: Router, private loginService: VictorServiceService) { 
    this.loginForm = new FormGroup( {
      'userName': new FormControl('', Validators.compose([Validators.required])),
      'password': new FormControl('', Validators.compose([Validators.required])),
     });
  }

  ngOnInit() {
  }
  checkPassword(event: any){
    this.val2= event.target.value;
    if(this.val2.length === 0){
     this.bPassword = true;
    }
 
     }
   
   checkUsername(event: any){
     this.val1= event.target.value;
     if(this.val1.length === 0){
      this.bUserName = true;
     }
   }
   selectUser(user){
      if(user==='staff'){
     this.grant_type='password';
     console.log('staff');
      }else{
        this.grant_type='agent_password';
      }
   }
  submit(loginDetails){
    console.log('submit');
    this.user_name = loginDetails.userName;
    this.password = loginDetails.password;
    
    if(this.user_name.length ===0 || this.password.length=== 0){
      this.bForm = true;
      return;
    }else{           

   this.loginResult= this.loginService.login(this.user_name,this.password,this.grant_type).subscribe((res: any)=> {
    
      console.log('loginurl response', res);
      
      localStorage.setItem('company_id', res.companyid);
      console.log('sdfsadfsdf',localStorage.getItem('company_id'));
      localStorage.setItem('role_id', res.roleid);
      localStorage.setItem('role_name', res.rolename);
      localStorage.setItem('user_name', res.username);
      localStorage.setItem('company_name', res.companyname);

      
     // console.log(this.user_name);
     localStorage.setItem('vc_token', res.access_token);
     if(res.rolename=='agent'){
      this.router.navigate(['agenthome']);
     }else{
      this.router.navigate(['home']);
     }
      
   
     });
    
  }
}
}