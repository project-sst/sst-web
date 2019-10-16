// Angular Imports
import { Component, OnInit } from '@angular/core';
// SST-API Imports
import { ParamtricasService, Preguntasencuesta } from '@project-sst/sst-api';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})
export class SurveyQuestionsComponent implements OnInit {

	public preguntasEncuesta:Array<Preguntasencuesta>;
  public preguntaEncuesta:Preguntasencuesta;
  public title:string;
  public messageError:string;
  public error:boolean = false;
  public loading:boolean = false;	

  constructor(
		private _parametricasServices:ParamtricasService
  ) { 
  	this.preguntasEncuesta = new Array<Preguntasencuesta>();
    this.preguntaEncuesta = new Preguntasencuesta();
    this.title = "Crear";
    this.messageError = "";
  }

  ngOnInit() {
    this.getSurveyQuestions();
  }

  public getSurveyQuestions(){
    this.loading = true;
    this._parametricasServices.preguntasencuestaGet().subscribe(
      res=>{
        this.loading = false;
        this.preguntasEncuesta = <Array<Preguntasencuesta>>res;
      },error=>{
        this.loading = false;
        this.error = true;
        this.messageError = "No se pudieron obtener las preguntas";
        console.log(error);
      }
    );
  }

  public select(surveyQuestion:Preguntasencuesta):void{
    this.preguntaEncuesta = Object.assign(this.preguntaEncuesta, surveyQuestion);
    this.title = "Editar";
  }

  public cancel():void{
    this.preguntaEncuesta = new Preguntasencuesta();
    this.title = "Crear";
  }

  public edit(surveyQuestion:Preguntasencuesta):void{
    this.loading = true;
    this._parametricasServices.preguntasencuestaIdPreguntaPut(surveyQuestion.id, surveyQuestion).subscribe(
      res=>{
        this.loading = false;
        this.cancel();
        this.getSurveyQuestions();       
    },error=>{
      this.loading = false;
      this.error = true;
      this.messageError = "No se pudo editar la pregunta";
      console.log(error);
    });
    this.cancel();
  }

  public create(surveyQuestion:Preguntasencuesta):void{
    if(Object.hasOwnProperty.call(surveyQuestion,'id') && surveyQuestion.id){
      this.edit(surveyQuestion);
    }else{
      this.loading = true;
      this._parametricasServices.preguntasencuestaPost(surveyQuestion).subscribe(
        res=>{
          this.loading = false;
          this.cancel();
          this.getSurveyQuestions(); 
        },error=>{
          this.loading = false;
          this.error = true;
          this.messageError = "No se pudo crear la pregunta";
          console.log(error);
        }
      );           
    }
  }

}
