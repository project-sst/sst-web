// Angular Imports
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// SST-API Imports
import { ParamtricasService, Tipoempresa, Configuration } from '@project-sst/sst-api';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-company-types',
  templateUrl: './company-types.component.html',
  styleUrls: ['./company-types.component.scss']
})
export class CompanyTypesComponent implements OnInit {

	public tiposEmpresa:Array<Tipoempresa>;
  public tipoEmpresa:Tipoempresa;
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
  	this.tiposEmpresa = new Array<Tipoempresa>();
    this.tipoEmpresa = new Tipoempresa();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getCompanyTypes();
  }

  public getCompanyTypes(){
    this.loading = true;
    this._parametricasServices.tipoempresaGet().subscribe(
      res=>{
        this.loading = false;
        this.tiposEmpresa = <Array<Tipoempresa>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener los tipo de empresa";
        console.log(error);
      }
    );
  }

  public select(companyType:Tipoempresa):void{
    this.tipoEmpresa = Object.assign(this.tipoEmpresa, companyType);
    this.title = "Editar";
  }

  public cancel():void{
    this.tipoEmpresa = new Tipoempresa();
    this.title = "Crear";
  }

  public edit(companyType:Tipoempresa):void{
    this.loading = true;
    this._parametricasServices.tipoempresaIdTipoEmpresaPut(companyType.id, companyType).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getCompanyTypes();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar el tipo de empresa";      
      console.log(error);
    });
    this.cancel();
  }

  public create(companyType:Tipoempresa):void{
    if(Object.hasOwnProperty.call(companyType,'id') && companyType.id){
      this.edit(companyType);
    }else{
      this.loading = true;
      this._parametricasServices.tipoempresaPost(companyType).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getCompanyTypes(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear el tipo de empresa";          
          console.log(error);
        }
      );           
    }
  }

}
