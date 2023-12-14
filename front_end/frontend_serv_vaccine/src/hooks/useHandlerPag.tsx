import React, { useState } from 'react'
import { NextPrevioPage } from '../interfaces';



export const UseHandlerPag = ( currentPage = 1) => {

const [page, setPage] = useState(currentPage);


const handlePreviousPage =  (total: number) => {
  if (page > 1) {
    setPage((page) =>page - 1);
  }
};
 

const handleNextPage =  (total: number) => {
  console.log('--1-')
  console.log({total, page})
  if (page < total) {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      return nextPage;
    });
    console.log(page)
    console.log('--2-')
  }
};

const whereGo =   (nextPrevioPage: NextPrevioPage, total=0) => {
     const { nextPage } = nextPrevioPage;
     console.log({nextPage})
    switch (nextPage) {
          case 'next':
            // Lógica para ir a la siguiente página
             handleNextPage(total);
            break;
          case 'prev':
            // Lógica para ir a la página anterior
             handlePreviousPage(total);
            break;
          case 'none':
            // Lógica para no realizar ninguna acción
            setPage(1);
            break;
          default:
            break;
        }
  }

   

    return {
      page,
      whereGo,
    
    }
  
}
