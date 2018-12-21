import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VictorServiceService } from '../../apiService/victor-service.service';
import { AskQuotation } from '../../modal/ask-quotation';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
orders:AskQuotation[];
agentCompany=localStorage.getItem('agent_id')
  constructor(private router:Router, private ordersrv:VictorServiceService) { 
    this.ordersrv.getQuotationOrderList(localStorage.getItem('agent_id')).subscribe((data: AskQuotation[])=>{
      this.orders = data;
     // this.loading=false;
     // console.log('Orders',this.documents,localStorage.getItem('project_id'));
    //  this.numberOfRecord = this.documents.length;
     console.log('orders', this.orders);
    });
  }

  ngOnInit() {
  }

}
