Tictac = window.App.Components.Tictac
window.LifeTimer = LifeTimer

class LifeTimer{
  constructor(dob, targetYearsOfExistence = 98){
    this.dob = moment(dob) // 'yyyy-mm-dd'
    this.dod = this.dob.clone().add(targetYearsOfExistence, 'y')
  }

  remaining(){
    return(this.remainingSeconds = this.dod.diff(moment(), 'seconds'))
  }
}

$(function(){
  main = document.getElementById('tic_tac-content')
  if(!main) return
  ReactDOM.render(<Tictac lifeTimer={new LifeTimer('1993-10-20')} />, main)
})
