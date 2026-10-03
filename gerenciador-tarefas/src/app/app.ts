import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '@openng/optimus-ui/button';


@Component({
  imports: [RouterOutlet, Button],
  selector: 'app-root',
  styleUrl: './app.css',
  template: `
  <h1> Hello Erick Job</h1>

  <p-button label="Check" />
  `,
})
export class App {
  protected readonly title = signal('gerenciador-tarefas');
}


