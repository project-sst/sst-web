import { Component, OnInit } from '@angular/core';

import { Tipoevento } from './../../../../models/tipoevento';
import { SettingsService } from './../../services/settings.service';

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
    private _settingsServices:SettingsService
  ) { 
  	this.tiposEvento = new Array<Tipoevento>();
    this.tipoEvento = new Tipoevento();
    this.title = "Crear";
  }

  ngOnInit() {
    this.tiposEvento = this._settingsServices.getEventTypes();
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
      eventType.idTipoEvento = this.idx;      
      this.tiposEvento.push(eventType);
      this.idx++;
      this.cancel();      
    }
  }

}
