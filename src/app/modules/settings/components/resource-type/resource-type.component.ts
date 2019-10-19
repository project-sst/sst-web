// Angular Imports
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// SST-API Imports
import { ParamtricasService, Tiporecurso, Configuration } from '@project-sst/sst-api';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.scss']
})
export class ResourceTypeComponent implements OnInit {

	public tiposRecurso:Array<Tiporecurso>;
  public tipoRecurso:Tiporecurso;
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
  	this.tiposRecurso = new Array<Tiporecurso>();
    this.tipoRecurso = new Tiporecurso();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getResourceTypes();
  }

  public getResourceTypes(){
    this.loading = true;
    this._parametricasServices.tiporecursoGet().subscribe(
      res=>{
        this.loading = false;
        this.tiposRecurso = <Array<Tiporecurso>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener los tipos de recursos";
        console.log(error);
      }
    );
  }

  public select(resourceType:Tiporecurso):void{
    this.tipoRecurso = Object.assign(this.tipoRecurso, resourceType);
    this.title = "Editar";
  }

  public cancel():void{
    this.tipoRecurso = new Tiporecurso();
    this.title = "Crear";
  }

  public edit(resourceType:Tiporecurso):void{
    this.loading = true;
    this._parametricasServices.tiporecursoIdTipoRecursoPut(resourceType.id, resourceType).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getResourceTypes();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar el tipo de recurso";      
      console.log(error);
    });
    this.cancel();
  }

  public create(resourceType:Tiporecurso):void{
    if(Object.hasOwnProperty.call(resourceType,'id') && resourceType.id){
      this.edit(resourceType);
    }else{
      this.loading = true;
      this._parametricasServices.tiporecursoPost(resourceType).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getResourceTypes(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear el tipo de recurso";          
          console.log(error);
        }
      );           
    }
  }

}
