import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { VictorServiceService } from '../../apiService/victor-service.service';
import { MyItems } from '../../modal/myItems';
import { MyLead } from '../../modal/MyLead';
import { Project } from '../../modal/project';
import { Registration } from '../../modal/Registration';
import { Nameid } from '../../modal/nameid';
import {throwError} from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import {HttpResponse } from '@angular/common/http';
import { UserLeads } from '../../modal/UserLeads';
@Component({
  selector: 'app-raw-leads',
  templateUrl: './raw-leads.component.html',
  styleUrls: ['./raw-leads.component.css']
})
export class RawLeadsComponent implements OnInit {
  modalRef: BsModalRef;
  blist;
loading = false;
remarks;
x:string[] = [];
expand=[true,true,true,true,true,true,true,true,true,true];
collapse=[false,false,false,false,false,false,false,false,false,false];
chekedLead=false;
selectedUsers;
userNameId: Nameid[];
spliceIndexS;
spliceIndexE;
token;
newItem: MyItems;
public projectNameList: string[];
 public uniqueNameList: any;
 selectedProjectId;
bExcel = false;
  public myLead: MyLead[];
   
   users: Registration[];
   isUsers= false;
  alertMsg= 'Please enter valid page number! 0 To  ';
  
 rawLeadsCount = +localStorage.getItem('rawLeadsCount');
//abcd = 3.6;
//abcde = Math.floor(this.abcd);

  public myLead1: MyLead[];
  public selectedLead: MyLead[];
  public projects: Project[];
    dropdownSettings = {};
    dropdownList = [];
    selectedUserList = [];
    userList = [];
  projectList = ['99acre','housing.com','ASC','DLF'];
    dropdownSettingsA = {};
    dropdownListA = [];
    dropdownListAU = [];
    multiSelectDropdownSelectedIds = [];
    multiSelectDropdownSelectedTokens = [];
    selectedUserListA = [];
    selectedProjectName;
    indexL;
    indexLI;
    indexRawLeads;
    //leadItems: MyItems[];
    leadDetails:MyLead;
    filter = false;
    isRowSelect= false;
    isUserSelect = false;
    isAssignSelect = false;
    isButton = false;
    
    msg = false;
    msg2 = false;
    public numberOfSelectedLead = 0;
    key;
    indicesOfSelectedLeads = [];
    pageNumber=1;
    status=16;
    numberOfPage;
    leadsCount : UserLeads;
 cid;
  constructor(private router:Router,private rawLeadsrv:VictorServiceService,
      private bsmodalservice: BsModalService) { 
        var user = JSON.parse(localStorage.getItem('user'));
      //  this.numberOfPage = user.rawLeadsCount
      this.numberOfPage = Math.ceil(user.rawLeadsCount/10);
      this.projectNameList = ['Select A project'];
      this.uniqueNameList =[];
      this.userNameId= [];
      this.users = [];
      this.selectedLead = [];
      this.myLead1 = [];
      this.cid = localStorage.getItem('company_id');
      console.log('raw lead session',this.cid);
  //this.newItem = new MyItems();
  console.log('cid',localStorage.getItem('company_id'));
  this.rawLeadsrv.get_leads_count_company(localStorage.getItem('user_name')).subscribe((data: UserLeads)=>{
    console.log(data);
    this.leadsCount = data;
    this.loading=false;
  },
  error => {
    console.error("Error in get company Api or token expired!");
    sessionStorage.clear();
    return throwError(error);  // Angular 6/RxJS 6
   });

  this.loading=true;
      this.rawLeadsrv.g_rawLeads_with_paging(
        localStorage.getItem('user_name'),this.pageNumber).subscribe((data: MyLead[]) => {
        this.myLead = data;
        this.loading=false;
         console.log(this.myLead);
        
        // this.myLead1 = this.myLead.slice(0,5);
        return true;
        },
        error => {
                  console.error("Error in Api!");
                  return throwError(error);  // Angular 6/RxJS 6
                  });

                          
      
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsA = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    
  }

  getDatabyPageNumber(){
    console.log('page number');
    //let status=16;
    //let pageNumber=1;
    this.loading=true;
    if(this.pageNumber>0 && this.pageNumber <=this.numberOfPage){
      this.rawLeadsrv.g_rawLeads_with_paging(
        localStorage.getItem('user_name'),this.pageNumber).subscribe((data: MyLead[]) => {
        this.indexL = data.length;
        this.myLead = data;
        this.loading=false;
         console.log(this.myLead);
        
        //this.myLead1 = this.myLead.slice(0,5);
        return true;
        }, error => {
           console.error("Error in Api!");
           return throwError(error);  // Angular 6/RxJS 6
        }
        ); 
      }else{
        this.alertMsg = this.alertMsg + String(this.numberOfPage);
              alert(this.alertMsg);
              this.alertMsg = 'Please enter valid page number! 0 To  ';
      }
    
  }// end of getDatabyPagenumber
  onRowSelect(event: any, i) {
    if(event== true){
    this.numberOfSelectedLead = this.numberOfSelectedLead +1;
    this.indicesOfSelectedLeads.push(i);
  
  }else{
    
      let index = this.indicesOfSelectedLeads.indexOf(i); // returns 0
      this.indicesOfSelectedLeads.splice(index, 1);
      //The first parameter is the index at which we want to remove,
      // and the second is the number of elements to remove, starting from that index.
  
    this.numberOfSelectedLead = this.numberOfSelectedLead -1;
  
  }
  if(this.numberOfSelectedLead==0){
    this.chekedLead = false;
  }else{ this.chekedLead=true;}
  
    }
   
  openModelWindow(template:TemplateRef<any>){
    this.modalRef = this.bsmodalservice.show(template);
    for(let j = 0; j<this.indicesOfSelectedLeads.length; j++){
      this.myLead[this.indicesOfSelectedLeads[j]].assignedtousers = this.selectedUserListA[0];
      this.selectedLead.push(this.myLead[this.indicesOfSelectedLeads[j]]);
    //  this.selectedLead.push(this.myLead[this.indicesOfSelectedLeads[j]]);
       }
      this.rawLeadsrv.get_projects_of_company(localStorage.getItem('user_name')).subscribe((res:Project[])=>{
         // console.log(res);
          this.projects = res;
          console.log('project list',this.projects);
          for(let i=0;i<this.projects.length;i++){
            this.projectNameList.push(this.projects[i].name);
          }
      
        this.uniqueNameList = new Set(this.projectNameList);
         console.log('unique',this.uniqueNameList);
          
      });

  }
  onItemSelectA(item: any) {
          //selected users
          console.log('selected users', this.selectedUserListA)     
          if(this.selectedUserListA.length!=0){
            this.isUserSelect = true;
        }else{this.isUserSelect = false;}               
  } // end of onItemSelect
  selectProject(){
        
    //  console.log('selected project :', this.selectedProjectName);
            for(let i =0;i<this.projects.length;i++){
                if(this.selectedProjectName === this.projects[i].name){
                  this.selectedProjectId = this.projects[i].projectid;
                  console.log('index:',this.selectedProjectId);
                  //calling user api by projectid
                  this.rawLeadsrv.gUserByProjectId(this.selectedProjectId).subscribe((res:Registration[])=>{
                      this.users = res;
                      console.log('selected project users:',this.users);
                  if(this.users!=null){
                  let len = this.users.length;
                       // this.userNameId.length = len; 
                  //     this.userNameId = new Array(len);
                        for(let i =0;i<this.users.length;i++){
                          let name = this.users[i].firstname+' '+this.users[i].lastname;
                          let id = this.users[i].userid;
                          let token = this.users[i].token;
                          this.dropdownListAU.push(name);
                          this.multiSelectDropdownSelectedIds.push(id);
                          this.multiSelectDropdownSelectedTokens.push(token);

                        }
                        this.isUsers = true;
                        return;
                          }else{
                        this.isUsers = false;
             }

                  });
                 
                 // this.dropdownListAU
                 
                 break;
                }
            }
      }//end of selected project
  assignLeads(){
    for(let i =0;i<this.selectedLead.length;i++)
    {   // updating number os selected leads
      console.log('selected user ids',this.multiSelectDropdownSelectedIds);  
      for(let j =0;j<this.selectedUserListA.length;j++)
          {  
            let index1 = this.dropdownListAU.indexOf(this.selectedUserListA[j]);
           // this.selectedLead[i].items = [];
           this.newItem = new MyItems();
                 //   if(this.selectedUserListA[j]==this.selectedLead[i].items[k].userName){
           this.newItem.assignedto = String(this.multiSelectDropdownSelectedIds[index1]);
          // this.selectedLead[i].items[j].assignedto =String(this.multiSelectDropdownSelectedIds[index1]);
           this.newItem.token= this.multiSelectDropdownSelectedTokens[index1];
          console.log('assignto',this.multiSelectDropdownSelectedIds[index1]);
          // this.selectedLead[i].items[j].token =this.multiSelectDropdownSelectedTokens[index1];
           console.log('s user name:',this.selectedUserListA[j]);
           console.log('s user id:',this.multiSelectDropdownSelectedIds[index1]);
           console.log('s user token:',this.multiSelectDropdownSelectedTokens[index1]);
          this.newItem.leadid = this.selectedLead[i].leadid;
          
           this.newItem.status = 1;
           this.newItem.statusdate = new Date();
           this.newItem.companyid = +localStorage.getItem('company_id');
           this.newItem.cmpctlabel ='remarks';
           this.newItem.isassigned = false;
           this.newItem.projname = this.selectedProjectName;
           this.newItem.queryremarks = 'query';
           this.newItem.rangefrom = 10;
           this.newItem.rangeto=11;
           this.newItem.receivedon = null;
           this.newItem.builderinterest ="1";
           this.newItem.statusid=1;
           this.newItem.username='ffgdfg';
           this.newItem.typeofproperty=1;
           //this.selectedLead[i].items[j].companyId = +sessionStorage.getItem('company_id');
          this.selectedLead[i].isassigned = '1';
          this.selectedLead[i].status = 1
          //this.selectedLead[i].
           this.selectedLead[i].items.push(this.newItem);       
            //this.spliceIndexS = j+1;
                    //console.log('selected user id',this.multiSelectDropdownSelectedIds[index1]);
                  //  break;
               //   }
           //   }
        
          }
          //apps.splice(removeIndex, 1);
          //this.spliceIndexE = this.selectedLead[i].items.length - this.spliceIndexS;
         // this.selectedLead[i].items.splice(this.spliceIndexS,this.spliceIndexE);
    }
   // console.log('updated leads',this.selectedLead);
  //  console.log('selected user id',this.multiSelectDropdownSelectedUsers);
for(let i=0;i<this.selectedLead.length;i++){
     this.loading=true;
     console.log('updated leads',this.selectedLead[i]);
     this.rawLeadsrv.updateLeads(this.selectedLead[i],this.selectedLead[i].leadid).subscribe((res: HttpResponse<Text>)=> {
 
 this.loading=false;
 alert('leads assigned successfully');
 });
  }
}
cancelAssignment(){
  this.modalRef.hide();
  //this.router.navigateByUrl('home/raw');
}// end of cancel
getDetails(myList:MyLead){
 this.leadDetails=myList;
}//end of getDetails

createExcel():void {
  this.rawLeadsrv.exportAsExcelFile(this.myLead, 'rawLead');
}//end of create excel
}
