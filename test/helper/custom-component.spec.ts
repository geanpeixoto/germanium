import {register} from '../../src/core/helper/custom-component';
import {elementOpen, elementClose} from 'incremental-dom';

describe('helper/custom-element', () => {
  describe('register', () => {
    it('espera-se que, quando um novo elemento for criado, seja executado o construtor do controller', (done) => {
      register({
        tag: 'x-element',
        controller: class {
            constructor(element: Element) {
                done();
            }
        },
        render: () => {}
      });

      document.createElement('x-element');
    });

    it('espera-se que, quando um novo elemento for criado, seja executado o render do component', (done) => {
        register({
            tag: 'x-element-2',
            controller: class {},
            render: () => {
                done();
            }        
        });

        document.createElement('x-element-2');
    });

    it('espera-se que, quando o render for executado, seja fornecido uma instância do controllador com primeiro parâmetro', (done) => {
        register({
            tag: 'x-element-3',
            controller: class {isTrue = true},
            render: (data: any) => {
                expect(data.isTrue).toBeTruthy();
                done();
            }
        });

        document.createElement('x-element-3');
    });

  });
});
