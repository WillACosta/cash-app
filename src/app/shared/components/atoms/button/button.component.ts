import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  label: string;

  @Input()
  disabled: boolean = false;

  @Output()
  onClickedEvent: EventEmitter<any> = new EventEmitter<any>();

  onClickHandler() {
    this.onClickedEvent.emit();
  }
}
