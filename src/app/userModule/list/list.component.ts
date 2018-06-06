import { Component , OnInit} from "@angular/core";
import { Router } from "@angular/router"
import { Ajax } from "../../common/ajax";
import 'rxjs/add/operator/toPromise';

@Component({
    selector: "uesr-list",
    templateUrl: "./list.component.html",
    styleUrls:["./list.component.css"]
})

export class listComponent implements OnInit{
    constructor( private ajax : Ajax, private router : Router){

    }
    ngOnInit(){
        this.get();
    }
    //获取菜单
    private tableData:any[]=[];
    private tableUrl="/mer/user/list";
    private tableParams={
        useId:"",
        passwd:"",
        cell:""
    };

    get(){
        this.ajax.post(this.tableUrl,this.tableParams).toPromise().then((res:any)=>{
            res.records.forEach(val => {
                var obj={};
                obj["id"]=(val.id || "");                
                obj["useNoMark"]=(val.useNoMark || "");
                obj["useId"]=(val.useId || "");
                obj["passwd"]=(val.passwd || "");
                obj["cell"]=(val.cell || "");
                obj["idType"]=(val.idType? (val.idType==1? "身份证":"护照") : "");
                obj["sex"]=(val.sex? (val.sex==1? "男": "女") : "");
                this.tableData.push(obj);
            });
		});
    }
    handle(ref: any): void {
        console.log(ref.index)
    }
    upbtns(ref: any): void {
        console.log(ref.row);
        // this.car = true
    }
    // 搜索
    onSubmit(value) {

            this.tableParams={
                cell : value.cell,		
                passwd : value.passwd,	 	
                useId : value.useId                	
            };
            this.ajax.post(this.tableUrl,this.tableParams).toPromise().then((res:any)=>{
                console.log(res.msg)
                this.tableData=res.records;
                console.log(this,this.tableData);
                let min = document.getElementById("minMsgspan");
                min.style.display="block";
                min.innerHTML='搜索'+res.msg;
                setTimeout(function () {
                    min.style.display="none";
                }, 2000);
            })  
    }
    
}
