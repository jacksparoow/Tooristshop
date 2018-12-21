import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { VictorServiceService } from '../../apiService/victor-service.service';
import { MyLead } from '../../modal/MyLead';
import { MyItems } from '../../modal/myItems';
import {throwError} from 'rxjs';
import { UserLeads } from '../../modal/UserLeads';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Project } from '../../modal/project';
import { Registration } from '../../modal/Registration';
import { HttpResponse } from '@angular/common/http';
import { Agent } from '../../modal/agent';
import { AskQuotation } from '../../modal/ask-quotation';

@Component({
  selector: 'app-current-leads',
  templateUrl: './current-leads.component.html',
  styleUrls: ['./current-leads.component.css']
})
export class CurrentLeadsComponent implements OnInit {
  modalRef: BsModalRef;
  loading = false;
  newItem: MyItems;
  newQuotation: AskQuotation;
  indicesOfSelectedLeads = [];
  selectedProjectName;
  selectedProjectId;
  public uniqueNameList: any;
  public projectNameList: string[];
  public projects: Project[];
  public myLead: MyLead[];
  public selectedLead: MyLead;
  public numberOfSelectedLead = 0;
  leadItems: MyItems[];
  newlist: string[];
  dropdownSettings = {};
  // dropdownList = [];
   selectedAgentList = [];
   selectedAgentIdList = [];
   dropdownListAgent = [];
   dropdownListAgentIds = [];
    multiSelectDropdownSelectedTokens = [];
   userList = [];
   leadDetails:MyLead;
   dropdownSettingsAgent = {};
   dropdownListA = [];
 //  selectedUserListA = [];
   status='1';
   isUsers= false;
   pageNumber=1;
   agents:Agent[];
   cid;
   users: Registration[];
   chekedLead=false;
   leadsCount: UserLeads;
   
   isRowSelect= false;
    isUserSelect = false;
    isAssignSelect = false;
    isButton = false;
  constructor(private router:Router,private currentleadsrv:VictorServiceService,
    private bsmodalservice: BsModalService) {
     this.newlist = [];
     this.projectNameList = ['Select A project'];
      this.uniqueNameList =[];
     this.myLead=[];
     this.agents=[];
    // this.selectedLead = [];
     this.cid = localStorage.getItem('comapany_id');  
     this.loading=true;
     if(localStorage.getItem('role_id')=='5'){
      this.currentleadsrv.getOtherLeadsbyCompanyId(
        localStorage.getItem('company_id'),this.status).subscribe((data: MyLead[]) => {
        this.myLead = data;
        this.loading=false;
         console.log(this.myLead);
        
        // this.myLead1 = this.myLead.slice(0,5);
        return true;
        },error => {
            console.error("Error in Api!");
            return throwError(error);  // Angular 6/RxJS 6
        }); 
       
        
     }else{
      this.currentleadsrv.getOtherLeads(
        localStorage.getItem('user_name'),this.status).subscribe((data: MyLead[]) => {
        this.myLead = data;
        this.loading=false;
         console.log(this.myLead);
        
        // this.myLead1 = this.myLead.slice(0,5);
        return true;
        },error => {
            console.error("Error in Api!");
            return throwError(error);  // Angular 6/RxJS 6
        }); 
       
     }
     
      this.currentleadsrv.get_leads_count_company(localStorage.getItem('user_name')).subscribe((data: UserLeads)=>{
        console.log(data);
        this.leadsCount = data;
        this.loading=false;
      },
      error => {
        console.error("Error in get company Api or token expired!");
        sessionStorage.clear();
        return throwError(error);  // Angular 6/RxJS 6
       });
   }

  ngOnInit() {
    this.currentleadsrv.getAgentList(localStorage.getItem('company_id')).subscribe((res:Agent[])=>{
      // console.log(res);
      this.agents = res;
       console.log('Agent list',this.agents);
      
       // if(this.agents!=null){
       //   let len = this.agents.length;
       for(let i =0;i<this.agents.length;i++){
         let name = this.agents[i].companyname + ' (' + this.agents[i].username+')';
         let id = this.agents[i].agentid;
         this.dropdownListAgent.push(name);
         this.dropdownListAgentIds.push(id);
         

     //  }
       
     }
     console.log('dropdown list',this.dropdownListAgent);
       
   });
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };
    this.dropdownSettingsAgent = {
      singleSelection: false,
      idField: 'itemid',
      textField: 'item_text',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


     
  }

   openModelWindow(template:TemplateRef<any>,lead_index){
    this.modalRef = this.bsmodalservice.show(template);
    this.selectedLead = this.myLead[lead_index];
    console.log('lead_index',lead_index);
   

  }
  onItemSelectA(item: any) {
    //selected users
    console.log('selected Agents', this.selectedAgentList)     
    if(this.selectedAgentList.length!=0){
      this.isUserSelect = true;
  }else{this.isUserSelect = false;}               
} // end of onItemSelect
  onRowSelect(lead_index) {
    console.log('lead index: ',lead_index);
   // openModelWindow(template);
  
    }
    sendToAgents(){
      for(let j =0;j<this.selectedAgentList.length;j++)
      {  
        let index_selectedAgent = this.dropdownListAgent.indexOf(this.selectedAgentList[j]);
        this.selectedAgentIdList.push(this.dropdownListAgentIds[index_selectedAgent]);
        this.newQuotation = new AskQuotation();
        this.newQuotation.leadid = this.selectedLead.leadid;
        this.newQuotation.agentid= this.dropdownListAgentIds[index_selectedAgent];
       this.newQuotation.username = localStorage.getItem('user_name');
       this.newQuotation.companyname = localStorage.getItem('loginCompany');
       this.currentleadsrv.pAskQuotation(this.newQuotation).subscribe((res:any)=>{
        console.log('quotation sent',res);
        alert('Request submitted Successfully');
  
    
      },error=>{
        
        console.error('Error in Ask Quotation, post Api,!');
        alert('Request not submitted! Try Again');
        return throwError(error);
     });
      }
      console.log('selected Ids',this.selectedAgentIdList);
      

          console.log('selected lead', this.selectedLead);
         
      // for(let i=0;i<this.selectedLead.length;i++){
      //      this.loading=true;
      //      console.log('updated leads',this.selectedLead[i]);
      //      this.currentleadsrv.updateLeads(this.selectedLead[i],this.selectedLead[i].leadid).subscribe((res: HttpResponse<Text>)=> {
       
      //  this.loading=false;
      //  alert('leads assigned successfully');
      //  });

      //   }
      //   this.router.navigateByUrl('home/current');
      }

      cancelAssignment(){
        this.modalRef.hide();
       // this.router.navigateByUrl('home/current');
      }

      
     
}
