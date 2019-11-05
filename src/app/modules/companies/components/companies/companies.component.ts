import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EmpresasService, ParamtricasService, Empresa, Tipoempresa, Ciudad, Configuration } from '@project-sst/sst-api';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

	public empresas:Array<Empresa>;
	public empresa:Empresa;
	public tiposEmpresa:Array<Tipoempresa>;
	public ciudades:Array<Ciudad>;	
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string; 
  public configuration = new Configuration(); 	

  constructor(
  	private _empresasService:EmpresasService,
  	private _parametricasService: ParamtricasService,
  	private _http:HttpClient
  ) { 
  	this._parametricasService = new ParamtricasService(this._http,environment.API_BASE_PATH,this.configuration);
  	this._empresasService = new EmpresasService(this._http,environment.API_BASE_PATH,this.configuration);
  	this.empresas = new Array<Empresa>();
  	this.empresa = new Empresa();
  	this.tiposEmpresa = new Array<Tipoempresa>();
  	this.ciudades = new Array<Ciudad>(); 
  	this.title = "Crear"; 	
  }

  ngOnInit() {
  	this.getCities();
  }

  public getCities(){
  	this.loading = true;
  	this._parametricasService.ciudadGet().subscribe(
  		res=>{
        this.loading = false;
        this.ciudades = <Array<Ciudad>>res;
        this.getCompaniesType();
  		},error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se pudieron obtener las ciudades";    
  		}
  	);
  }

  public getCompaniesType(){
  	this.loading = true;
  	this._parametricasService.tipoempresaGet().subscribe(
  		res=>{
  			this.loading = false;
  			this.tiposEmpresa = <Array<Tipoempresa>>res;
  			this.getCompanies();
  		},error=>{
  			this.loading = false;
        this.error = true;
        this.messageError = "No se pudieron obtener los tipos de empresa";    			
  		}
  	);
  }

  public getCompanies(){
    this.loading = true;
    this._empresasService.empresaGet().subscribe(
      res=>{
        this.loading = false;
        this.empresas = <Array<Empresa>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se pudieron obtener las empresas";        
        console.log(error);
      }
    );
  }

  public select(company:Empresa):void{
    this.empresa = Object.assign(this.empresa, company);
    this.title = "Editar";
  }

  public cancel():void{
    this.empresa = new Empresa();
    this.title = "Crear";
  }

  public edit(company:Empresa):void{
    this.loading = true;
    this._empresasService.empresaIdEmpresaPut(company.id, company).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getCompanies();       
    },error=>{
      this.loading = false;
      this.error = true;
      this.messageError = "No se pudo editar la empresa";      
      console.log(error);
    });
    this.cancel();
  }

  public create(company:Empresa):void{
    if(Object.hasOwnProperty.call(company,'id') && company.id){
      this.edit(company);
    }else{
      this.loading = true;
      this._empresasService.empresaPost(company).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getCompanies(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se pudo crear la empresa";          
          console.log(error);
        }
      );           
    }
  }   

}
