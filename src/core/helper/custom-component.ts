import 'webcomponents.js';
import {patch} from 'incremental-dom';
import {IRenderMethod, IComponent, IComponentConfig, IComponentDef, IComponentController} from '../interface/component';
import {renderEngine} from './../service/render-engine';

class ReactiveComponent extends HTMLElement implements IComponent {
    $$config: IComponentDef;
    $$controller: IComponentController;
    shadowRoot: HTMLElement;
    
    createdCallback() {
        (<any>this).createShadowRoot();
        let controller = this.$$controller = new this.$$config.controller(<any>this);
        this.refresh();
    }

    refresh() {
        patch(this.shadowRoot, () => this.$$config.render(this.$$controller));
    }
}

class ProactiveComponent extends ReactiveComponent {
    attachedCallback() {
        renderEngine.attach(this);
    }

    detachedCallback() {
        renderEngine.detach(this);
    }
}

export function register(config: IComponentDef) {
    let parent = config.reactive ? ReactiveComponent.prototype : ProactiveComponent.prototype;
    let prototype: ReactiveComponent = Object.create(parent);

    prototype.$$config = config;
    document.registerElement(config.tag, { prototype });
}
