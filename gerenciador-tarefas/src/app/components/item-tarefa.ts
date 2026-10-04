import { Component, Input, output } from "@angular/core";
import { SelectModule } from '@openng/optimus-ui/select';
import { InputGroupModule } from '@openng/optimus-ui/inputgroup';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CardModule } from '@openng/optimus-ui/card';
import { DatePipe} from '@angular/common';
import { Tag } from "@openng/optimus-ui/tag";

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
    imports: [  InputGroupModule, InputTextModule, SelectModule, ButtonModule, CardModule, DatePipe, Tag ],
    template: `
    
<article class=" bg-white rounded-2xl border-gray-200/80 border-[0.2px] p-8 pl-10  shadow-md">
    <div class="flex flex-wrap items-center justify-between gap-4">

      <div class="flex items-center gap-3 justify-between">
        <h2 class="text-[#001957] text-xl font-bold">
            {{ tarefa.titulo }}
        </h2>

        @if(tarefa.prioridade === 1) {
            <p-tag value="Baixa" severity="success" [rounded]="true" icon="pi pi-arrow-down" />
        } @else if(tarefa.prioridade === 2) {
            <p-tag value="Média" severity="info" [rounded]="true" icon="pi pi-minus-circle" />
        } @else if(tarefa.prioridade === 3) {
            <p-tag value="Alta" severity="danger" [rounded]="true" icon="pi pi-exclamation-triangle" />
        }
          
      </div>
      
      <p>Prazo: {{ tarefa.prazo | date }}</p>
      @if (tarefa.concluida) {
      <span class="bg-[#5ACD56] text-[#046B00] text-[0.65rem] font-bold max-w-xl rounded-2xl px-7 py-1">
          Concluída
      </span>
      } @else {
      <span class="bg-[#E0E0E0] text-[#777777] text-[0.65rem] font-bold rounded-2xl px-2 py-1">
          Em Andamento
      </span>
      }
    </div>

    <div class="flex items-center gap-2 mt-6">
        <p-button type="button" icon="pi pi-check" label="Concluído"
         class="p-button-rounded p-button-success p-button-text" 
         (click)="Concluido.emit(tarefa.id)" [disabled]="tarefa.concluida"/>

         <p-button type="button" icon="pi pi-pencil" label="Editar" severity="warn"
        class="p-button-rounded p-button-warning p-button-text" 
        (click)="Editar.emit(tarefa.id)"/>

        <p-button type="button" icon="pi pi-trash" label="Excluir" severity="danger"
        class="p-button-rounded p-button-danger p-button-text" 
        (click)="Excluir.emit(tarefa.id)"/>
    </div>

</article>

    `
})

export class ItemTarefa {
  @Input() tarefa!: Tarefa;
  Concluido = output<number>();  // Envia o ID para marcar como concluída
  Excluir = output<number>(); // Envia o ID para excluir
  Editar = output<number>();    // Envia o ID para editar

  
}