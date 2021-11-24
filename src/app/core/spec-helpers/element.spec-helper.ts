import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  componentSelector: string
): DebugElement {
  return fixture.debugElement.query(By.css(componentSelector));
}

export function findElementByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) {
    throw new Error(`queryByCss: Element with ${selector} not found`);
  }
  return debugElement;
}
