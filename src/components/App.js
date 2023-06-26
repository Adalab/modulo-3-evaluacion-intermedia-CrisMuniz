import { useEffect, useState } from 'react';
import '../styles/App.scss';

function App() {
  const [characterList, setCharacterList] = useState([]);
  const [quoteSeach, setQuoteSeach] = useState ('');
  const [char, setChar] = useState('');

useEffect(() => {
  fetch (
  'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
  )
  .then((response) =>response.json())
  .then((data) =>{
    setCharacterList(data)
  })
})
const handleInputSearch = (ev) => {
  setQuoteSeach(ev.target.value);
}
const handleChar = (ev) => {
  if (ev.target.value === 'todos') {
    setChar('')
  }else{
  setChar(ev.target.value)
}
}
const renderCharacterList = () => {
  const filteredList = characterList.filter((eachItem) =>
  eachItem.quote.toLowerCase().includes(quoteSeach.toLocaleLowerCase()) &&
  eachItem.character.includes(char))
  return filteredList.map((eachCharacter) => (
    <li className='list'>
    <p>{eachCharacter.quote}</p>
    <label htmlFor="" className='name'>{eachCharacter.character}</label>
  </li>
  ))
};


  return (
    <div>
   <h1 className='title'>Frases De Friends</h1>
   <header>
    <form action="">
      <label htmlFor="">Filtrar por Frase</label>
      <input type="text" name='search' value={quoteSeach} onInput={handleInputSearch}/>
      <label htmlFor="">Filtrar por personaje</label>
      <select name="char" id="char" onChange={handleChar}>
        <option value="todos">todos</option>
        <option value="Ross">Ross</option>
        <option value="Monica">Monica</option>
        <option value="Joey">Joey</option>
        <option value="Phoebe">Phoebe</option>
        <option value="Chandler">Chandler</option>
        <option value="Rachel">Rachel</option>
      </select>
    </form>
   </header>
   <main>
    <ul className='ListCharacter'>
     {renderCharacterList()}
    </ul>
   </main>
    </div>
  );
}

export default App;
