CountdownDigit = React.createClass({
  getInitialState: function(){
    return {changed: false}
  },
  animationEnded: function(e){
    this.setState({changed: false})
  },
  render: function(){
    addClass = this.state.changed ? 'flip-animate' : ''
    return(
      <span onAnimationEnd={this.animationEnded.bind(this)} className={`tic-tac-countdown-digit ${addClass}`}>
        {this.props.value}
      </span>
    )
  },
  componentWillUpdate: function(nextProps, nextState){
    if(nextProps.value != this.props.value){
      nextState.changed = true;
    }else{
      nextState.changed = false;
    }
  }
})

window.App.Components.Tictac = React.createClass({
  remaining: function(){
    return this.props.lifeTimer.remaining()
  },
  getInitialState: function(){
    return({secondsRemaining: this.remaining()})
  },
  componentDidMount: function(){
    setInterval(() => {
      this.setState({secondsRemaining: this.remaining()})
    }, 1000)
  },
  paddedTickString: function(){
    secondsRemaining = this.state.secondsRemaining.toString()
    padLength = 11 - secondsRemaining.length
    return  `${'0'.repeat(padLength)}${secondsRemaining}`
  },
  render: function(){

    countdownDigits = this.paddedTickString().split('').map((digit) => {
      return <CountdownDigit value={digit} />
    })

    return(
      <div className='tictac-view'>
        <div className='tictac-top-label'>Only</div>
        <div className='tic-tac-countdown'>
          { countdownDigits }
        </div>
        <div className='tictac-top-label'>
          <p>seconds left to <u><strong>get everything done</strong></u></p>
        </div>
      </div>)
  }
})
