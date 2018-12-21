import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ResourceURI } from '../apilist/resource-uri';
import { Observable } from 'rxjs';
import { Company } from '../modal/company';
import { Registration } from '../modal/Registration';
import { UserRegister } from '../modal/user-register';
import { Project } from '../modal/project';
import { stringify } from 'querystring';
import { MyLead } from '../modal/MyLead';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { AskQuotation } from '../modal/ask-quotation';
import { Agent } from '../modal/agent';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const httpOptionsLogin = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};


const httpOptions2 = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data',
                              'boundary': ','    })
};
@Injectable({
  providedIn: 'root'
})
export class VictorServiceService {

  constructor(private http: HttpClient) { }
  public login(user_name,password, grant_type):Observable<any> {
   // let   grant_type = 'apassword';
    console.log('Login API called');
    return this.http.post(ResourceURI.pLogin,
      "username="+user_name+"&password="+password+
      "&grant_type="+grant_type,httpOptionsLogin);
} // end of login

getAllCompanies(){
  const httpOptionsAuthG = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+sessionStorage.getItem('vc_token')})
   };
   //this.vcheaders.append('Authorization', sessionStorage.getItem('vctoken'));
   return this.http.get(ResourceURI.gCompanies, httpOptionsAuthG);
 }
 get_user_of_company(user_name){
  return this.http.get(ResourceURI.gUser+user_name, httpOptions);
}
public get_projects_of_company(user_name){
  return this.http.get(ResourceURI.gCmpProjects+user_name, httpOptions);
}   
public get_leads_count_company(user_name){
  return this.http.get(ResourceURI.gLeadsCount+user_name, httpOptions);
}
public get_uers_roles_company(){
  return this.http.get(ResourceURI.gUserRole, httpOptions);
}
public p_user_company(cmp: Company):Observable<any>{
  return this.http.post(ResourceURI.pCompany,cmp, httpOptions);
} 
public p_create_user(user: UserRegister):Observable<any>{
  return this.http.post(ResourceURI.pAddUser,user, httpOptions);
} 
// uploads excel file
public p_upload_file(formdata: FormData,username):Observable<any> {
  return this.http.post(ResourceURI.pUploadExcelLeads+username, formdata);
}
public p_create_project(project:Project):Observable<any> {
  return this.http.post(ResourceURI.pCreateProject,project,httpOptions);
}

public g_document_prjid(projectId):Observable<any> {
  return this.http.get(ResourceURI.gDocument+projectId,httpOptions);
}
public p_upload_prjid(formdata:FormData):Observable<any> {
  return this.http.post(ResourceURI.pUpload,formdata);
}
public g_leads(company_id):Observable<any> {
  return this.http.get(ResourceURI.gLeads+company_id,httpOptions);
}
public g_rawLeads_with_paging(user_name,pno):Observable<any> {
  //aarif&pagesize=10&pagenumber=1
  let addUrl = user_name+'&pageSize=10&pageNumber='+String(pno);
  return this.http.get(ResourceURI.gRawLeadswithpaging+addUrl,httpOptions);
}
public updateLeads(lead:MyLead ,lead_id):Observable<any> {
  return this.http.put(ResourceURI.upadteLeads+lead_id,lead,httpOptions);
}
public gUserByProjectId(project_id):Observable<any> {
  return this.http.get(ResourceURI.gUsersOfProject+project_id,httpOptions);
}
public getLocation(userName):Observable<any>{
  return this.http.get(ResourceURI.getLocation+userName,httpOptions);
}
public update_user_id(user: Registration):Observable<any>{
  return this.http.put(ResourceURI.upadteUser,user,httpOptions);
}
public update_company_id(company:Company):Observable<any>{
  return this.http.put(ResourceURI.updateCompany+company.companyid,company,httpOptions);
}
public getOtherLeads(userName,statusid):Observable<any>{
  return this.http.get(ResourceURI.otherLeads+userName+'&statusID='+statusid,httpOptions);
}
public getOtherLeadsbyCompanyId(companyid,statusid):Observable<any>{
  return this.http.get(ResourceURI.gLeadsWithStatusIdAndCompanyId+companyid+'&statusID='+statusid,httpOptions);
}

// public getDownload(projectid,userid){
//    return this.http.get(ResourceURI.gdownload,projectid,userid,httpOptions)
// }

public exportAsExcelFile(json: any[], excelFileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
}
public getReport(projectid,userid){
  return this.http.get(ResourceURI.gdownloadReport+projectid+'/'+userid,httpOptions);
}


public getQuotationOrderList(agentid){
  return this.http.get(ResourceURI.gQuotationOrder+agentid,httpOptions);
}
public getOrderList(username){
  return this.http.get(ResourceURI.gOrderList+username,httpOptions);
}

public pAskQuotation(quotation:AskQuotation):Observable<any> {
  return this.http.post(ResourceURI.pAskQuotation,quotation,httpOptions);
}

public getAgentList(companyid){
  return this.http.get(ResourceURI.gAgents+companyid,httpOptions);
}

public pCreateAgent(agent: Agent):Observable<any> {
  return this.http.post(ResourceURI.pAskQuotation,agent,httpOptions);
}

}
