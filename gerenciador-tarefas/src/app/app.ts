import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '@openng/optimus-ui/button';
import { CardModule } from '@openng/optimus-ui/card';
import { SelectModule } from '@openng/optimus-ui/select';
import { InputGroupModule } from '@openng/optimus-ui/inputgroup';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { FormsModule } from '@angular/forms';
import { Tag } from '@openng/optimus-ui/tag';


import { Tarefa, ItemTarefa } from './components/item-tarefa';


@Component({
  imports: [
    RouterOutlet,Button, CardModule, SelectModule, 
    Tag, FormsModule, ItemTarefa, InputGroupModule, 
    InputTextModule
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  template: `
  <main class="min-h-screen p-4 md:p-8 bg-slate-50">
    <div class="max-w-6xl mx-auto space-y-6">
      
      <!-- Cabeçalho em um p-card do PrimeNG -->
      <p-card>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          <div>
            <p-tag value="Organização Pessoal" severity="info" [rounded]="true" />
            <h1 class="text-3xl font-bold mt-2 text-slate-900">Minhas Tarefas</h1>
            <p class="text-slate-600 text-sm mt-1">
              Planeje suas metas, organize prioridades e acompanhe o progresso.
            </p>
          </div>

          <!-- Métrica de estatísticas em cards/badges do PrimeNG -->
          <div class="flex gap-3">
            <div class="p-3 border border-slate-200 rounded-lg text-center bg-slate-50 min-w-[100px]">
              <span class="block text-xs uppercase font-semibold text-slate-500">Total</span>
              <span class="text-2xl font-bold text-primary">{{ tarefa().length }}</span>
            </div>

            <div class="p-3 border border-slate-200 rounded-lg text-center bg-slate-50 min-w-[100px]">
              <span class="block text-xs uppercase font-semibold text-slate-500">Concluídas</span>
              <span class="text-2xl font-bold text-emerald-600">{{ concluidas() }}</span>
            </div>
          </div>

        </div>
      </p-card>

      <!-- Cadastro de Tarefa e exibição de tarefas -->

    <div class="flex flex-col md:flex-row items-start gap-6">

      <div class="w-full md:w-[40%] shrink-0">
        
        <p-card header="Nova Tarefa">
          <div class="flex flex-col gap-5 justify-between">
            <p-inputgroup>
              <input pInputText [(ngModel)]="novaTarefa.titulo" placeholder="Título da tarefa" required />
            </p-inputgroup>
              
            <p-inputgroup>
              <input pInputText [(ngModel)]="novaTarefa.descricao" placeholder="Descrição da tarefa" required />
            </p-inputgroup>

            <p-inputgroup>
              <p-select [(ngModel)]="novaTarefa.prioridade" [options]="opcoesPrioridade" placeholder="Prioridade" ></p-select>
            </p-inputgroup>

            <p-inputgroup>
              <input pInputText type="date" [(ngModel)]="novaTarefa.prazo" placeholder="Prazo" required />
            </p-inputgroup>

            <div class=" flex gap-3 justify-between">
              <p-button 
              type="button"
              (click)="salvarTarefa()"
              label="Adicionar Tarefa" 
              icon="pi pi-plus" 
              />

              <p-button 
              type="button"
              (click)="cancelar()"
              label="Cancelar" severity="danger"
              />
            </div>

          </div>
        </p-card>

      </div>

              <!-- Coluna para exibir tarefas existentes -->


       <div class="flex flex-col gap-4">
          @for (tarefa of tarefa(); track tarefa.id) {
            
            <app-item-tarefa 
              [tarefa]="tarefa"
              [tarefa]="tarefa"
              (Concluido)="alternarStatus($event)"
              (Excluir)="Excluir($event)"
              (Editar)="Editar($event)"
              />

          
          }
        </div>
      </div>

    </div>
  </main>

  
  `,
})

export class App {
  readonly tarefa = signal<Tarefa[]>([
    {
      id: 1,
      titulo: 'Atividade de interface',
      descricao: 'Fazer um trabalho bonitão',
      prioridade: 1,
      prazo: new Date(),
      concluida: false
    }
  ]);

  opcoesPrioridade = [
    { label: 'Baixa', value: 1},
    { label: 'Média', value: 2},
    { label: 'Alta', value: 3}
  ];

  editandoId: number | null = null;

  novaTarefa: Tarefa = this.getTarefaVazia();

  private getTarefaVazia(): Tarefa {
    return {
      id: 0,
      titulo: '',
      descricao: '',
      prioridade: 1,
      prazo: new Date(),
      concluida: false
    };
  }

  readonly concluidas = computed(() =>
    this.tarefa().filter(t => t.concluida).length
  );

  
  salvarTarefa() {
    if (!this.novaTarefa.titulo.trim()) return;

    if (this.editandoId !== null) {
      const idEdicao = this.editandoId
      this.tarefa.update(lista =>
        lista.map(t => t.id === this.editandoId ? { ...this.novaTarefa, id: this.editandoId } : t)
      );
    } else {
      // Modo Criação
      const item: Tarefa = {
        ...this.novaTarefa,
        id: Date.now()
      };
      this.tarefa.update(lista => [...lista, item]);
    }

    this.cancelar(); // Reseta o formulário e o estado de edição
  }

  cancelar(){
    this.editandoId = null;
    this.novaTarefa = {
    id: 0,
    titulo: '',
    descricao: '',
    prioridade: 1,
    prazo: new Date(),
    concluida: false

    }

  }
    alternarStatus(id: number) {
    this.tarefa.update(lista =>
      lista.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t)
    );
  }
    Excluir(id: number) {
    this.tarefa.update(lista => lista.filter(t => t.id !== id));
  }
    Editar(id: number) {
    const itemEncontrado = this.tarefa().find(t => t.id === id);
    if (itemEncontrado) {
      this.editandoId = id;
      this.novaTarefa = { ...itemEncontrado };
    }
  }

}
