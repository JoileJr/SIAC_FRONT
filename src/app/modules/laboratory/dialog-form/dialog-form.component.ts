import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent implements OnInit {
    @Input() visible: boolean = false;
    @Output() closeDialog = new EventEmitter<void>();

    laboratorioForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
      this.laboratorioForm = this.fb.group({
        nome: ['', Validators.required],
        cnpj: ['', Validators.required],
        telefone: ['', Validators.required],
        razaoSocial: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        cep: ['', Validators.required],
        estado: ['', Validators.required],
        cidade: ['', Validators.required],
        bairro: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: ['']
      });
    }

    onSubmit(): void {
      if (this.laboratorioForm.valid) {
        console.log('Formulário enviado com sucesso!', this.laboratorioForm.value);
      } else {
        console.log('Formulário inválido!');
      }
    }

}
