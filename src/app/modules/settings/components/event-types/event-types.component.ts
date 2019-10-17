// Angular Imports
import { Component, OnInit } from '@angular/core';
// SST-API Imports
import { ParamtricasService,Tipoevento } from '@project-sst/sst-api';

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.scss']
})
export class EventTypesComponent implements OnInit {

	public tiposEvento:Array<Tipoevento>;
  public tipoEvento:Tipoevento;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;  

  constructor(
    private _parametricasServices:ParamtricasService
  ) { 
  	this.tiposEvento = new Array<Tipoevento>();
    this.tipoEvento = new Tipoevento();
    this.title = "Crear";
  }

  ngOnInit() {
    this.getTipoEvento();
  }

  public getTipoEvento(){
    this.loading = true;
    this._parametricasServices.tipoeventoGet().subscribe(
      res=>{
        this.loading = false;
        this.tiposEvento = <Array<Tipoevento>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se pudieron obtener los tipo de envento";        
        console.log(error);
      }
    );
  }

  public selectEventType(eventType:Tipoevento):void{
    this.tipoEvento = Object.assign(this.tipoEvento, eventType);
    this.title = "Editar";
  }

  public cancel():void{
    this.tipoEvento = new Tipoevento();
    this.title = "Crear";
  }

  public edit(eventType:Tipoevento):void{
    this.loading = true;
    this._parametricasServices.tipoeventoIdTipoEventoPut(eventType.id, eventType).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getTipoEvento();       
    },error=>{
      this.loading = false;
      this.error = true;
      this.messageError = "No se pudo editar el tipo de evento";      
      console.log(error);
    });
    this.cancel();
  }

  public create(eventType:Tipoevento):void{
    if(Object.hasOwnProperty.call(eventType,'id') && eventType.id){
      this.edit(eventType);
    }else{
      this.loading = true;
      this._parametricasServices.tipoeventoPost(eventType).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getTipoEvento(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se pudo crear el tipo de evento";          
          console.log(error);
        }
      );           
    }
  }

}
