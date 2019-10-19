// Angular Imports
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// SST-API Imports
import { ParamtricasService, Idoneidadinstructor, Configuration } from '@project-sst/sst-api';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-instructor-suitability',
  templateUrl: './instructor-suitability.component.html',
  styleUrls: ['./instructor-suitability.component.scss']
})
export class InstructorSuitabilityComponent implements OnInit {

	public idoneidadesInstructor:Array<Idoneidadinstructor>;
  public idoneidadInstructor:Idoneidadinstructor;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;
  public configuration = new Configuration(); 

  constructor(
    private _parametricasServices:ParamtricasService,
    private _http:HttpClient
  ) { 
    this._parametricasServices = new ParamtricasService(this._http,environment.API_BASE_PATH,this.configuration);
  	this.idoneidadesInstructor = new Array<Idoneidadinstructor>();
    this.idoneidadInstructor = new Idoneidadinstructor();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getInstructorSuitabilitys();
  }

  public getInstructorSuitabilitys(){
    this.loading = true;
    this._parametricasServices.idoneidadInstructorGet().subscribe(
      res=>{
        this.loading = false;
        this.idoneidadesInstructor = <Array<Idoneidadinstructor>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener las idoneidades de instructor";
        console.log(error);
      }
    );
  }

  public select(instructorSuitability:Idoneidadinstructor):void{
    this.idoneidadInstructor = Object.assign(this.idoneidadInstructor, instructorSuitability);
    this.title = "Editar";
  }

  public cancel():void{
    this.idoneidadInstructor = new Idoneidadinstructor();
    this.title = "Crear";
  }

  public edit(instructorSuitability:Idoneidadinstructor):void{
    this.loading = true;
    this._parametricasServices.idoneidadInstructorIdIdoneidadInstructorPut(instructorSuitability.id, instructorSuitability).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getInstructorSuitabilitys();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar la idoneidad del instructor";      
      console.log(error);
    });
    this.cancel();
  }

  public create(instructorSuitability:Idoneidadinstructor):void{
    if(Object.hasOwnProperty.call(instructorSuitability,'id') && instructorSuitability.id){
      this.edit(instructorSuitability);
    }else{
      this.loading = true;
      this._parametricasServices.idoneidadInstructorPost(instructorSuitability).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getInstructorSuitabilitys(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear la idoneidad del instructor";          
          console.log(error);
        }
      );           
    }
  }
}
