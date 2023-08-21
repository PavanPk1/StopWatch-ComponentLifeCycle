import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
}

class Stopwatch extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickStopBtn = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
    })
  }

  incrementFunc = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onClickStartTimer = () => {
    this.intervalId = setInterval(this.incrementFunc, 1000)
    this.setState({
      isTimerRunning: true,
    })
  }

  renderTimerFormat = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)
    const seconds = Math.floor(timeElapsedInSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  render() {
    const {isTimerRunning} = this.state
    return (
      <div className="app-container">
        <div className="stopwatch-container">
          <h1 className="stopwatch">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="image"
              />
              <h1 className="timer-title">Timer</h1>
            </div>
            <h1 className="stopwatch-timer">{this.renderTimerFormat()}</h1>
            <div className="timer-buttons">
              <button
                type="button"
                onClick={this.onClickStartTimer}
                className="start-button button"
                disabled={isTimerRunning}
              >
                Start
              </button>
              <button
                type="button"
                onClick={this.onClickStopBtn}
                className="stop-button button"
              >
                Stop
              </button>
              <button
                type="button"
                className="reset-button button"
                onClick={this.onResetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
