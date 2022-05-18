import React from 'react';
import { observer } from 'mobx-react-lite';

const Pagination = observer(({allObjectsNum, objects}) => {
   const [currentPage, setPage] = React.useState(1);

  const pagesNum = Math.ceil(allObjectsNum / 10);
  const pagesArray = Array.from(Array(pagesNum)).map((_, i) => i+1);

  objects.filter.page = currentPage - 1

   const nextPage = () => {
      setPage(currentPage + 1);
  }

   const prevPage = () => {
      setPage(currentPage - 1);
   }

  const selectPage = (page) => {
      setPage(page);
  }

  objects.fetch();


   return (
      <div className="user__list-pagination">
      <div className="pagination-inner">
          <button 
            onClick={prevPage}
            className={`pagination__back pagination__back--${currentPage === 1 ? 'disabled' : 'default'}`}
            disabled={currentPage === 1}
            >Назад
         </button>
              {pagesArray.map(page => 
                  <>
                      <button 
                          onClick={() => selectPage(page)}
                          className={`pagination__number pagination__number--${currentPage === page ? 'stay' : 'default'}`}
                          >{page}
                      </button>
                  </>
              )}
          <button 
            onClick={nextPage}
            className={`pagination__forward pagination__forward--${pagesNum === currentPage ? 'disabled' : 'default'}`} 
            disabled={pagesNum === currentPage}
            >Вперед
         </button>
      </div>
      <div className="pagination-text">Показано {1+(10*(currentPage-1))} - {pagesNum === currentPage ? allObjectsNum : 10+(10*(currentPage-1))} из {allObjectsNum}</div>
  </div>
   )
});

export default Pagination;
