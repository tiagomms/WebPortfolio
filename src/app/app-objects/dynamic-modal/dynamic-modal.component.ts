import { Component, Input,
  ViewContainerRef, ViewChild,
  ReflectiveInjector, ComponentFactoryResolver }
from '@angular/core';

import { ModalImageComponent } from 'app/main-pages/portfolio/objects/modal-image/modal-image.component';
import { ModalChartComponent } from 'app/main-pages/portfolio/objects/modal-chart/modal-chart.component';
import { ModalPageTimelineComponent } from 'app/main-pages/portfolio/objects/modal-page-timeline/modal-page-timeline.component';

@Component({
  selector: 'dynamic-modal',
  // Reference to the components must be here in order to dynamically create them
  entryComponents: [
    ModalChartComponent,
    ModalPageTimelineComponent,
    ModalImageComponent
  ],
  template: ` <div #dynamicModal></div> `,
})

export class DynamicModalComponent {

  currentComponent = null;

  @ViewChild('dynamicModal', { read: ViewContainerRef }) dynamicModal: ViewContainerRef;

  // component: Class for the component you want to create
  // inputs: An object with key/value pairs mapped to input name/input value
  @Input() set componentData(data: {component: any, inputs: any }) {
    if (!data) {
      return;
    }

    // Inputs need to be in the following format to be resolved properly
    let inputProviders = Object.keys(data.inputs).map((inputName) => 
      { return { provide: inputName, useValue: data.inputs[inputName] }; }
    );
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    // We create an injector out of the data we want to pass down 
    // and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(
      resolvedInputs, this.dynamicModal.parentInjector);

    // We create a factory out of the component we want to create
    let factory = this.resolver.resolveComponentFactory(data.component);

    // We create the component using the factory and the injector
    let component = factory.create(injector);

    // We insert the component into the dom container
    this.dynamicModal.insert(component.hostView);

    // We can destroy the old component is we like by calling destroy
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }

  constructor(private resolver: ComponentFactoryResolver) { }

}
