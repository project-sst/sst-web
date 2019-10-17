// Angular Imports
import { Component, OnInit } from '@angular/core';
// SST-API Imports
import { ParamtricasService,Tipoactividad } from '@project-sst/sst-api';

@Component({
  selector: 'app-activity-type',
  templateUrl: './activity-type.component.html',
  styleUrls: ['./activity-type.component.scss']
})
export class ActivityTypeComponent implements OnInit {

	public tiposActividad:Array<Tipoactividad>;
  public tipoActividad:Tipoactividad;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;  	

  constructor(
  	private _parametricasServices:ParamtricasService
  ) { 
  	this.tiposActividad = new Array<Tipoactividad>();
    this.tipoActividad = new Tipoactividad();
    this.title = "Crear";
  }

  ngOnInit() {
  	this.getActivityTypes();
  }

  public getActivityTypes(){
    this.loading = true;
    this._parametricasServices.tipoactividadGet().subscribe(
      res=>{
        this.loading = false;
        this.tiposActividad = <Array<Tipoactividad>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se pudieron obtener los tipos de actividad";        
        console.log(error);
      }
    );
  }

  public select(activityType:Tipoactividad):void{
    this.tipoActividad = Object.assign(this.tipoActividad, activityType);
    this.title = "Editar";
  }

  public cancel():void{
    this.tipoActividad = new Tipoactividad();
    this.title = "Crear";
  }

  public edit(activityType:Tipoactividad):void{
    this.loading = true;
    this._parametricasServices.tipoactividadIdTipoActividadPut(activityType.id, activityType).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getActivityTypes();       
    },error=>{
      this.loading = false;
      this.error = true;
      this.messageError = "No se pudo editar el tipo de actividad";      
      console.log(error);
    });
    this.cancel();
  }

  public create(activityType:Tipoactividad):void{
    if(Object.hasOwnProperty.call(activityType,'id') && activityType.id){
      this.edit(activityType);
    }else{
      this.loading = true;
      this._parametricasServices.tipoactividadPost(activityType).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getActivityTypes(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se pudo crear el tipo de actividad";          
          console.log(error);
        }
      );           
    }
  }

}
