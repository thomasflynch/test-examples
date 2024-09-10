import { ChangeColorDirective } from './change-color.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { SimpleChange } from '@angular/core';

describe('ChangeColorDirective', () => {
  let directive: ChangeColorDirective;
  let mockElementRef: ElementRef;
  let mockRenderer: Renderer2;

  beforeEach(() => {
    mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    mockRenderer = {
      setStyle: jest.fn()
    } as unknown as Renderer2;

    directive = new ChangeColorDirective(mockElementRef, mockRenderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set original color from element style on first change', () => {
    mockElementRef.nativeElement.style.color = 'rgb(255, 0, 0)'; // red

    directive.xStatus = 'active';
    directive.screenSupported = 'desktop';
    directive.ngOnChanges({
      xStatus: new SimpleChange(null, 'active', true)
    });

    expect(directive.originalColor).toBe('rgb(255, 0, 0)');
    expect(mockRenderer.setStyle).toHaveBeenCalledWith(mockElementRef.nativeElement, 'color', 'rgb(255, 0, 0)');
  });

  it('should not change color when readonly is true', () => {
    directive.xStatus = 'active';
    directive.screenSupported = 'desktop';
    directive.readonly = 'true';
    directive.ngOnChanges({
      xStatus: new SimpleChange(null, 'active', true),
      readonly: new SimpleChange(null, 'true', true)
    });

    expect(mockRenderer.setStyle).not.toHaveBeenCalled();
  });

  it('should change color for supported screen and status', () => {
    directive.xStatus = 'active';
    directive.screenSupported = 'desktop';
    directive.ngOnChanges({
      xStatus: new SimpleChange(null, 'active', true),
      screenSupported: new SimpleChange(null, 'desktop', true)
    });

    expect(directive.isImpactedAttribueAndSupportedScreen()).toBeTruthy();
    expect(mockRenderer.setStyle).toHaveBeenCalled();
  });

  it('should not change color for unsupported screen or status', () => {
    directive.xStatus = 'unknown';
    directive.screenSupported = 'unsupported';
    directive.ngOnChanges({
      xStatus: new SimpleChange(null, 'unknown', true),
      screenSupported: new SimpleChange(null, 'unsupported', true)
    });

    expect(directive.isImpactedAttribueAndSupportedScreen()).toBeFalsy();
    expect(mockRenderer.setStyle).not.toHaveBeenCalled();
  });

  it('should correctly compute the color for an element with a specific class name', () => {
    document.body.innerHTML = `<div class="mat-select-value" style="color: rgb(0, 128, 0);"></div>`; // Green

    const computedColor = directive.getComputedStyleByClassName('mat-select-value');
    expect(computedColor).toBe('rgb(0, 128, 0)');
  });
});