Tictac = window.App.Components.Tictac

class LifeTimer{
  constructor(dob, yearsOfExistence = 98){
    this.dob = moment(dob) // 'yyyy-mm-dd'
    this.dod = this.dob.clone().add(yearsOfExistence, 'y')
  }

  runningLog(){
    setInterval(
      () => this.logRemaining(),
      1000
    )
  }

  logRemaining(){
    remainingSeconds = this.dod.diff(moment(), 'seconds')
    console.log(`You have ${remainingSeconds} seconds left to live. Make the most out of it!`)
  }
}

window.LifeTimer = LifeTimer

$(function(){
  main = document.getElementById('tic_tac-content')
  if(!main) return
  ReactDOM.render(<Tictac />, main)
})
