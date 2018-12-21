import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VictorServiceService } from '../../apiService/victor-service.service';
import { Registration } from '../../modal/Registration';
import { Role } from '../../modal/Role';
import { Project } from '../../modal/project';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { Company } from 'src/app/modal/company';
import { UserRegister } from 'src/app/modal/user-register';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createuserForm;
  phoneNumber="";
  userName="";
  password="";
  cPassword="";
  companyID="";
  email="";
  firstName="";
  lastName="";
  roleName="";
  projectName="";
  user: UserRegister;

//user1: Registration;
roles: Role[];
companies : Company[];
selectedCompany;
//roleiid;
selectedRole;
selectedProject;
bRoleid = false;
projects: Project[];
cpy=false;
cpn=false;
cpass;
//roles: string[];
//projects: string[];
  constructor(private router:Router,private usersrv:VictorServiceService) {
 
    this.user =new UserRegister();
   
    this.roles = [];

    this.createuserForm=new FormGroup({
      'phoneNumber':new FormControl('',Validators.compose([Validators.required])),
      'companyID':new FormControl('',Validators.compose([Validators.required])),
      'userName':new FormControl('',Validators.compose([Validators.required])),
      'password':new FormControl('',Validators.compose([Validators.required])),
      'cPassword':new FormControl('',Validators.compose([Validators.required])),
      'email':new FormControl('',Validators.compose([Validators.required])),
      'firstName':new FormControl('',Validators.compose([Validators.required])),
      'lastName':new FormControl('',Validators.compose([Validators.required])),
      'projectName':new FormControl('',Validators.compose([Validators.required])),
      'roleName':new FormControl('',Validators.compose([Validators.required])),
    }); 

    this.usersrv.get_projects_of_company(localStorage.getItem('user_name')).subscribe((data: Project[])=>{
      this.projects = data;
      console.log(this.projects);
      
    });

    this.usersrv.get_uers_roles_company().subscribe((data: Role[])=>{
      this.roles = data;
      console.log(this.roles);
      
    });
    this.usersrv.getAllCompanies().subscribe((data: Company[])=>{
      this.companies = data;
      console.log(this.companies);
      
    });
   }

  ngOnInit() {
  }

  confirmpassword(event: any){
    // console.log(event.target.value);
    if(this.user.passwordhash == event.target.value){
       this.cpy = true;
       this.cpn = false;
    }else{
     this.cpy = false;
     this.cpn = true;
    }
     //this.user.password = event.target.value;
    // console.log('password', this.user.password);
 }
 selectRole(){
   for(let i =0;i<this.roles.length;i++){
     if(this.selectedRole==this.roles[i].name){
       this.user.roleid = this.roles[i].id;
       break;
     }
   }
   // console.log(this.user.role.name);
   }
 selectProject(){
  for(let i =0;i<this.projects.length;i++){
    if(this.selectedProject==this.projects[i].name){
      this.user.projectid = this.projects[i].projectid;
      break;
    }
  }
    
 }
 selectCompany(){
   for(let i=0;i<this.companies.length;i++){
     if(this.selectedCompany == this.companies[i].companyname){
       this.user.companyid= this.companies[i].companyid;
       break;
     }
   }
   console.log(this.user.companyid);
 }
 
 createUser(createuserForm){
   
  
   console.log('form submitted',this.user);
   this.phoneNumber=createuserForm.phoneNumber;
   this.userName=createuserForm.userName;
   this.password=createuserForm.password;
   this.cPassword=createuserForm.cPassword;
   this.companyID=createuserForm.companyID;
   this.email=createuserForm.email;
   this.firstName=createuserForm.firstName;
   this.lastName=createuserForm.lastName;
   this.projectName=createuserForm.projectName;
   this.roleName=createuserForm.roleName;

   if(this.phoneNumber.length===0||this.userName.length===0||
     this.password.length===0||this.cPassword.length===0||
     this.companyID.length===0||this.email.length===0||
     this.firstName.length===0||this.lastName.length===0||
     this.projectName.length===0||this.roleName.length===0){
       console.log(this.phoneNumber,this.userName,this.password,
         this.cPassword,this.companyID,this.email,this.firstName,
         this.lastName,this.projectName,this.roleName);
      //alert('Please Fill All Field');
      this.usersrv.p_create_user(this.user).subscribe((res: any)=>{
        this.user = res;
       //  this.router.navigateByUrl('home/users');
       });
       alert('User Created Successfully');
    
      //return;
   }else{
    console.log('submitted',this.user);
    alert('User Created Successfully');
    
     this.usersrv.p_create_user(this.user).subscribe((res: any)=>{
       this.user = res;
      //  this.router.navigateByUrl('home/users');
      });
    
   
   }
   
 //console.log(this.user.phoneNumber);
// console.log(this.user.userName);
 
 }
 cancleuser(){
   console.log('cancel User');
   this.router.navigateByUrl('home/users');
 }

}
