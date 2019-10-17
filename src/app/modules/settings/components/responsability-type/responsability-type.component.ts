// Angular Imports
import { Component, OnInit } from '@angular/core';
// SST-API Imports
import { ParamtricasService, Tiporesponsabilidad } from '@project-sst/sst-api';

@Component({
  selector: 'app-responsability-type',
  templateUrl: './responsability-type.component.html',
  styleUrls: ['./responsability-type.component.scss']
})
export class ResponsabilityTypeComponent implements OnInit {

	public tiposResponsabilidad:Array<Tiporesponsabilidad>;
  public tipoResponsabilidad:Tiporesponsabilidad;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;

  constructor(
  	private _parametricasServices:ParamtricasService
  ) { 
  	this.tiposResponsabilidad = new Array<Tiporesponsabilidad>();
    this.tipoResponsabilidad = new Tiporesponsabilidad();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getResponsabilityTypes();
  }

  public getResponsabilityTypes(){
    this.loading = true;
    this._parametricasServices.tiporesponsabilidadGet().subscribe(
      res=>{
        this.loading = false;
        this.tiposResponsabilidad = <Array<Tiporesponsabilidad>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener los tipos de responsabilidad";
        console.log(error);
      }
    );
  }

  public select(responsabilityType:Tiporesponsabilidad):void{
    this.tipoResponsabilidad = Object.assign(this.tipoResponsabilidad, responsabilityType);
    this.title = "Editar";
  }

  public cancel():void{
    this.tipoResponsabilidad = new Tiporesponsabilidad();
    this.title = "Crear";
  }

  public edit(responsabilityType:Tiporesponsabilidad):void{
    this.loading = true;
    this._parametricasServices.tiporesponsabilidadIdTipoResponsabilidadPut(responsabilityType.id, responsabilityType).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getResponsabilityTypes();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar el tipo de responsabilidad";      
      console.log(error);
    });
    this.cancel();
  }

  public create(responsabilityType:Tiporesponsabilidad):void{
    if(Object.hasOwnProperty.call(responsabilityType,'id') && responsabilityType.id){
      this.edit(responsabilityType);
    }else{
      this.loading = true;
      this._parametricasServices.tiporesponsabilidadPost(responsabilityType).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getResponsabilityTypes(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear el tipo de responsabilidad";          
          console.log(error);
        }
      );           
    }
  }

}
