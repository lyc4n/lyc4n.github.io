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
  render: function(){
    return(
      <div className='tictac-view'>
        {this.state.secondsRemaining}
      </div>)
  }
})
