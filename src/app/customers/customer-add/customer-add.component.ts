import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VictorServiceService } from '../../apiService/victor-service.service';
import { UserLeads } from '../../modal/UserLeads';
import {throwError} from 'rxjs';
@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  public leadsStatusName:string[];
  public leadsStatusValues:number[];
  public pieChartLabels:string[] = ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"];
  public pieChartData:number[] = [21, 39, 10, 14, 16];
  public pieChartType:string = 'pie';
  public pieChartOptions:any = {'backgroundColor': [
               "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB",
             "#4BC0D0",
           "#FFCE66",
           "#E7E9BD",
           "#36A2DB",
           "#4BC0F0",
           "#FFCE96",
           "#E7E9AD",
           "#36A2AB",
           "#4BC0M0",
           "#FFCE86",
           "#E7E9BD"
            ]}
  
leadsCount: UserLeads;
todayDate;
loading=false;
showCallerNClosure=true;
  constructor(private router: Router, private leadsrv: VictorServiceService) { 
    if(localStorage.getItem('role_id')=='3' || localStorage.getItem('role_id')=='4'){
      this.showCallerNClosure=false;
    }
    console.log(sessionStorage.getItem('company_id'));
    this.todayDate=new Date().toLocaleDateString();
    this.loading=true;
    this.leadsrv.get_leads_count_company(localStorage.getItem('user_name')).subscribe((data: UserLeads)=>{
      console.log('leads count',data);
      this.leadsCount = data;
      this.leadsStatusName = Object.keys(this.leadsCount);
      this.leadsStatusValues = Object.values(this.leadsCount);
      console.log('leadname',this.leadsStatusValues);
      this.loading=false;
    },
    error => {
      console.error("Error in get company Api or token expired!");
      sessionStorage.clear();
    //  alert('Your session has been expired! Login Again');
    //  this.router.navigate(['']);
      return throwError(error);  // Angular 6/RxJS 6
     }
  );
  }

  ngOnInit() {
  }

  navigateLead(path){
    this.router.navigateByUrl(path);
  }

  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }
 
 // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Jan', 'Feb', 'March', 'April', 'May', 'June'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 100, 55, 150], label: 'Target Leads'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Acheived Leads'}
  ];
  lineChartOptions = {
    responsive: true
  };
  user1='Akash';
  user2='Niyati';
  user3='Himanshi';
  lineChartData = [
    { data: [330, 600, 260, 700], label: this.user1 },
    { data: [120, 455, 100, 340], label: this.user2 },
    { data: [45, 67, 600, 900], label: this.user3 }
  ];
  lineChartLabels = ['January', 'February', 'Mars', 'April'];

  onLinChartClick(event) {
    console.log(event);
  }
  public doughnutChartLabels:string[] = ['Fresh Leads', 'Follow Up', 'Visited','Converted'];
  public doughnutChartData:number[] = [350, 300, 200,100];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public doughnutChartClicked(e:any):void {
    console.log(e);
  }
 
  public doughnutChartHovered(e:any):void {
    console.log(e);
  }
}
