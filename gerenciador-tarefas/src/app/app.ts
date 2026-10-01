import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


export interface Tarefa{
  id: number;
  titulo: string;
  descricao: string;
  prioridade: number;
  date_limite: Date;
  concluida: boolean;

}

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('gerenciador-tarefas');
}
