import { Component, OnInit } from '@angular/core';

import { EventType } from './../../models/event-type.model';
import { SettingsService } from './../../services/settings.service';

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.css']
})
export class EventTypesComponent implements OnInit {

	public tiposEvento:Array<EventType>;
  public tipoEvento:EventType;
  public title:string;
  public idx:number = 3;

  constructor(
    private _settingsServices:SettingsService
  ) { 
  	this.tiposEvento = new Array<EventType>();
    this.tipoEvento = new EventType();
    this.title = "Crear";
  }

  ngOnInit() {
    this.tiposEvento = this._settingsServices.getEventTypes();
  }

  public selectEventType(eventType:EventType):void{
    this.tipoEvento = Object.assign(this.tipoEvento, eventType);
    this.title = "Editar";
  }

  public cancel():void{
    this.tipoEvento = new EventType();
    this.title = "Crear";
  }

  public edit(eventType:EventType):void{
    //Invocar servicio editar
    let index = this.tiposEvento.findIndex(tipoEvento => tipoEvento.id === eventType.id);
    this.tiposEvento[index] = eventType;
    this.cancel();
  }

  public create(eventType:EventType):void{
    if(Object.hasOwnProperty.call(eventType,'id')){
      this.edit(eventType);
    }else{
      //Invocar servicio crear
      eventType.id = this.idx;      
      this.tiposEvento.push(eventType);
      this.idx++;
      this.cancel();      
    }
  }

}
