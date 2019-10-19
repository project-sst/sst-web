// Angular Imports
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// SST-API Imports
import { ParamtricasService, Partecuerpo, Configuration } from '@project-sst/sst-api';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-body-part',
  templateUrl: './body-part.component.html',
  styleUrls: ['./body-part.component.scss']
})
export class BodyPartComponent implements OnInit {

	public partesCuerpo:Array<Partecuerpo>;
  public parteCuerpo:Partecuerpo;
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
  	this.partesCuerpo = new Array<Partecuerpo>();
    this.parteCuerpo = new Partecuerpo();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getBodyParts();
  }

  public getBodyParts(){
    this.loading = true;
    this._parametricasServices.partecuerpoGet().subscribe(
      res=>{
        this.loading = false;
        this.partesCuerpo = <Array<Partecuerpo>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener las partes del cuerpo";
        console.log(error);
      }
    );
  }

  public select(bodyPart:Partecuerpo):void{
    this.parteCuerpo = Object.assign(this.parteCuerpo, bodyPart);
    this.title = "Editar";
  }

  public cancel():void{
    this.parteCuerpo = new Partecuerpo();
    this.title = "Crear";
  }

  public edit(bodyPart:Partecuerpo):void{
    this.loading = true;
    this._parametricasServices.partecuerpoIdParteCuerpoPut(bodyPart.id, bodyPart).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getBodyParts();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar la parte del cuerpo";      
      console.log(error);
    });
    this.cancel();
  }

  public create(bodyPart:Partecuerpo):void{
    if(Object.hasOwnProperty.call(bodyPart,'id') && bodyPart.id){
      this.edit(bodyPart);
    }else{
      this.loading = true;
      this._parametricasServices.partecuerpoPost(bodyPart).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getBodyParts(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear la parte del cuerpo";          
          console.log(error);
        }
      );           
    }
  }
}
