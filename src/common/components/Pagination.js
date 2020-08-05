import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { MDBPagination, MDBPageItem, MDBPageNav } from 'mdbreact'

const Pagination = ({ data, pageSize, pageDataHandler, clasess }) => {
  const [activePage, setActivePage] = useState(1)
  const [firstChangeDone, setFirstChangeDone] = useState(false)
  const onChangePage = (page) => {
    const newData = data.filter((customer, index) => {
      const prev = (page || 1) - 1

      const itemIndex = index + 1
      if (itemIndex > prev * pageSize && itemIndex <= (page || 1) * pageSize) {
        return customer
      }
      return null
    })

    if (!newData.length && data.length && page > 1)
      return onChangePage(page - 1)

    setActivePage(page || 1)
    return pageDataHandler(newData)
  }

  useEffect(() => {
    if (!firstChangeDone) {
      setFirstChangeDone(true)
      onChangePage()
    } else {
      onChangePage(activePage)
    }
  }, [data])

  return (
    <MDBPagination color="blue" className={clasess}>
      <MDBPageItem disabled={activePage === 1}>
        <MDBPageNav
          onClick={() => onChangePage(activePage - 1)}
          aria-label="Previous"
        >
          <span aria-hidden="true">Anterior</span>
        </MDBPageNav>
      </MDBPageItem>
      {[...Array(Math.ceil(data.length / pageSize)).keys()].map((key) => {
        return (
          <MDBPageItem key={key + 1} active={key + 1 === activePage}>
            <MDBPageNav onClick={() => onChangePage(key + 1)}>
              {key + 1}
            </MDBPageNav>
          </MDBPageItem>
        )
      })}
      <MDBPageItem disabled={activePage === Math.ceil(data.length / pageSize)}>
        <MDBPageNav
          onClick={() => onChangePage(activePage + 1)}
          aria-label="Next"
        >
          <span aria-hidden="true">Siguiente</span>
        </MDBPageNav>
      </MDBPageItem>
    </MDBPagination>
  )
}

Pagination.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  pageSize: PropTypes.number,
  pageDataHandler: PropTypes.func.isRequired,
  clasess: PropTypes.string,
}

Pagination.defaultProps = {
  pageSize: 10,
  clasess: '',
}

export default Pagination
