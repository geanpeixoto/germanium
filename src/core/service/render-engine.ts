import {IComponent} from './../interface/component';
import {IRenderEngine} from './../interface/render-engine';

export class RenderEngine implements IRenderEngine {
    private interval: number;
    private fps: number = 60;
    private components: Set<IComponent> = new Set<IComponent>();

    start(): this {
        if (!this.interval) {
            this.interval = window.setInterval(() => this.run(), 1000 / this.fps);
        }
        return this;
    }

    stop(): this {
        window.clearInterval(this.interval);
        this.interval = null;
        return this;
    }

    attach(component: IComponent): this {
        this.components.add(component);
        return this;
    }

    detach(component: IComponent): this {
        this.components.delete(component);
        return this;
    }

    run() {
        this.components.forEach(refreshComponent)
    }
}

function refreshComponent(component: IComponent) {
    component.refresh();
}

export var renderEngine: RenderEngine = new RenderEngine().start();
