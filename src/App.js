import React from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

const App = () => {
  const [loading, setLoading] = React.useState(true)
  const [person, setPerson] = React.useState(null)
  const [title, setTitle] = React.useState('name')
  const [value, setValue] = React.useState('Random Person')
// fetch function
  const fetchUser = async () => {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    const user = data.results[0]
    const { phone, email } = user
    const { large: image } = user.picture
    const {
      login: { password },
    } = user
    const { first, last } = user.name
    const {
      dob: { age },
    } = user
    const {
      street: { number, name },
    } = user.location
    const newUser = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }
    setPerson(newUser)
    setLoading(false)
    setTitle('name')
    setValue(newUser.name)
  }

  React.useEffect(() => {
    fetchUser()
  }, [])

  // onMouseoverHandler fuinction
  const valueHandler = (e) => {
    // e.preventDefault()
    // console.log(e.target)
    if (e.target.classList.contains('icon')) {
      //getting label value
      const newValue = e.target.dataset.label
      // console.log(newValue)
      setTitle(newValue)
      setValue(person[newValue])
      
    }
  }

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random"
            className="user-img"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="value-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={valueHandler}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={valueHandler}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseOver={valueHandler}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={valueHandler}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={valueHandler}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={valueHandler}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={fetchUser}>
            {loading ? 'Loading ...!' : 'Random User'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
