import { Component, OnInit, EventEmitter,Output,OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit,OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao:string = 'Traduza a frase:'
  public resposta:string = ''
  public rodada:number = 0
  public rodadaFrase: Frase
  public progresso: number = 0
  public tentativas: number = 3
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() { 
  	this.atualizaRodada()
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    console.log("componente painel foi destruido")
  }
  public atualizaResposta(r: Event): void {
  	this.resposta = (<HTMLInputElement>r.target).value;
  }
  public atualizaRodada():void {  
    //atualiza o objeto rodadaFrase
    this.rodadaFrase = this.frases[this.rodada];
  }
  public verificarResposta(): void {
  	if(this.rodadaFrase.frasePtBr == this.resposta) {

      this.progresso = this.progresso + (100 / this.frases.length)

	  	this.rodada++;

      if(this.rodada == 4)
        this.encerrarJogo.emit('vitoria')

      this.atualizaRodada()

      //limpar resposta
      this.resposta = ''
  	}
  	else{
      //decrementar as tentativas
      this.tentativas--
      if(this.tentativas == -1)
        this.encerrarJogo.emit('derrota')
    }
  }
}
