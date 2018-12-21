import { MyItems } from "./myItems";

export class MyLead {
    leadid: number;
    createuserid: number;
    createdatetimeoffset: Date;
    edituserid: string;
    editdatetimeoffset: Date;
    name: string;
    email: string;
    phonenumber: string;
    items: MyItems[];
    companyid: number;
    isassigned: string;
    cmpctlabel: string;
    assignedusers: string[];
    assignedtousers: string;
    leadsource: string;
    status: number;
    assignees: string;
    usernamelist: string[];
    selecteduserlist: string[];
    totalcount:number;
    pagesize:number;
    pagenumber:number;

  }