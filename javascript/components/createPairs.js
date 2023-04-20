import {createElement} from "../helper/createElement.js";

export const createPairs = (app) => {
    const pairs = createElement('section', {
        className: 'card section-offset'
    });
    const container = createElement('div', {
        className: 'container card__container'
    });
    const btnReturn = createElement('button', {
        className: 'card__return',
        ariaLabel: 'Возврат к категориям'
    });
    const btnItem = createElement('button', {
        className: 'card__item'
    });
    const spanFront = createElement('span', {
        className: 'card__front'
    });
    const spanBack = createElement('span', {
        className: 'card__back'
    });
    btnItem.append(spanFront, spanBack);
    container.append(btnReturn, btnItem);
    pairs.append(container);
    const mount = data => {
        app.append(pairs);
    };
    const unmount = () => {
        pairs.remove();
    };
    return {btnReturn, mount, unmount};
}
