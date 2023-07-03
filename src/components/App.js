import { useEffect, useState } from "react";
import "../styles/App.scss";

function App() {
  const [characterList, setCharacterList] = useState([]);
  const [quoteSeach, setQuoteSeach] = useState("");
  const [char, setChar] = useState("");
  const [newQuote, setNewQuote] = useState({});

  useEffect(() => {
    fetch(
      "https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setCharacterList(data);
      });
  }, []);
  const handleInputSearch = (ev) => {
    setQuoteSeach(ev.target.value);
  };
  const handleChar = (ev) => {
    if (ev.target.value === "todos") {
      setChar("");
    } else {
      setChar(ev.target.value);
    }
  };
  const handleNewQuote = (ev) => {
    setNewQuote({ ...newQuote, [ev.target.name]: ev.target.value });
  };
  const handleClick = (ev) => {
    ev.preventDefault();
    setCharacterList([...characterList, newQuote]);
    setNewQuote({
      quote: "",
      character: "",
    });
  };
  const renderCharacterList = () => {
    const filteredList = characterList.filter(
      (eachItem) =>
        eachItem.quote.toLowerCase().includes(quoteSeach.toLocaleLowerCase()) &&
        eachItem.character.includes(char)
    );
    return filteredList.map((eachCharacter, index) => (
      <li className="list" key={index}>
        <p>{eachCharacter.quote}</p>
        <label htmlFor="" className="name">
          {eachCharacter.character}
        </label>
      </li>
    ));
  };

  return (
    <div>
      <header>
        <h1 className="title">Frases De Friends</h1>
        <form action="">
          <label htmlFor="">
            Filtrar por Frase
            <input
              type="text"
              name="search"
              value={quoteSeach}
              onInput={handleInputSearch}
            />
          </label>
          <label htmlFor="">
            Filtrar por personaje
            <select name="char" id="char" value={char} onChange={handleChar}>
              <option value="todos">todos</option>
              <option value="Ross">Ross</option>
              <option value="Monica">Monica</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Chandler">Chandler</option>
              <option value="Rachel">Rachel</option>
            </select>
          </label>
        </form>
      </header>
      <main>
        <ul className="ListCharacter">{renderCharacterList()}</ul>
        <form action="">
          <label htmlFor="">
            Frase:
            <input
              type="text"
              name="quote"
              value={newQuote.quote}
              onInput={handleNewQuote}
            />
          </label>
          <label htmlFor="">
            <input
              type="text"
              name="character"
              value={newQuote.character}
              onInput={handleNewQuote}
            />
          </label>
          <button onClick={handleClick}>Añadir la nueva frase</button>
        </form>
      </main>
    </div>
  );
}

export default App;
