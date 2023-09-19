import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm, toggleFormType } from '../../store/user/userSlice'
import { SIGN_UP } from '../../utils/constants'
import UserSighupForm from './UserSighUpForm'
import UserLoginForm from './UserLoginForm'
import styles from '../../styles/User.module.css'

const UserForm = () => {
  const dispatch = useDispatch()
  const { showForm, formType } = useSelector(({ user }) => user)

  const closeForm = () => dispatch(toggleForm(false))
  const toggleCurrentFormType = (type) => dispatch(toggleFormType(type))

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
      {formType === SIGN_UP ? (
        <UserSighupForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      ) : (
        <UserLoginForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      )}
    </>

  ) : (
    <></>
  )

}

export default UserForm