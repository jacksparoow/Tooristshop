import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import { AgenthomeComponent } from './agenthome/agenthome.component';

const routes: Routes = [
  {
    path: '',
    component: AgenthomeComponent,
    children:[
      {path:'',component:AgentdashboardComponent},
      
      {path:'order',component:OrderlistComponent},
 
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
