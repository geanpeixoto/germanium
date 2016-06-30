import {IComponent} from './component';

export interface IRenderEngine {
    start(): this;
    stop(): this;
    attach(component: IComponent): this;
    detach(component: IComponent): this;
}
