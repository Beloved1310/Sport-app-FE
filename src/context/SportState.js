import { useState } from 'react'
import SportContext from './SportContext'

const SportState = (props) => {
  const host = 'https://to-do-list-backend-application.vercel.app'
  const SportsInitial = []
  const [Sports, setSport] = useState(SportsInitial)

  // Add a Note
  const addSports = async (title, task, isComplete) => {
    // Sport: API Call
    // API Call
    const response = await fetch(`${host}/api/Sport/addSport`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, task, isComplete }),
    })

    const Sport = await response.json()
    setSport(Sports.concat(Sport))
    props.showAlert('Sport Added', 'info')
  }

  //get all the Sports

  const getSports = async () => {
    //Api call
    const response = await fetch(`${host}/api/Sport/fetchAllSport/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    })
    const json = await response.json()
    setSport(json)
  }

  //edit Sport

  const editSport = async (id, title, task, isComplete) => {
    // API Call
    const response = await fetch(`${host}/api/Sport/updateSport/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, task, isComplete }),
    })
    const json = await response.json()

    let newSports = JSON.parse(JSON.stringify(Sports))
    // Logic to edit in client
    for (let index = 0; index < newSports.length; index++) {
      const element = newSports[index]
      if (element._id === id) {
        newSports[index].title = title
        newSports[index].task = task
        newSports[index].isComplete = isComplete
        break
      }
    }
    setSport(newSports)
    props.showAlert('Sport Updated', 'warning')
  }

  const deleteSport = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/Sport/deleteSport/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    })
    const json = response.json()
    const newSports = Sports.filter((Sport) => {
      return Sport._id !== id
    })
    setSport(newSports)
    props.showAlert('Sport Deleted', 'danger')
  }

  return (
    <SportContext.Provider
      value={{ Sports, addSports, getSports, editSport, deleteSport }}
    >
      {props.children}
    </SportContext.Provider>
  )
}
export default SportState