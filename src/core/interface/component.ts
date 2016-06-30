export interface IRenderMethod {
    (data?: IComponentController): void;
}

export interface IComponentController {
    new (element: Element);
}

export interface IComponentConfig {
    tag: string;
    template?: string;
    templateUrl?: string;
    render?: any
}

export interface IComponentDef extends IComponentConfig {
    controller: IComponentController
}

export interface IComponent {
    refresh();
}