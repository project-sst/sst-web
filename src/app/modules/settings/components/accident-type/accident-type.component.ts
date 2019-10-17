// Angular Imports
import { Component, OnInit } from '@angular/core';
// SST-API Imports
import { ParamtricasService,Tipoaccidente } from '@project-sst/sst-api';

@Component({
  selector: 'app-accident-type',
  templateUrl: './accident-type.component.html',
  styleUrls: ['./accident-type.component.scss']
})
export class AccidentTypeComponent implements OnInit {

	public tiposAccidente:Array<Tipoaccidente>;
  public tipoAccidente:Tipoaccidente;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;  

  constructor(
  	private _parametricasServices:ParamtricasService
  ) { 
  	this.tiposAccidente = new Array<Tipoaccidente>();
    this.tipoAccidente = new Tipoaccidente();
    this.title = "Crear";
  }

  ngOnInit() {
  	this.getAccidentType();
  }

  public getAccidentType(){
    this.loading = true;
    this._parametricasServices.tipoaccidenteGet().subscribe(
      res=>{
        this.loading = false;
        this.tiposAccidente = <Array<Tipoaccidente>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se pudieron obtener los tipos de accidente";        
        console.log(error);
      }
    );
  }

  public select(accidentType:Tipoaccidente):void{
    this.tipoAccidente = Object.assign(this.tipoAccidente, accidentType);
    this.title = "Editar";
  }

  public cancel():void{
    this.tipoAccidente = new Tipoaccidente();
    this.title = "Crear";
  }

  public edit(accidentType:Tipoaccidente):void{
    this.loading = true;
    this._parametricasServices.tipoaccidenteIdTipoAccidentePut(accidentType.id, accidentType).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getAccidentType();       
    },error=>{
      this.loading = false;
      this.error = true;
      this.messageError = "No se pudo editar el tipo de accidente";      
      console.log(error);
    });
    this.cancel();
  }

  public create(accidentType:Tipoaccidente):void{
    if(Object.hasOwnProperty.call(accidentType,'id') && accidentType.id){
      this.edit(accidentType);
    }else{
      this.loading = true;
      this._parametricasServices.tipoaccidentePost(accidentType).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getAccidentType(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se pudo crear el tipo de accidente";          
          console.log(error);
        }
      );           
    }
  }  

}
