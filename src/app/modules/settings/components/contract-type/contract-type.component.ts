// Angular Imports
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// SST-API Imports
import { ParamtricasService, Tipocontrato, Configuration } from '@project-sst/sst-api';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-contract-type',
  templateUrl: './contract-type.component.html',
  styleUrls: ['./contract-type.component.scss']
})
export class ContractTypeComponent implements OnInit {

	public tiposContrato:Array<Tipocontrato>;
  public tipoContrato:Tipocontrato;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;
  public configuration = new Configuration(); 

  constructor(
    private _parametricasServices:ParamtricasService,
    private _http:HttpClient
  ) { 
    this._parametricasServices = new ParamtricasService(this._http,environment.API_BASE_PATH,this.configuration);
  	this.tiposContrato = new Array<Tipocontrato>();
    this.tipoContrato = new Tipocontrato();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getContractTypes();
  }

  public getContractTypes(){
    this.loading = true;
    this._parametricasServices.tipocontratoGet().subscribe(
      res=>{
        this.loading = false;
        this.tiposContrato = <Array<Tipocontrato>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener los tipo de contrato";
        console.log(error);
      }
    );
  }

  public select(contractType:Tipocontrato):void{
    this.tipoContrato = Object.assign(this.tipoContrato, contractType);
    this.title = "Editar";
  }

  public cancel():void{
    this.tipoContrato = new Tipocontrato();
    this.title = "Crear";
  }

  public edit(contractType:Tipocontrato):void{
    this.loading = true;
    this._parametricasServices.tipocontratoIdTipoContratoPut(contractType.id, contractType).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getContractTypes();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar el tipo de contrato";      
      console.log(error);
    });
    this.cancel();
  }

  public create(contractType:Tipocontrato):void{
    if(Object.hasOwnProperty.call(contractType,'id') && contractType.id){
      this.edit(contractType);
    }else{
      this.loading = true;
      this._parametricasServices.tipocontratoPost(contractType).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getContractTypes(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear el tipo de contrato";          
          console.log(error);
        }
      );           
    }
  }

}
