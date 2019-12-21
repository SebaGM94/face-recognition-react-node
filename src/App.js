import React, { Component } from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Clarifai from 'clarifai'

const app = new Clarifai.App({ apiKey: '4f1b059f9c1e42ea8b8356acf6900f59' })

class App extends Component {
  constructor () {
    super()
    this.state = {
      input: '',
      imgSrc: '',
      box: {}
    }
    this.imgRef = React.createRef()
  }

  calculateLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box
    const width = this.imgRef.current.width
    const height = this.imgRef.current.height
    return {
      left: clarifaiFace.left_col * width,
      top: clarifaiFace.top_row * width,
      right: width - clarifaiFace.right_col * width,
      bottom: height - clarifaiFace.bottom_row * width
    }
  }

  displayFaceBox = box => {
    this.setState({ box })
  }

  onInputChange = e => {
    this.setState({
      input: e.target.value
    })
  }

  onButtonSubmit = () => {
    this.setState({ imgSrc: this.state.input })
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.displayFaceBox(this.calculateLocation(response)).catch(err =>
          console.log(err)
        )
      )
  }
  render () {
    return (
      <div className='App'>
        <Navigation />
        <Logo />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <Rank />
        <FaceRecognition
          box={this.state.box}
          imgRef={this.imgRef}
          imgSrc={this.state.imgSrc}
        />
      </div>
    )
  }
}

export default App
