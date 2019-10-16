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
  public loading:boolean = false;  

  constructor(
  	private _parametricasServices:ParamtricasService
  ) { 
  	this.ciudades = new Array<Ciudad>();
  	this.ciudad = new Ciudad();
  	this.title = "Crear";
  }

  ngOnInit() {
  	this.getCiudades();
  }

  public getCiudades(){
    this.loading =true;
  	this._parametricasServices.ciudadGet().subscribe(
  		res=>{
        this.loading =false;
  			this.ciudades = <Array<Ciudad>>res;
  		},error=>{
        this.loading =false;
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
      id: null,
      nombreCiudad: ""
    };;
    this.title = "Crear";
  }

  public edit(ciudad:Ciudad):void{
    this.loading =true;
    this._parametricasServices.ciudadIdCiudadPut(ciudad.id, ciudad).subscribe(
      res=>{
        this.loading =false;
        this.cancel();
        this.getCiudades();       
    },error=>{
      this.loading =false;
      console.log(error);
    });
    this.cancel();

  }

  public create(ciudad:Ciudad):void{
    if(Object.hasOwnProperty.call(ciudad,'id')){
      this.edit(ciudad);
    }else{
      this.loading =true;
      this._parametricasServices.ciudadPost(ciudad).subscribe(
        res=>{
          this.loading =false;
          this.cancel();
          this.getCiudades(); 
        },error=>{
          console.log(error);
        }
      );           
    }
  }  

}
