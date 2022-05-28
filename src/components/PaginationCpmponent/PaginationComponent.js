import React from 'react'

const PaginationComponent = ({goToNextPage,goToPreviousPage}) => {

  return (
    <div>
        { goToPreviousPage && <button onClick={goToPreviousPage}>Previous</button>}
        { goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </div>
  )
}

export default PaginationComponent