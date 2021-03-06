const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  // baseURL: 'https://tyg-app.herokuapp.com/api',
  timeout: 2000
})

window.onload = function() {

  // Check if logged
  if (window.localStorage.token) {
    document.getElementById('signup-navbar').style.display = "none"
    document.getElementById('login-navbar').style.display = "none"
    document.getElementById('logout-btn').style.display = "inline-block"
    document.getElementById('profile-btn').style.display = "inline-block"
  } else {
    document.getElementById('signup-navbar').style.display = "inline-block"
    document.getElementById('login-navbar').style.display = "inline-block"
    document.getElementById('logout-btn').style.display = "none"
    document.getElementById('profile-btn').style.display = "none"
  }

  // Get my Info
  api
    .get('/users/me', {
      headers: {
        token: localStorage.token
      }
    })
    .then(me => {
      console.log(me.data)

      // My name
      document.getElementById('my-name').innerText = me.data.username

      // Generate FinishedGames Table
      document.getElementById('finished-table').appendChild(document.createElement('tbody'))

      let fiTbody = document.querySelector('#finished-table tbody')
      me.data.finishedGames.forEach((game, i) => {
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
        <a id ="fiGame${i}" href="game.html">${game.name}</a>
        `
        fiNameTd.classList.add(`name${i}`)
        fiTr.appendChild(fiNameTd)

        // Create Rates
        let fiRateTd = document.createElement('td')
        fiRateTd.classList.add(`rate${i}`, 'text-center')
        const gameRate = me.data.ratings.filter(rate => rate.game === game._id)
        fiRateTd.innerText = gameRate.length ? gameRate[0].rate : ""
        fiTr.appendChild(fiRateTd)

        // Delete button
        let fiDeleteTd = document.createElement('td')
        fiDeleteTd.classList.add(`fiDeleteButton${i}`)
        fiDeleteTd.innerHTML += `
          <button type="button" class="close btn-danger" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        `
        fiTr.appendChild(fiDeleteTd)

        fiTbody.appendChild(fiTr)

        document.getElementById(`fiGame${i}`).addEventListener('click', () => {
          localStorage.setItem('game', game.name)
        })

        console.log()
        document.querySelector(`.fiDeleteButton${i} button`).addEventListener('click', () => {
          api
            .delete(`/users/me/finished/${game._id}`, {
              headers: {
                token: localStorage.token
              }
            })
            .then(finished => {
              console.log(finished)
              window.location.reload()
            })
            .catch(err => console.log(err))
        })
      })

      // Generate PendingGames Table
      document.getElementById('pending-table').appendChild(document.createElement('tbody'))

      let peTbody = document.querySelector('#pending-table tbody')

      me.data.pendingGames.forEach((game, i) => {
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
        <a id ="peGame${i}" href="game.html">${game.name}</a>
        `
        peNameTd.classList.add(`name${i}`)
        peTr.appendChild(peNameTd)

        // Create Rates
        let peRateTd = document.createElement('td')
        peRateTd.classList.add(`rate${i}`, 'text-center')
        const gameRate = me.data.ratings.filter(rate => rate.game === game._id)
        peRateTd.innerText = gameRate.length ? gameRate[0].rate : ""
        peTr.appendChild(peRateTd)

        // Delete button
        let peDeleteTd = document.createElement('td')
        peDeleteTd.classList.add(`peDeleteButton${i}`)
        peDeleteTd.innerHTML += `
          <button type="button" class="close btn-danger" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        `
        peTr.appendChild(peDeleteTd)

        peTbody.appendChild(peTr)

        document.getElementById(`peGame${i}`).addEventListener('click', () => {
          localStorage.setItem('game', game.name)
        })

        document.querySelector(`.peDeleteButton${i} button`).addEventListener('click', () => {
          api
            .delete(`/users/me/pending/${game._id}`, {
              headers: {
                token: localStorage.token
              }
            })
            .then(pending => {
              console.log(pending)
              window.location.reload()
            })
            .catch(err => console.log(err))
        })
      })

      // Generate FavouriteGames Table
      document.getElementById('favourites-table').appendChild(document.createElement('tbody'))

      let faTbody = document.querySelector('#favourites-table tbody')
      me.data.favouriteGames.forEach((game, i) => {
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
        <a id ="faGame${i}" href="game.html">${game.name}</a>
        `
        faNameTd.classList.add(`name${i}`)
        faTr.appendChild(faNameTd)

        // Create Rates
        let faRateTd = document.createElement('td')
        faRateTd.classList.add(`rate${i}`, 'text-center')
        const gameRate = me.data.ratings.filter(rate => rate.game === game._id)
        faRateTd.innerText = gameRate.length ? gameRate[0].rate : ""
        faTr.appendChild(faRateTd)

        // Delete button
        let faDeleteTd = document.createElement('td')
        faDeleteTd.classList.add(`faDeleteButton${i}`)
        faDeleteTd.innerHTML += `
          <button type="button" class="close btn-danger" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        `
        faTr.appendChild(faDeleteTd)

        faTbody.appendChild(faTr)

        document.getElementById(`faGame${i}`).addEventListener('click', () => {
          localStorage.setItem('game', game.name)
        })

        document.querySelector(`.faDeleteButton${i} button`).addEventListener('click', () => {
          api
            .delete(`/users/me/favourites/${game._id}`, {
              headers: {
                token: localStorage.token
              }
            })
            .then(favourites => {
              console.log(favourites)
              window.location.reload()
            })
            .catch(err => console.log(err))
        })
      })

      // Generating Account Table

      // Create My Data
      document.getElementById('my-name-table').innerText = me.data.username
      document.getElementById('my-email-table').innerText = me.data.email
      document.getElementById('total-entries-table').innerText = me.data.finishedGames.length + me.data.pendingGames.length

      // Create Follows Table
      let followsTbody = document.querySelector('#follows-pills-table tbody')

      me.data.follows.forEach((follow, i)=> {

        // Create Row
        let followTr = document.createElement('tr')

        // Create Index
        let followIndexTd = document.createElement('td')
        followIndexTd.innerText = i+1
        followIndexTd.classList.add(`${i}`)
        followTr.appendChild(followIndexTd)

        // Create Name
        let followNameTd = document.createElement('td')
        followNameTd.innerText = follow.username
        followNameTd.classList.add(`name${i}`)
        followTr.appendChild(followNameTd)

        // Create View Profile Button
        let followViewProfileButtonTd = document.createElement('td')
        followViewProfileButtonTd.innerHTML = `
        <button type="button" id="view-profile-btn${i}" class="btn btn-primary">View Profile</button>
        `
        followTr.appendChild(followViewProfileButtonTd)
        
        // Create Delete Follow Button
        let followDeleteBtn = document.createElement('td')
        followDeleteBtn.classList.add(`follow-delete-button${i}`)
        followDeleteBtn.innerHTML = `
        <button type="button" class="close btn-danger" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        `
        followTr.appendChild(followDeleteBtn)
        
        followsTbody.appendChild(followTr)
        
        document.getElementById(`view-profile-btn${i}`).addEventListener('click', () => {
          localStorage.setItem('userId', follow._id)
          window.location.href = 'user.profile.html'
        })

        document.querySelector(`.follow-delete-button${i} button`).addEventListener('click', () => {
          api
            .delete(`/users/me/${follow._id}`, {
              headers: {
                token: localStorage.token
              }
            })
            .then(follows => window.location.reload())
            .catch(err => console.log(err))
        })
      })

      // Create Followers Table
      let followersTbody = document.querySelector('#followers-pills-table tbody')

      me.data.followers.forEach((follower, i)=> {

        // Create Row
        let followerTr = document.createElement('tr')

        // Create Index
        let followerIndexTd = document.createElement('td')
        followerIndexTd.innerText = i+1
        followerIndexTd.classList.add(`${i}`)
        followerTr.appendChild(followerIndexTd)

        // Create Name
        let followerNameTd = document.createElement('td')
        followerNameTd.innerText = follower.username
        followerNameTd.classList.add(`name${i}`)
        followerTr.appendChild(followerNameTd)

        // Create View Profile Button
        let followerViewProfileButtonTd = document.createElement('td')
        followerViewProfileButtonTd.innerHTML = `
        <button type="button" id="view-profile-btn${i}" class="btn btn-primary">View Profile</button>
        `
        followerTr.appendChild(followerViewProfileButtonTd)
        
        // Create Delete follower Button
        //
        
        followersTbody.appendChild(followerTr)

        document.getElementById(`view-profile-btn${i}`).addEventListener('click', () => {
          localStorage.setItem('userId', follower._id)
          window.location.href = '/user.profile.html'
        })
      })
    })
    .catch(err => console.log(err))
}

// Game Browser
api
  .get('/games')
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
  localStorage.setItem('game', search)
  window.location.href = 'game.html'
})

// Home Button
document.getElementById('home-btn').addEventListener('click', () => {
  window.location.href = 'index.html'
})

// Profile Button
document.getElementById('profile-btn').addEventListener('click', () => {
  window.location.href='own.profile.html'
})

// Community Button
document.getElementById('community-btn').addEventListener('click', () => {
  if (localStorage.token) {
    window.location.href='community.html'
  } else {
    window.alert('You must be logged in')
  }
})

// Log In Button
document.getElementById('login-btn').addEventListener('click', () => {
  api
    .post('/auth/login', {
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

    api.post('/auth/signup', {
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
  window.location.href = 'index.html'
})