import { Component, OnInit } from '@angular/core';
import { AskQuotation } from '../../modal/ask-quotation';
import { Router } from '@angular/router';
import { VictorServiceService } from '../../apiService/victor-service.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  orders:AskQuotation[];
  agentCompany=localStorage.getItem('agent_id')
    constructor(private router:Router, private ordersrv:VictorServiceService) { 
      this.ordersrv.getOrderList(localStorage.getItem('user_name')).subscribe((data: AskQuotation[])=>{
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
  
