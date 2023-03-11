import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        ${this._generateMarkupButtonNext(curPage)}
      `;
    }
    //last page
    if (curPage === numPages && numPages > 1) {
      return `
        ${this._generateMarkupButtonPrev(curPage)}
      `;
    }

    //other page
    if (curPage < numPages) {
      return `${this._generateMarkupButtonPrev(
        curPage
      )} ${this._generateMarkupButtonNext(curPage)}`;
    }
    //page 1 and no other pages
    return '';
    // const markup = ``;
  }

  _generateMarkupButtonPrev(page) {
    return `
        <button data-goto='${
          page - 1
        }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
        </button>
        `;
  }

  _generateMarkupButtonNext(page) {
    return `        
        <button data-goto='${
          page + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
  }
}

export default new paginationView();
