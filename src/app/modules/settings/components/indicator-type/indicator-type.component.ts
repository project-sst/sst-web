// Angular Imports
import { Component, OnInit } from '@angular/core';
// SST-API Imports
import { ParamtricasService, Tipoindicador } from '@project-sst/sst-api';

@Component({
  selector: 'app-indicator-type',
  templateUrl: './indicator-type.component.html',
  styleUrls: ['./indicator-type.component.scss']
})
export class IndicatorTypeComponent implements OnInit {

	public tiposIndicador:Array<Tipoindicador>;
  public tipoIndicador:Tipoindicador;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;

  constructor(
  	private _parametricasServices:ParamtricasService
  ) { 
  	this.tiposIndicador = new Array<Tipoindicador>();
    this.tipoIndicador = new Tipoindicador();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getIndicatorTypes();
  }

  public getIndicatorTypes(){
    this.loading = true;
    this._parametricasServices.tipoindicadorGet().subscribe(
      res=>{
        this.loading = false;
        this.tiposIndicador = <Array<Tipoindicador>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener los tipos de indicador";
        console.log(error);
      }
    );
  }

  public select(indicatorType:Tipoindicador):void{
    this.tipoIndicador = Object.assign(this.tipoIndicador, indicatorType);
    this.title = "Editar";
  }

  public cancel():void{
    this.tipoIndicador = new Tipoindicador();
    this.title = "Crear";
  }

  public edit(indicatorType:Tipoindicador):void{
    this.loading = true;
    this._parametricasServices.tipoindicadorIdTipoIndicadorPut(indicatorType.id, indicatorType).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getIndicatorTypes();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar el tipo de indicador";      
      console.log(error);
    });
    this.cancel();
  }

  public create(indicatorType:Tipoindicador):void{
    if(Object.hasOwnProperty.call(indicatorType,'id') && indicatorType.id){
      this.edit(indicatorType);
    }else{
      this.loading = true;
      this._parametricasServices.tipoindicadorPost(indicatorType).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getIndicatorTypes(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear el tipo de indicador";          
          console.log(error);
        }
      );           
    }
  }

}
