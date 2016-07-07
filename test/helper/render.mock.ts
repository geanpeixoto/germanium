import {elementOpen, elementClose, text, attr} from 'incremental-dom';

export function render (controller) {
    elementOpen('content')
        attr('select', 'h1')
    elementClose('content')
    elementOpen('p')
        text(`current timestemp: ${controller.text}`);
    elementClose('p')
}
