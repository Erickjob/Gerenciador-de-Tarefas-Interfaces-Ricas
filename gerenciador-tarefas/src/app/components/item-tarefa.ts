import { Component } from "@angular/core";
import { InputGroup } from '@openng/optimus-ui/inputgroup';



export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: number;
  prazo: Date;
  concluida: boolean;
}


@Component({
    selector: "app-item-tarefa",
    imports: [],
    template: `
    <div>

    </div>
    `
})

export class ItemTarefaComponent {
  
}