import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserSighupForm from './UserSighUpForm'
import styles from '../../styles/User.module.css'
import { toggleForm } from '../../store/user/userSlice'

const UserForm = () => {
  const dispatch = useDispatch()
  const { showForm } = useSelector(({ user }) => user)

  const closeForm = () => dispatch(toggleForm(false))

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
      <UserSighupForm closeForm={closeForm} />
    </>

  ) : (
    <></>
  )

}

export default UserForm