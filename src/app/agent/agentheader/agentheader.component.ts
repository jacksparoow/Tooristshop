import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agentheader',
  templateUrl: './agentheader.component.html',
  styleUrls: ['./agentheader.component.css']
})
export class AgentheaderComponent implements OnInit {

  user_name;
  loginCompanyName;
  constructor(private router: Router) { 

    this.user_name= localStorage.getItem('user_name');
    this.loginCompanyName= localStorage.getItem('company_name');

  }

  ngOnInit() {
  }

  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}
 w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}
  logOut(){
    localStorage.clear();
      //console.log(sessionStorage.getItem('user_name'));
      this.router.navigateByUrl('');
    }

    dashBoard(){
      this.router.navigateByUrl('agenthome');
    }

}
