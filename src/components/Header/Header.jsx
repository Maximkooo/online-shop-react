import React, { useEffect, useState } from 'react'
import styles from '../../styles/Header.module.css'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import logo from '../../images/logo.svg'
import avatar from '../../images/avatar.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from '../../store/user/userSlice'
import { useGetProductsQuery } from '../../store/api/apiSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser, cart } = useSelector(({ user }) => user)

  const [searchValue, setSearchValue] = useState('')
  const [values, setValues] = useState({ name: "Guest", avatar: avatar })

  const { data, isLoading } = useGetProductsQuery({ title: searchValue })

  useEffect(() => {
    if (!currentUser) return

    setValues(currentUser)
  }, [currentUser, navigate])

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true))
  }

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value)
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt='logo' />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <Link to={ROUTES.PROFILE}>
            <div className={styles.avatar} style={{ backgroundImage: `url(${values.avatar})` }} />
            <div className={styles.username}>{values.name}</div>
          </Link>
        </div>
        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className='icon'>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type='search'
              name='search'
              placeholder='Search for anything...'
              autoComplete='off'
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          {searchValue && <div className={styles.box}>
            {isLoading ? 'Loading' : !data.length ? 'No results' : (
              data.map(({ title, images, id }) => {
                return (
                  <Link
                    className={styles.item}
                    to={`/products/${id}`}
                    key={id}
                    onClick={() => setSearchValue('')}
                  >
                    <div
                      className={styles.image}
                      style={{ backgroundImage: `url(${images[0]})` }}
                    />
                    <div className={styles.title}>{title}</div>
                  </Link>
                )
              })
            )}
          </div>}

        </form>

        <div className={styles.account}>
          <Link to={ROUTES.HOME} className={styles.favorites}>
            <svg className={styles['icon-fav']}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles['icon-cart']}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length &&
              (<span className={styles.count}>{cart.length}</span>)
            }
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header