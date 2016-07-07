import 'es6-shim';
import {Component} from '../src/core/decorator/component';
import {elementOpen, elementClose, text, attr} from 'incremental-dom';


@Component({
    tag: 'x-item',
    render: (controller) => {
        elementOpen('h1')
            elementOpen('content')
            elementClose('content')
        elementClose('h1')
    }
})
class XItem {
    text:string = <any> Date.now();
}

@Component({
    tag: 'x-list',
    render: (controller) => {
        controller.data.forEach(item => {
            elementOpen('x-item')
                text(item);
            elementClose('x-item')
        })
    }
})
class XList {
    data = ['Item 1', 'Item 2', 'Item 3']
}

document.body.appendChild(document.createElement('x-list'));

