import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Form } from './form.interface';
import { signal, computed } from '@angular/core';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() buttonText = '';
  @Output() registerClick = new EventEmitter<Form>();
  data!: Form;

  private fb = new FormBuilder();
  form = signal(
    this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
    })
  );
  email = computed(() => this.form().get('email'));
  name = computed(() => this.form().get('name'));

  constructor() {}

  onSubmit() {
    if (this.form().valid) {
      const { email, name } = this.form().value;
      this.data = {
        email: email || '',
        name: name || '',
      };
      this.registerClick.emit(this.data);
      console.log('emit data', this.data);

      this.form().reset();
    } else {
      this.form().markAllAsTouched();
    }
  }
}
