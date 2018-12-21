import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VictorServiceService } from 'src/app/apiService/victor-service.service';
import { Projdocument } from 'src/app/modal/projdocument';
import {throwError} from 'rxjs';
import { stringify } from '@angular/core/src/render3/util';
@Component({
  selector: 'app-createdocument',
  templateUrl: './createdocument.component.html',
  styleUrls: ['./createdocument.component.css']
})
export class CreatedocumentComponent implements OnInit {

  myFiles:string [] = [];
  myFile:string [] = [];
  btnDisabled = true;
  project_id = localStorage.getItem('project_id');
  loading;
  newDocument: Projdocument;
  constructor(private router:Router, private createdocumentsrv:VictorServiceService) {
    this.newDocument = new Projdocument();
    console.log('form data projectid',this.project_id);
   }

  ngOnInit() {
  }

  getFileDetails (e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
      //this.newDocument.File = e.target.files[i];
    }
    this.btnDisabled = false;

  }

  uploadFiles(){
   
    const frmData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) { 
      let documentName = "Project Document"
      frmData.append("link", this.myFiles[i]);
      frmData.append("name", documentName);
      frmData.append("projectid",this.project_id);
    }
  //this.srv.uploadsDocument(frmData,sessionStorage.getItem('prjID')).subscribe(res=>{
    
   //this.loading=true;
    this.createdocumentsrv.p_upload_prjid(frmData).subscribe(res=>{
      console.log('Document Added',res);
      this.loading=false;
      alert('file uploaded successfully');
      // this.router.navigateByUrl('home/document');
    },error =>{
      this.loading=false;
      console.error('error in post api of create document');
      alert('document could not be added, Try again');
      // this.router.navigateByUrl('home/manageCompanies');
      return throwError(error);
    });
  }

  validateText(){
    console.log('Document Name');
  }
  cancel(){
    this.router.navigateByUrl('home/document');
  }

}
