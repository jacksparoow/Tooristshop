import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VictorServiceService } from '../../apiService/victor-service.service';
import { UserLeads } from '../../modal/UserLeads';
import {throwError} from 'rxjs';
import { Company } from 'src/app/modal/company';
import { Role } from 'src/app/modal/Role';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
user_name;
leadsCount: UserLeads;
loading=false;
bsAdmin=false;
role_name;
show=false;
showCallerNClosure=true;
roles:Role[];
companies: Company[];
cid;
loginCompanyName;
  constructor(private router: Router, private leadscountsrv:VictorServiceService) {
    //this.loading=true;
    if(localStorage.getItem('role_id')=='3' || localStorage.getItem('role_id')=='4'){
      this.showCallerNClosure=false;
    }
    this.roles=[];
    this.user_name= localStorage.getItem('user_name');
    this.role_name= localStorage.getItem('role_name');
     this.cid= localStorage.getItem('company_id');
   
   
    console.log('accd',this.user_name);
    console.log(localStorage.getItem('vc_token'));

    console.log(localStorage.getItem('role_id'));
    this.leadscountsrv.get_leads_count_company(this.user_name).subscribe((data: UserLeads)=>{
      //console.log(data);
      this.leadsCount = data;
      localStorage.setItem('user', JSON.stringify(this.leadsCount));
      var user = JSON.parse(localStorage.getItem('user'));
      //console.log('local storage',user);
      this.loading=false;
    },
    error => {
      console.error("Error in get company Api or token expired!");
      sessionStorage.clear();
      return throwError(error);  // Angular 6/RxJS 6
     });

     this.leadscountsrv.getAllCompanies().subscribe((data: Company[])=>{
      this.companies = data;
     // this.loginCompanyName = sessionStorage.getItem('CompanyId');
      for(let index=0;index<this.companies.length;index++){
          if(this.companies[index].companyid==+localStorage.getItem('company_id')){
            this.loginCompanyName = this.companies[index].companyname;
            localStorage.setItem('loginCompany',this.loginCompanyName);
            break;
          }
      }
     
  
    },error=>{
      
      console.error('Error in get Api, Companies!');
      return throwError(error);
   });

  
  }
  ngOnInit() {
  }
  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}
 w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}
dashBoard(){
  this.router.navigateByUrl('home');
}
showHide(){
  this.show=!this.show;
}
logOut(){
localStorage.clear();
  //console.log(sessionStorage.getItem('user_name'));
  this.router.navigateByUrl('');
}

}
