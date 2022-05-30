import React from 'react'
import './PaginationComponent.css'

const PaginationComponent = ({goToNextPage}) => {

  return (
    <div >
        { goToNextPage && <button className='pagination-button' onClick={goToNextPage}>Load More</button>}
    </div>
  )
}

export default PaginationComponent