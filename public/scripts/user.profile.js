window.onload = function() {

  const userId = localStorage.userId
  console.log(userId)
  localStorage.removeItem('userId')

  // Check if logged
  if (window.localStorage.token) {
    document.getElementById('signup-navbar').style.display = 'none'
    document.getElementById('login-navbar').style.display = 'none'
    document.getElementById('logout-btn').style.display = 'inline-block'
  } else {
    document.getElementById('signup-navbar').style.display = 'inline-block'
    document.getElementById('login-navbar').style.display = 'inline-block'
    document.getElementById('logout-btn').style.display = 'none'
  }

  // Get User Info
  axios
    .get(`http://localhost:3000/api/users/${userId}`, {
      headers: {
        token: localStorage.token
      }
    })
    .then(user => {
      console.log(user.data)
      document.title = user.data.username + ' Profile'

      // Username
      document.getElementById('user-name').innerText = user.data.username

      // Generate FinishedGames Table
      document.getElementById('finished-table').appendChild(document.createElement('tbody'))

      let fiTbody = document.querySelector('#finished-table tbody')

      user.data.finishedGames.forEach((game, i) => {
        // Create Row
        let fiTr = document.createElement('tr')

        // Create index
        let fiIndexTd = document.createElement('td')
        fiIndexTd.innerText = i+1
        fiIndexTd.classList.add(`${i}`)
        fiTr.appendChild(fiIndexTd)

        // Create Name
        let fiNameTd = document.createElement('td')
        fiNameTd.innerHTML = `
        <a id ="fiGame${i}" href="http://localhost:3000/game.html?game=${game.name}">${game.name}</a>
        `
        fiNameTd.classList.add(`name${i}`)
        fiTr.appendChild(fiNameTd)

        // Create Rate
        let fiRateTd = document.createElement('td')
        fiRateTd.innerText = 'hola'
        fiRateTd.classList.add(`rate${i}`)
        fiTr.appendChild(fiRateTd)

        fiTbody.appendChild(fiTr)
      })

      // Generate PendingGames Table
      document.getElementById('pending-table').appendChild(document.createElement('tbody'))

      let peTbody = document.querySelector('#pending-table tbody')

      user.data.pendingGames.forEach((game, i) => {
        // Create Row
        let peTr = document.createElement('tr')

        // Create index
        let peIndexTd = document.createElement('td')
        peIndexTd.innerText = i+1
        peIndexTd.classList.add(`${i}`)
        peTr.appendChild(peIndexTd)

        // Create Name
        let peNameTd = document.createElement('td')
        peNameTd.innerHTML = `
        <a id ="peGame${i}" href="http://localhost:3000/game.html?game=${game.name}">${game.name}</a>
        `
        peNameTd.classList.add(`name${i}`)
        peTr.appendChild(peNameTd)

        // Create Rate
        let peRateTd = document.createElement('td')
        peRateTd.innerText = 'hola'
        peRateTd.classList.add(`rate${i}`)
        peTr.appendChild(peRateTd)

        peTbody.appendChild(peTr)
      })

      // Generate FavouriteGames Table
      document.getElementById('favourites-table').appendChild(document.createElement('tbody'))

      let faTbody = document.querySelector('#favourites-table tbody')
      user.data.favouriteGames.forEach((game, i) => {
        // Create Row
        let faTr = document.createElement('tr')

        // Create index
        let faIndexTd = document.createElement('td')
        faIndexTd.innerText = i+1
        faIndexTd.classList.add(`${i}`)
        faTr.appendChild(faIndexTd)

        // Create Name
        let faNameTd = document.createElement('td')
        faNameTd.innerHTML = `
        <a id ="faGame${i}" href="http://localhost:3000/game.html?game=${game.name}">${game.name}</a>
        `
        faNameTd.classList.add(`name${i}`)
        faTr.appendChild(faNameTd)

        // Create Rate
        let faRateTd = document.createElement('td')
        faRateTd.innerText = 'hola'
        faRateTd.classList.add(`rate${i}`)
        faTr.appendChild(faRateTd)

        faTbody.appendChild(faTr)
      })

      // Generate Follows Table
      document.getElementById('follows-table').appendChild(document.createElement('tbody'))

      let foTbody = document.querySelector('#follows-table tbody')

      user.data.follows.forEach(follow => {
        
      })
    })
    .catch(err => {console.log(err)})
}

// Game Browser
axios
  .get('http://localhost:3000/api/games')
  .then(games => {
    games.data.forEach((game, i) => {
      document.getElementById('main-browser-results').innerHTML += `
      <option value="${game.name}" id="${game._id}"></option>
      `
      if (i < 10) console.log(game.name)
    })
  })
  .catch(err => console.log(err))

// Search Button
document.getElementById('main-browser-btn').addEventListener('click', () => {
  const search = document.getElementById('main-browser').value
  axios
    .get('http://localhost:3000/api/games')
    .then(game => {
      window.location = `http://localhost:3000/game.html?game=${search}`
    })
    .catch(err => console.log(err))
})

// Home Button
document.getElementById('home-btn').addEventListener('click', () => {
  window.location = 'http://localhost:3000/index.html'
})

// Profile Button
document.getElementById('profile-btn').addEventListener('click', () => {
  window.location = 'http://localhost:3000/own.profile.html'
})

// Community Button
document.getElementById('community-btn').addEventListener('click', () => {
  window.location = 'http://localhost:3000/community.html'
})

// Log In Button
document.getElementById('login-btn').addEventListener('click', () => {
  axios.post('http://localhost:3000/api/auth/login', {
    email: document.getElementById('login-email').value,
    password: document.getElementById('login-pass').value
  })
  .then(response => {
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token)
      window.location.reload()
    } else {
      alert('Email or Password Wrong')
    }
  })
  .catch(err => {
    alert('Email or Password Wrong')
  })
})

// Sign Up Button
document.getElementById('signup-btn').addEventListener('click', () => {
  const pass = document.getElementById('signup-pass')
  const repeatedPass = document.getElementById('signup-repeated-pass')
  if (pass.value === repeatedPass.value) {

    pass.classList.remove('wrongPass')
    repeatedPass.classList.remove('wrongPass')

    axios.post('http://localhost:3000/api/auth/signup', {
      username: document.getElementById('signup-username').value,
      email: document.getElementById('signup-email').value,
      password: pass.value
    })
    .then(response => {
      localStorage.setItem('token', response.data.token)
      window.location.reload()
    })
    .catch(err => console.log(err))
  } else {
    pass.classList.add('wrongPass')
    repeatedPass.classList.add('wrongPass')
  }
})

// Log Out Button
document.getElementById('logout-btn').addEventListener('click', () => {
  window.localStorage.clear()
  window.location.reload()
})