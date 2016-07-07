import 'webcomponents.js';
import {patch} from 'incremental-dom';
import {IRenderMethod, IComponent, IComponentConfig, IComponentDef, IComponentController} from '../interface/component';
import {renderEngine} from './../service/render-engine';
import {load} from './../helper/loader';

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
    needRefresh: boolean = false;

    attachedCallback(): void {
        renderEngine.attach(this);
    }

    detachedCallback(): void {
        renderEngine.detach(this);
    }
}

function process(config: IComponentDef): Promise<IComponentDef> {
    let {render, templateUrl} = config;

    return new Promise<IComponentDef>((resolve, reject) => {
        if (!render) {
            if (templateUrl) {
                return load<IRenderMethod>(templateUrl)
                    .then(file => {
                        config.render = file[Object.keys(file)[0]];
                        delete config.templateUrl;
                        resolve(config);
                    })
                    .catch((...args: any[]) => reject(args));
            }
            else throw new Error('render not found');
        } else {
            resolve(config);
        }
    });
}

export function register(config: IComponentDef) {
    let parent = config.reactive ? ReactiveComponent.prototype : ProactiveComponent.prototype;
    let prototype: ReactiveComponent = Object.create(parent);

    process(config).then(options => {
        prototype.$$config = options;
        document.registerElement(config.tag, { prototype });
    });
}


