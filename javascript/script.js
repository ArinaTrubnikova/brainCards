import {createHeader} from "./components/createHeader.js";
import {fetchCards, fetchCategories} from "./service/api.service.js";
import {createCategory} from "./components/createcategory.js";
import {createElement} from "./helper/createElement.js";
import {createEditCategory} from "./components/createEditCategory.js";
import {createPairs} from "./components/createPairs.js";

const initApp = async () => {
    const headerParent = document.querySelector('.header');
    const app = document.querySelector('#app');
    const headerObj = createHeader(headerParent);
    const categoryObj = createCategory(app);
    const editCategoryObj = createEditCategory(app);
    const pairsObj = createPairs(app);
    const allSectionUnmount = () => {
        [categoryObj, editCategoryObj, pairsObj].forEach(obj => obj.unmount());

    }
    const renderIndex = async e => {
        e?.preventDefault();
        allSectionUnmount();
        const categories = await fetchCategories();
        headerObj.updateHeaderTitle('Категории');
        if (categories.error) {
            const errorText = createElement('p', {
                className: 'server-error',
                textContent: 'Ошибка сервера'
            });
            app.append(errorText);
            return;
        }
        categoryObj.mount(categories);
            }
         renderIndex();
    headerObj.headerLogoLink.addEventListener('click', renderIndex);
    headerObj.headerBtn.addEventListener('click', () => {
        allSectionUnmount();
        headerObj.updateHeaderTitle('Новая категория');
        editCategoryObj.mount();
    });
    categoryObj.categoryList.addEventListener('click', async ({target}) => {
        const categoryItem = target.closest('.category__item');

        if (target.closest('.category__edit')) {
            const dataCards = await fetchCards(categoryItem.dataset.id);
            allSectionUnmount();
            headerObj.updateHeaderTitle('Редактирование');
            editCategoryObj.mount(dataCards);
        }
        if (target.closest('.category__del')) {

        }
        if (categoryItem) {
            const dataCards = await fetchCards(categoryItem.dataset.id);
            allSectionUnmount();
            headerObj.updateHeaderTitle(dataCards.title);
            pairsObj.mount(dataCards);
        }
    });
    pairsObj.btnReturn.addEventListener('click', renderIndex);

};

      initApp();