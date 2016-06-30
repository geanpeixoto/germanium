import 'es6-shim';
import {Component} from '../src/core/decorator/component';
import {elementOpen, elementClose, text, attr} from 'incremental-dom';

@Component({
    tag: 'x-item',
    render: (controller) => {
        elementOpen('content')
            attr('select', 'h1')
        elementClose('content')
        elementOpen('div');
            text(controller.text)
        elementClose('div');
    }
})
class XItem {
    text:string = <any> Date.now();
    constructor(element: Element) {
        window.setInterval(() => {
            this.text = <any> Date.now();
        }, 2)

        console.log(element.innerHTML);
    }
}
