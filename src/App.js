import './App.css';
import Excel from './components/Excel';

function App() {
  let headers = localStorage.getItem('headers');
  let data = localStorage.getItem('data');

  if (!headers) {
    headers = ['Title', 'Year', 'Rating', 'Comments'];
    data = [['Red whine', '2021', '3', 'meh']];
  }
  return (
    <div>
      <Excel
        headers={headers}
        initialData={data}
      />
    </div>
  );
}

export default App;
