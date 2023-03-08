import { useEffect, useState } from 'react';
import KosmosItem from './components/KosmosItem';
//css
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  
  const fetchData = async () =>{
    try{
      const newData= await fetch('https://jsonplaceholder.typicode.com/photos').then(res=>res.json())
      setData(newData)
      setIsLoading(false)
    }
    catch(e){
      setError(true)
    }
  }
  
  useEffect(() => {
    if(data.length === 0) fetchData()
  }, [data])

  const EraseItem = (id) => {
    const newData= data.filter(item=> item.id !== id)
    setData(newData)
  }
  if (isLoading) return 'Loading...'
 
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="App">
      <header className="App-header">
        Challenge Kosmos
      </header>
      <main className='main'>
        {
          data.slice(0,5).map( (item )=> <KosmosItem {...item} key={item.id} EraseItem={EraseItem}/>)
        }
      </main>
    </div>
  );
}

export default App;
