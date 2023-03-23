import { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await axios.post(`http://localhost:5000/chat`);

    setOutput(response.data);
  };

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleInputChange} />
          <button type="submit">Submit</button>
        </form>
        {output && <div>{output}</div>}
      </div>
  );
}

export default App;