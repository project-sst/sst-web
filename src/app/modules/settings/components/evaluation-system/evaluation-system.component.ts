// Angular Imports
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// SST-API Imports
import { ParamtricasService, Sistemaevaluacion, Configuration } from '@project-sst/sst-api';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-evaluation-system',
  templateUrl: './evaluation-system.component.html',
  styleUrls: ['./evaluation-system.component.scss']
})
export class EvaluationSystemComponent implements OnInit {

	public sistemasEvaluacion:Array<Sistemaevaluacion>;
  public sistemaEvaluacion:Sistemaevaluacion;
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
  	this.sistemasEvaluacion = new Array<Sistemaevaluacion>();
    this.sistemaEvaluacion = new Sistemaevaluacion();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getEvaluationSystem();
  }

  public getEvaluationSystem(){
    this.loading = true;
    this._parametricasServices.sistemaevaluacionGet().subscribe(
      res=>{
        this.loading = false;
        this.sistemasEvaluacion = <Array<Sistemaevaluacion>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener los sistemas de evaluación";
        console.log(error);
      }
    );
  }

  public select(systemEvaluation:Sistemaevaluacion):void{
    this.sistemaEvaluacion = Object.assign(this.sistemaEvaluacion, systemEvaluation);
    this.title = "Editar";
  }

  public cancel():void{
    this.sistemaEvaluacion = new Sistemaevaluacion();
    this.title = "Crear";
  }

  public edit(systemEvaluation:Sistemaevaluacion):void{
    this.loading = true;
    this._parametricasServices.sistemaevaluacionIdSistemaEvaluacionPut(systemEvaluation.id, systemEvaluation).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getEvaluationSystem();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar el sistema de evaluación";      
      console.log(error);
    });
    this.cancel();
  }

  public create(systemEvaluation:Sistemaevaluacion):void{
    if(Object.hasOwnProperty.call(systemEvaluation,'id') && systemEvaluation.id){
      this.edit(systemEvaluation);
    }else{
      this.loading = true;
      this._parametricasServices.sistemaevaluacionPost(systemEvaluation).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getEvaluationSystem(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear el sistema de evaluación";          
          console.log(error);
        }
      );           
    }
  }

}
