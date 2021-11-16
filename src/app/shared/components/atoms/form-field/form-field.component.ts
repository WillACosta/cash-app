import { Component, Input, OnInit } from '@angular/core';

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

  hideText: Boolean = true;

  ngOnInit(): void {}

  togleInputVisibility() {
    this.hideText = !this.hideText;
  }
}
