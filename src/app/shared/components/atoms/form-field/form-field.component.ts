import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
  constructor() {}

  @Input() label?: String;
  @Input() placeholder?: String;
  @Input() prefixIcon?: String;
  @Input() obscureText?: Boolean;
  @Input() modelName?: String;

  hideText: Boolean = true;
  inputFormControl: FormControl = new FormControl();

  ngOnInit(): void {}

  togleInputVisibility() {
    this.hideText = !this.hideText;
  }
}
