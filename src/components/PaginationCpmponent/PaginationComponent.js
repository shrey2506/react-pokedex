import React from 'react'
import './PaginationComponent.css'

const PaginationComponent = ({goToNextPage,goToPrevPage}) => {

  return (
    <div >
        { goToNextPage && <button className='pagination-button pagination-button-next' onClick={goToNextPage}>Next</button>}
        { goToPrevPage && <button className='pagination-button pagination-button-prev' onClick={goToPrevPage}>Previous</button>}
    </div>
  )
}

export default PaginationComponent