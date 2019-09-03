import { Component, OnInit } from '@angular/core';

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
  public idx:number = 3;

  constructor(
    private _parametricasServices:ParamtricasService
  ) { 
  	this.tiposEvento = new Array<Tipoevento>();
    this.tipoEvento = {
      idTipoEvento: null,
      descripcionTipoEvento: ""
    };
    this.title = "Crear";
  }

  ngOnInit() {
    this.getTipoEvento();
  }

  public getTipoEvento(){
    this._parametricasServices.tipoeventoGet().subscribe(
      res=>{
        this.tiposEvento = <Array<Tipoevento>>res;
      },error=>{
        console.log(error);
      }
    );
  }

  public selectEventType(eventType:Tipoevento):void{
    this.tipoEvento = Object.assign(this.tipoEvento, eventType);
    this.title = "Editar";
  }

  public cancel():void{
    this.tipoEvento = {
      idTipoEvento: null,
      descripcionTipoEvento: ""
    };;
    this.title = "Crear";
  }

  public edit(eventType:Tipoevento):void{
    //Invocar servicio editar
    let index = this.tiposEvento.findIndex(tipoEvento => tipoEvento.idTipoEvento === eventType.idTipoEvento);
    this.tiposEvento[index] = eventType;
    this.cancel();
  }

  public create(eventType:Tipoevento):void{
    if(Object.hasOwnProperty.call(eventType,'id')){
      this.edit(eventType);
    }else{
      //Invocar servicio crear
      this._parametricasServices.tipoeventoPost(eventType).subscribe(
        res=>{
          this.cancel();
          this.getTipoEvento(); 
        },error=>{
          console.log(error);
        }
      );           
    }
  }

}
