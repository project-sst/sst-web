// Angular Imports
import { Component, OnInit } from '@angular/core';
// SST-API Imports
import { ParamtricasService, Tipolesion } from '@project-sst/sst-api';

@Component({
  selector: 'app-injury-type',
  templateUrl: './injury-type.component.html',
  styleUrls: ['./injury-type.component.scss']
})
export class InjuryTypeComponent implements OnInit {

	public tiposLesion:Array<Tipolesion>;
  public tipoLesion:Tipolesion;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;

  constructor(
  	private _parametricasServices:ParamtricasService
  ) { 
  	this.tiposLesion = new Array<Tipolesion>();
    this.tipoLesion = new Tipolesion();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getInjuryTypes();
  }

  public getInjuryTypes(){
    this.loading = true;
    this._parametricasServices.tipolesionGet().subscribe(
      res=>{
        this.loading = false;
        this.tiposLesion = <Array<Tipolesion>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener los tipos de lesión";
        console.log(error);
      }
    );
  }

  public select(injuryType:Tipolesion):void{
    this.tipoLesion = Object.assign(this.tipoLesion, injuryType);
    this.title = "Editar";
  }

  public cancel():void{
    this.tipoLesion = new Tipolesion();
    this.title = "Crear";
  }

  public edit(injuryType:Tipolesion):void{
    this.loading = true;
    this._parametricasServices.tipolesionIdTipoLesionPut(injuryType.id, injuryType).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getInjuryTypes();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar el tipo de lesión";      
      console.log(error);
    });
    this.cancel();
  }

  public create(injuryType:Tipolesion):void{
    if(Object.hasOwnProperty.call(injuryType,'id') && injuryType.id){
      this.edit(injuryType);
    }else{
      this.loading = true;
      this._parametricasServices.tipolesionPost(injuryType).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getInjuryTypes(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear el tipo de lesión";          
          console.log(error);
        }
      );           
    }
  }

}
