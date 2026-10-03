import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '@openng/optimus-ui/button';
import { CardModule } from '@openng/optimus-ui/card';
import { SelectModule } from '@openng/optimus-ui/select';
import { Tag } from '@openng/optimus-ui/tag';
import { Tarefa, ItemTarefaComponent } from './components/item-tarefa';    


@Component({
  imports: [RouterOutlet, Button, CardModule, SelectModule, Tag],
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
              <span class="text-2xl font-bold text-emerald-600">{{ tarefa().filter(t => t.concluida).length }}</span>
            </div>
          </div>

        </div>
      </p-card>

      <!-- Layout Grid Principal -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Formulário (1 Coluna) -->
        <div class="lg:col-span-1">
          <p-card header="Nova Tarefa">
            <!-- Seu formulário PrimeNG vai aqui -->
          </p-card>
        </div>

        <!-- Lista de Cards (2 Colunas) -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Seus cards de tarefa vão aqui -->
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
}


