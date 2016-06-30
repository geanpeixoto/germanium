import {IComponentConfig, IComponentDef, IComponentController} from '../interface/component';
import {register as registerComponent} from '../helper/custom-component';

export function Component(config: IComponentConfig) {
  return function(controller: Function) {
    let def:IComponentDef = <IComponentDef> config;
    def.controller = <IComponentController> controller;
    registerComponent(def);
  }
}
