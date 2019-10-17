// Angular Imports
import { Component, OnInit } from '@angular/core';
// SST-API Imports
import { ParamtricasService, Diagnosticoincapacidad } from '@project-sst/sst-api';

@Component({
  selector: 'app-disability-diagnosis',
  templateUrl: './disability-diagnosis.component.html',
  styleUrls: ['./disability-diagnosis.component.scss']
})
export class DisabilityDiagnosisComponent implements OnInit {

	public diagnosticosIncapacidad:Array<Diagnosticoincapacidad>;
  public diagnosticoIncapacidad:Diagnosticoincapacidad;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;

  constructor(
  	private _parametricasServices:ParamtricasService
  ) { 
  	this.diagnosticosIncapacidad = new Array<Diagnosticoincapacidad>();
    this.diagnosticoIncapacidad = new Diagnosticoincapacidad();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getDisabilityDiagnosis();
  }

  public getDisabilityDiagnosis(){
    this.loading = true;
    this._parametricasServices.diagnosticoincapacidadGet().subscribe(
      res=>{
        this.loading = false;
        this.diagnosticosIncapacidad = <Array<Diagnosticoincapacidad>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener los diagnosticos de incapacidad";
        console.log(error);
      }
    );
  }

  public select(disabilityDiagnosis:Diagnosticoincapacidad):void{
    this.diagnosticoIncapacidad = Object.assign(this.diagnosticoIncapacidad, disabilityDiagnosis);
    this.title = "Editar";
  }

  public cancel():void{
    this.diagnosticoIncapacidad = new Diagnosticoincapacidad();
    this.title = "Crear";
  }

  public edit(disabilityDiagnosis:Diagnosticoincapacidad):void{
    this.loading = true;
    this._parametricasServices.diagnosticoincapacidadIddiagnosticoIncapacidadPut(disabilityDiagnosis.id, disabilityDiagnosis).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getDisabilityDiagnosis();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar el diagnostico de incapacidad";      
      console.log(error);
    });
    this.cancel();
  }

  public create(disabilityDiagnosis:Diagnosticoincapacidad):void{
    if(Object.hasOwnProperty.call(disabilityDiagnosis,'id') && disabilityDiagnosis.id){
      this.edit(disabilityDiagnosis);
    }else{
      this.loading = true;
      this._parametricasServices.diagnosticoincapacidadPost(disabilityDiagnosis).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getDisabilityDiagnosis(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear el diagnostico de incapacidad";          
          console.log(error);
        }
      );           
    }
  }

}
