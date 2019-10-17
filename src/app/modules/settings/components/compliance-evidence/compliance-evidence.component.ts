// Angular Imports
import { Component, OnInit } from '@angular/core';
// SST-API Imports
import { ParamtricasService, Evidenciacumplimiento } from '@project-sst/sst-api';

@Component({
  selector: 'app-compliance-evidence',
  templateUrl: './compliance-evidence.component.html',
  styleUrls: ['./compliance-evidence.component.scss']
})
export class ComplianceEvidenceComponent implements OnInit {

	public evidenciasCumplimiento:Array<Evidenciacumplimiento>;
  public evidenciaCumplimiento:Evidenciacumplimiento;
  public title:string;
  public loading:boolean = false;
  public error:boolean = false;
  public messageError:string;

  constructor(
  	private _parametricasServices:ParamtricasService
  ) { 
  	this.evidenciasCumplimiento = new Array<Evidenciacumplimiento>();
    this.evidenciaCumplimiento = new Evidenciacumplimiento();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
  	this.getComplianceEvidences();
  }

  public getComplianceEvidences(){
    this.loading = true;
    this._parametricasServices.evidenciacumplimientoGet().subscribe(
      res=>{
        this.loading = false;
        this.evidenciasCumplimiento = <Array<Evidenciacumplimiento>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se han podido obtener las evidencias de cumplimiento";
        console.log(error);
      }
    );
  }

  public select(complianceEvidence:Evidenciacumplimiento):void{
    this.evidenciaCumplimiento = Object.assign(this.evidenciaCumplimiento, complianceEvidence);
    this.title = "Editar";
  }

  public cancel():void{
    this.evidenciaCumplimiento = new Evidenciacumplimiento();
    this.title = "Crear";
  }

  public edit(complianceEvidence:Evidenciacumplimiento):void{
    this.loading = true;
    this._parametricasServices.evidenciacumplimientoIdEvidenciaCumplimientoPut(complianceEvidence.id, complianceEvidence).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getComplianceEvidences();       
    },error=>{
      this.loading = false;
        this.error = true;
        this.messageError = "No se ha podido editar la evidencia de cumplimiento";      
      console.log(error);
    });
    this.cancel();
  }

  public create(complianceEvidence:Evidenciacumplimiento):void{
    if(Object.hasOwnProperty.call(complianceEvidence,'id') && complianceEvidence.id){
      this.edit(complianceEvidence);
    }else{
      this.loading = true;
      this._parametricasServices.evidenciacumplimientoPost(complianceEvidence).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getComplianceEvidences(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se ha podido crear la evidencia de cumplimiento";          
          console.log(error);
        }
      );           
    }
  }

}
