import { Component, signal, input, output, eventeEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';


export interface Tarefa{
  id: number;
  titulo: string;
  descricao: string;
  prioridade: number;
  data_limite: Date;
  concluida: boolean;

}

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class gerenciador {
  readonly prioridade = signal<[Tarefas[]]>([
    {
      id: 1,
      titulo: 'Atividade de interface',
      desricao: 'Fazer um trabalho bonitão',
      prioridade: 1,
      data_limita: new Date(),
      concluida: false
     }
  ])

  
}
