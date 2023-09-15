import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../store/api/apiSlice'
import { ROUTES } from '../../utils/routes'
import Product from './Product'

const SingleProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id })

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME)
    }
  }, [isLoading, isFetching, isSuccess, navigate])

  return (
    !data ? (
      <section className='preloader'>
        Loading...
      </section>) : (
      <>
        <Product {...data} />
      </>
    )
  )
}

export default SingleProduct