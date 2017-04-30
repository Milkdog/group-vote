import React, { Component } from 'react'
import * as firebase from 'firebase'
import FontAwesome from 'react-fontawesome'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false
    }

    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyAnSmdnFoOUrqZOzyn3iupVhGXOz2cpbxg",
      authDomain: "group-vote.firebaseapp.com",
      databaseURL: "https://group-vote.firebaseio.com",
      projectId: "group-vote",
      storageBucket: "group-vote.appspot.com",
      messagingSenderId: "226099609493"
    }

    firebase.initializeApp(firebaseConfig)
  }

  promptLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()

    firebase.auth().signInWithRedirect(provider).then(function(result) {
      // // The signed-in user info.
      const user = result.user;
      const userId = user.uid

      this.state = {
        database: firebase.database().ref('/users/').child(userId),
        isLoggedIn: true
      }
    }).catch(function(error) {
      // Handle Errors here.
      console.log(error)
    })
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        this.promptLogin()
      }

      console.log('Logged in', user.uid)

      // Set DB base
      const database = firebase.database().ref('/users/').child(user.uid)

      this.setState({
        database,
        isLoggedIn: true
      })
    })
  }

  render() {
    if (!this.state.isLoggedIn) {
      return <FontAwesome
        className="loader"
        name="spinner"
        size="5x"
      />
    }

    const database = this.state.database
    return (
      <div>
        Logged in
      </div>
    )
  }
}

export default App;
