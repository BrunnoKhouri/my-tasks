import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lista } from 'src/models/lista.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public modo: String = 'list';
  public listas: Lista[] = [];  
  public titulo: string = "Minhas tarefas"  
  public form: FormGroup;

  constructor(private fb: FormBuilder) {   
     this.form = this.fb.group({
       tituloTarefa: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.minLength(3),
         Validators.required,
      ])]
     });    
     this.carregamento()
  }
  
  escolhaModo(modo: String) {
    this.modo = modo;
  }

  salvar() {
    const data = JSON.stringify(this.listas);
    localStorage.setItem('listas', data);
  }

  carregamento() {
    const data = localStorage.getItem('listas');
    if(data){
      this.listas = JSON.parse(data);
    } else {
      this.listas = [];
    }
  }

  adicionar() {
    const tituloTarefa = this.form.controls['tituloTarefa'].value;
    const id = this.listas.length + 1;
    this.listas.push(new Lista(id, tituloTarefa, false));
    this.salvar();
    this.limpar();
    this.escolhaModo('list')
  }

  limpar() {
    this.form.reset();
 }

  remover(item: Lista) {
    const index = this.listas.indexOf(item);
    if (index !== -1) {
      this.listas.splice(index, 1);
    }
    this.salvar();
  }

  marcarComoFinalizou(item: Lista){
    item.finalizou = true;
    this.salvar();
  }

  marcarComoNaoFinalizou(item: Lista) {
    item.finalizou = false;
    this.salvar();
  }  
}
