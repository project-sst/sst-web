import { Component, OnInit } from '@angular/core';

import { ParamtricasService, Ciudad } from '@project-sst/sst-api';

@Component({
  selector: 'app-citys',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

	public ciudades:Array<Ciudad>;
	public ciudad:Ciudad;
	public title:string;

  constructor(
  	private _parametricasServices:ParamtricasService
  ) { 
  	this.ciudades = new Array<Ciudad>();
  	this.ciudad = {
  		idCiudad: null,
  		nombreCiudad: ''
  	};
  	this.title = "Crear";
  }

  ngOnInit() {
  	this.getCiudades();
  }

  public getCiudades(){
  	this._parametricasServices.ciudadGet().subscribe(
  		res=>{
  			this.ciudades = <Array<Ciudad>>res;
  		},error=>{
  			console.log(error);
  		}
  	);
  }

  public selectCiudad(ciudad:Ciudad):void{
    this.ciudad = Object.assign(this.ciudad, ciudad);
    this.title = "Editar";
  }

  public cancel():void{
    this.ciudad = {
      idCiudad: null,
      nombreCiudad: ""
    };;
    this.title = "Crear";
  }

  public edit(ciudad:Ciudad):void{
    //Invocar servicio editar
    this.cancel();

  }

  public create(ciudad:Ciudad):void{
    if(Object.hasOwnProperty.call(ciudad,'id')){
      this.edit(ciudad);
    }else{
      //Invocar servicio crear
      this._parametricasServices.ciudadPost(ciudad).subscribe(
        res=>{
          this.cancel();
          this.getCiudades(); 
        },error=>{
          console.log(error);
        }
      );           
    }
  }  

}
