import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agentdashboard',
  templateUrl: './agentdashboard.component.html',
  styleUrls: ['./agentdashboard.component.css']
})
export class AgentdashboardComponent implements OnInit {

  todayDate;
  constructor() { 
    this.todayDate=new Date().toLocaleDateString();
  }

  ngOnInit() {
  }

}
