export interface IRenderMethod {
    (data?: IComponentController): void;
}

export interface IComponentController {
    new (element: Element);
}

export interface IComponentConfig {
    tag: string;
    templateUrl?: string;
    render?: any;
    reactive?: boolean;
}

export interface IComponentDef extends IComponentConfig {
    controller: IComponentController
}

export interface IComponent {
    refresh();
}
