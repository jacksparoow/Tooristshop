import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { AgentheaderComponent } from './agentheader/agentheader.component';
import { AgentfooterComponent } from './agentfooter/agentfooter.component';
import { AgenthomeComponent } from './agenthome/agenthome.component';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';

@NgModule({
  imports: [
    CommonModule,
    AgentRoutingModule
  ],
  declarations: [OrderlistComponent, AgentheaderComponent, AgentfooterComponent, AgenthomeComponent, AgentdashboardComponent]
})
export class AgentModule { }
