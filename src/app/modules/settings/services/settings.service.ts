import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public getEventTypes(){
  	return [
  		{
  			id:1,
  			descripcionTipoEvento: 'Evento 1'
  		},
      {
        id:2,
        descripcionTipoEvento: 'Evento 2'
      }      
  	];
  }
}
