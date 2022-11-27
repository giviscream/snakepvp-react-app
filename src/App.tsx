import './App.css';
import Board from './components/gameElements/board/Board';


function App() {
  return (
    <div className="App">
      <Board width={1000} height={800} />
    </div>
  );
}

export default App;
