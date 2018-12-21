import { Component, OnInit } from '@angular/core';
import { VictorServiceService } from '../../apiService/victor-service.service';
import { Router } from '@angular/router';
import { Agent } from '../../modal/agent';

@Component({
  selector: 'app-manage-agent',
  templateUrl: './manage-agent.component.html',
  styleUrls: ['./manage-agent.component.css']
})
export class ManageAgentComponent implements OnInit {
agents: Agent[];
  constructor(private agentservice: VictorServiceService, private router: Router) { 
    this.agentservice.getAgentList(localStorage.getItem('company_id')).subscribe((data: Agent[])=>{
      this.agents = data;
      //this.loading=false;
      console.log(this.agents);
      
    });
  }

  ngOnInit() {
  }
 
  addAgent(){
    console.log('add Agent');
  }
  getMyOrders(agentid){
    localStorage.setItem('agent_id',agentid);
    this.router.navigateByUrl('home/orderlist');
  }
}
