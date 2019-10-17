// Angular Imports
import { Component, OnInit } from '@angular/core';
// SST-API Imports
import { ParamtricasService, Fuenteinformacion } from '@project-sst/sst-api';

@Component({
  selector: 'app-source-information',
  templateUrl: './source-information.component.html',
  styleUrls: ['./source-information.component.scss']
})
export class SourceInformationComponent implements OnInit {

	public fuentesInformacion:Array<Fuenteinformacion>;
  public fuenteInformacion:Fuenteinformacion;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;

  constructor(
  	private _parametricasServices:ParamtricasService
  ) { 
  	this.fuentesInformacion = new Array<Fuenteinformacion>();
    this.fuenteInformacion = new Fuenteinformacion();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getSourcesInformation();
  }

  public getSourcesInformation(){
    this.loading = true;
    this._parametricasServices.fuenteinformacionGet().subscribe(
      res=>{
        this.loading = false;
        this.fuentesInformacion = <Array<Fuenteinformacion>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener las fuentes de información";
        console.log(error);
      }
    );
  }

  public select(sourceInformation:Fuenteinformacion):void{
    this.fuenteInformacion = Object.assign(this.fuenteInformacion, sourceInformation);
    this.title = "Editar";
  }

  public cancel():void{
    this.fuenteInformacion = new Fuenteinformacion();
    this.title = "Crear";
  }

  public edit(sourceInformation:Fuenteinformacion):void{
    this.loading = true;
    this._parametricasServices.fuenteinformacionIdFuenteInformacionPut(sourceInformation.id, sourceInformation).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getSourcesInformation();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar la fuente de información";      
      console.log(error);
    });
    this.cancel();
  }

  public create(sourceInformation:Fuenteinformacion):void{
    if(Object.hasOwnProperty.call(sourceInformation,'id') && sourceInformation.id){
      this.edit(sourceInformation);
    }else{
      this.loading = true;
      this._parametricasServices.sistemaevaluacionPost(sourceInformation).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getSourcesInformation(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear la fuente de información";          
          console.log(error);
        }
      );           
    }
  }

}
