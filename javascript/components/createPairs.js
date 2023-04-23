import {createElement} from "../helper/createElement.js";
import {shuffleArray} from "../helper/shuffleArray.js";

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
    const cardControler = data => {
        let index = 0;
        spanFront.textContent = data [index][0];
        spanBack.textContent = data [index][1];
        const flipCard = () => {
            btnItem.classList.add('card__item_flipped');
            btnItem.removeEventListener('click', flipCard);
            setTimeout(() =>{
                btnItem.classList.remove('card__item_flipped');
                setTimeout(() => {
                    index++;
                    if (index === data.length) {
                        spanFront.textContent = 'the end';
                        alert('Вернёмся к категориям!');
                        setTimeout(() => {
                            btnReturn.click();
                        }, 2000);
                        return;
                    }
                    spanFront.textContent = data [index][0];
                    spanBack.textContent = data [index][1];
                    setTimeout (() => {
                        btnItem.addEventListener('click', flipCard);
                    }, 300);

                }, 100);
            }, 1000);
        };
        btnItem.addEventListener('click', flipCard);
    }
    const mount = data => {
        app.append(pairs);
        const newDate = shuffleArray(data.pairs);
        cardControler(newDate);

    };
    const unmount = () => {
        pairs.remove();
    };
    return {btnReturn, mount, unmount};
}
