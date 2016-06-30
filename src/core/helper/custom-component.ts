import 'webcomponents.js';
import {patch} from 'incremental-dom';
import {IRenderMethod, IComponent, IComponentConfig, IComponentDef, IComponentController} from '../interface/component';
import {renderEngine} from './../service/render-engine';

class Component extends HTMLElement implements IComponent {
    $$config: IComponentDef;
    $$controller: IComponentController;
    
    createdCallback() {
        (<any>this).createShadowRoot();
        let controller = this.$$controller = new this.$$config.controller(<any>this);
        this.refresh();
    }

    refresh() {
        patch((<any>this).shadowRoot, () => this.$$config.render(this.$$controller));
    }
}

class ProactiveComponent extends Component {
    attachedCallback() {
        renderEngine.attach(this);
    }

    detachedCallback() {
        renderEngine.detach(this);
    }
}

export function register(config: IComponentDef) {
    let prototype: Component = Object.create(ProactiveComponent.prototype);
    prototype.$$config = config;
    document.registerElement(config.tag, { prototype });
}
