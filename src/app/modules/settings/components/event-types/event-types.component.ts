import { Component, OnInit } from '@angular/core';

import { EventType } from './../../models/event-type.model';

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.css']
})
export class EventTypesComponent implements OnInit {

	public tiposEvento:Array<EventType>;

  constructor() { 
  	this.tiposEvento = [
  		{
  			id:1,
  			descripcionTipoEvento: 'Evento 1'
  		}
  	];
  }

  ngOnInit() {
  }

}
