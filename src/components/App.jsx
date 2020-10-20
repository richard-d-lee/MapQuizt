import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Quizzer from './Quizzer.jsx'
import SearchForm from './SearchForm.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login.jsx';
import key from './key.js'
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Leaderboard from './LeaderBoard.jsx';




var config = {
  headers: { 'Access-Control-Allow-Origin': '*' }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      populated: 'false',
      lat: 0,
      long: 0,
      countries: [],
      currentCountry: 'Boulder, CO, USA',
      currentQuestionObj: {},
      currentQuestion: '',
      quizQuestions: [],
      currentSelection: '',
      questionCount: 0,
      showModal: false,
      correctAnswers: 0,
      visitForm: '',
      currentId: '',
      currentPass: '',
      currentPassDupe: '',
      loggedIn: false,
      scores: []
    };
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAlert = this.onAlert.bind(this);
    this.onIdChange = this.onIdChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.onPassDupeChange = this.onPassDupeChange.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.getLeaderboard = this.getLeaderboard.bind(this);
  }


  onAlert() {
    alert(`Correct Answers:  ${this.state.correctAnswers} out of 50`)
  }

  onLoginSubmit() {
    axios.get(`/user`, {
      params: {
        id: this.state.currentId,
        password: this.state.currentPass
      },
    })
      .then((data) => {
        if (data.data === 'logged') {
          this.setState({ loggedIn: true })
        } else if (data.data === 'nonexistent') {
          alert('User name does not exist!')
        } else if (data.data === 'passInvalid') {
          alert('Invalid credentials! Please try again or create a new account.')
        }
      })
  }

  onCreateSubmit() {
    if (this.state.currentPass === this.state.currentPassDupe) {
      axios.post('/user', {
        body: {
          id: this.state.currentId,
          pass: this.state.currentPass,
        }
      })
        .then((data) => {
          console.log(data.data);
          if (data.data === 'error') {
            alert('Username already exists! Please try again.')
          } else {
            alert('Account created! Please log in to continue.')
          }
        })
    } else {
      alert('Your passwords do not match! Account not created.')
    }
  }

  getLeaderboard() {
    let sorter = (array) => {
      let newArr = array;
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i + 1] !== undefined && newArr[i] !== undefined) {
          console.log(newArr[i])
          if (newArr[i][1] < newArr[i + 1][1]) {
            console.log(newArr)
            let oldArray = newArr[i];
            let newArray = newArr[i + 1];
            newArr.splice(i, 1, newArray);
            newArr.splice(i + 1, 1, oldArray);
            return sorter(newArr)
          }
        }
      }
      return newArr;
    }
    axios.get('/leaderboard')
      .then((data) => {
        this.setState({ scores: data.data })
      })
  }

  onIdChange() {
    var value = document.getElementById("formBasicId").value;
    this.setState({ currentId: value })
  }

  onPassChange() {
    var value = document.getElementById("formBasicPass").value;
    this.setState({ currentPass: value })
  }

  onPassDupeChange() {
    var value = document.getElementById("formBasicPassDupe").value;
    this.setState({ currentPassDupe: value })
  }

  onFormChange() {
    var nameValue = document.getElementById("formBasicSearch").value;
    this.setState({ visitForm: nameValue })
  }

  onFormSubmit() {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.visitForm}&key=${key.key}`)
      .then((data) => {
        this.setState({
          currentCountry: data.data.results[0].formatted_address,
          lat: data.data.results[0].geometry.location.lat,
          long: data.data.results[0].geometry.location.lng
        })
      })
      .then(() => {
        var map1 = new google.maps.Map(document.getElementById("map"), {
          center: new google.maps.LatLng(this.state.lat, this.state.long),
          zoom: 11,
        });
      })
  }

  componentDidMount() {
    this.getLeaderboard();
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((api) => {
        this.setState({ countries: api.data }, () => {
          console.log(this.state.countries)
          let newObj = {}
          for (let i = 0; i < this.state.countries.length; i++) {
            newObj[this.state.countries[i].name] = {
              questions: ['', '', '', '', '', '', '', '', '', ''],
              answers: [[], [], [], [], [], [], [], [], [], []]
            }
          }
          console.log(newObj);
        })
      });
    axios.get('https://opentdb.com/api.php?amount=50&category=22')
      .then((data) => {
        this.setState({
          quizQuestions: data.data.results,
          currentQuestionObj: data.data.results[0],
          currentQuestion: data.data.results[0].question
        }, () => {
          for (let i = 0; i < 50; i++) {
            this.state.quizQuestions[i].userChoice = '';
          }
        })
      })
      .then(() => {
        this.state.quizQuestions.push({
          question: 'Submit Your Answers!',
          correct_answer: 'Submit',
          incorrect_answers: [' ']
        })
        this.setState({ populated: 'true' })
      })
  }

  onSubmit(answer) {
    let currentCount = this.state.questionCount;
    this.state.currentQuestionObj.userChoice = answer;
    if (this.state.questionCount < 50) {
      this.setState({
        questionCount: currentCount + 1
      }, () => {
        this.setState({
          currentQuestionObj: this.state.quizQuestions[this.state.questionCount],
          currentQuestion: this.state.quizQuestions[this.state.questionCount].question
        }, () => {
          if (this.state.questionCount === 50) {
            let finalCount = 0;
            for (let i = 0; i < this.state.quizQuestions.length; i++) {
              if (this.state.quizQuestions[i].correct_answer === this.state.quizQuestions[i].userChoice) {
                finalCount++
              }
            }
            this.setState({ correctAnswers: finalCount }, () => {
              if (this.state.loggedIn === true) {
                axios.put('/user', {
                  body: {
                    id: this.state.currentId,
                    score: this.state.correctAnswers,
                  }
                })
                  .then((data) => {
                    this.getLeaderboard();
                    this.setState({ correctAnswers: this.state.correctAnswers })
                  })
              }
            })
          }
        })
      })
    }
  }

  onClick() {
    let randomCountry = Math.floor(Math.random() * 250);
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.countries[randomCountry].name}&key=${key.key}`)
      .then((data) => {
        console.log(data);
        this.setState({
          currentCountry: data.data.results[0].formatted_address,
          lat: data.data.results[0].geometry.location.lat,
          long: data.data.results[0].geometry.location.lng
        })
      })
      .then(() => {
        var map1 = new google.maps.Map(document.getElementById("map"), {
          center: new google.maps.LatLng(this.state.lat, this.state.long),
          zoom: 5,
        });
      })
  }

  render() {
    if (this.state.loggedIn === true) {
      return (
        <div>
          <div className="loggedIn">
            <Row>
              <Alert className="logalert" key='alert' variant='primary'>
                Logged in as&nbsp;
            {this.state.currentId}
              </Alert>
              <Button id="button" className="logout" onClick={() => {
                this.setState({ loggedIn: false })
              }}>
                Log Out
            </Button>
            </Row>
          </div>
          <div className="countryName">
            <Alert key='alert' variant='primary'>
              {this.state.currentCountry}
            </Alert>
          </div>
          <div className="quizButton">
            <Quizzer
              questions={this.state.quizQuestions}
              onSubmit={this.onSubmit}
              question={this.state.currentQuestionObj}
              populated={this.state.populated}
              onAlert={this.onAlert}
              count={this.state.questionCount}
            />
            <SearchForm
              onFormChange={this.onFormChange}
              onFormSubmit={this.onFormSubmit}
            />
            <Button id="button" onClick={this.onClick}>Visit a random country!</Button>
            <Leaderboard
              data={this.state.scores}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="login">
            <Login
              onIdChange={this.onIdChange}
              onPassChange={this.onPassChange}
              onPassDupeChange={this.onPassDupeChange}
              onCreateSubmit={this.onCreateSubmit}
              onLoginSubmit={this.onLoginSubmit}
            />
          </div>
          <div className="countryName">
            <Alert key='alert' variant='primary'>
              {this.state.currentCountry}
            </Alert>
          </div>
          <div className="quizButton">
            <Quizzer
              questions={this.state.quizQuestions}
              onSubmit={this.onSubmit}
              question={this.state.currentQuestionObj}
              populated={this.state.populated}
              onAlert={this.onAlert}
              count={this.state.questionCount}
            />
            <SearchForm
              onFormChange={this.onFormChange}
              onFormSubmit={this.onFormSubmit}
            />
            <Button id="button" onClick={this.onClick}>Visit a random country!</Button>
            <Leaderboard
              data={this.state.scores}
            />
          </div>
        </div>
      )
    }
  }
}

export default App;
