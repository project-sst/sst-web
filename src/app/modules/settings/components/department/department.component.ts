// Angular Imports
import { Component, OnInit } from '@angular/core';
// SST-API Imports
import { ParamtricasService, Departamento } from '@project-sst/sst-api';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

	public departamentos:Array<Departamento>;
  public departamento:Departamento;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;

  constructor(
  	private _parametricasServices:ParamtricasService
  ) { 
  	this.departamentos = new Array<Departamento>();
    this.departamento = new Departamento();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getDepartments();
  }

  public getDepartments(){
    this.loading = true;
    this._parametricasServices.departamentoGet().subscribe(
      res=>{
        this.loading = false;
        this.departamentos = <Array<Departamento>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener los departamentos";
        console.log(error);
      }
    );
  }

  public select(department:Departamento):void{
    this.departamento = Object.assign(this.departamento, department);
    this.title = "Editar";
  }

  public cancel():void{
    this.departamento = new Departamento();
    this.title = "Crear";
  }

  public edit(department:Departamento):void{
    this.loading = true;
    this._parametricasServices.departamentoIdDepartamentoPut(department.id, department).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getDepartments();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar el departamento";      
      console.log(error);
    });
    this.cancel();
  }

  public create(department:Departamento):void{
    if(Object.hasOwnProperty.call(department,'id') && department.id){
      this.edit(department);
    }else{
      this.loading = true;
      this._parametricasServices.sistemaevaluacionPost(department).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getDepartments(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear el departamento";          
          console.log(error);
        }
      );           
    }
  }

}
