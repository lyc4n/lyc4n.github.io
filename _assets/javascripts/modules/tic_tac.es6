Tictac = window.App.Components.Tictac

$(function(){
  main = document.getElementById('tic_tac-content')
  if(!main) return
  ReactDOM.render(<Tictac />, main)
})
