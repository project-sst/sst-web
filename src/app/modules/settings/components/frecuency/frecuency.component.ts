// Angular Imports
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// SST-API Imports
import { ParamtricasService, Frecuencia, Configuration } from '@project-sst/sst-api';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-frecuency',
  templateUrl: './frecuency.component.html',
  styleUrls: ['./frecuency.component.scss']
})
export class FrecuencyComponent implements OnInit {

	public frecuencias:Array<Frecuencia>;
  public frecuencia:Frecuencia;
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
  	this.frecuencias = new Array<Frecuencia>();
    this.frecuencia = new Frecuencia();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getFrecuency();
  }

  public getFrecuency(){
    this.loading = true;
    this._parametricasServices.frecuenciaGet().subscribe(
      res=>{
        this.loading = false;
        this.frecuencias = <Array<Frecuencia>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener las frecuencias";
        console.log(error);
      }
    );
  }

  public select(frecuency:Frecuencia):void{
    this.frecuencia = Object.assign(this.frecuencia, frecuency);
    this.title = "Editar";
  }

  public cancel():void{
    this.frecuencia = new Frecuencia();
    this.title = "Crear";
  }

  public edit(frecuency:Frecuencia):void{
    this.loading = true;
    this._parametricasServices.frecuenciaIdFrecuenciaPut(frecuency.id, frecuency).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getFrecuency();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar la frecuencia";      
      console.log(error);
    });
    this.cancel();
  }

  public create(frecuency:Frecuencia):void{
    if(Object.hasOwnProperty.call(frecuency,'id') && frecuency.id){
      this.edit(frecuency);
    }else{
      this.loading = true;
      this._parametricasServices.frecuenciaPost(frecuency).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getFrecuency(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear la frecuencia";          
          console.log(error);
        }
      );           
    }
  }

}
