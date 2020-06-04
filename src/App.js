/** @jsx jsx */
import { jsx, Image, Styled } from 'theme-ui'
import Container from './components/container'
import './App.css';
import logo from './assets/coverphoto.png'

function App() {
  return (
    <div>
      <div
        sx={{
          backgroundColor: '#040404',
          minHeight: ['5em', '15em'],
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0.5em',
        }}
      >
        <Image
          src={logo}
          sx={{
            maxHeight:['5em', '15em'],
          }}
        />
      </div>
      <Container>
        <h1>Hello?</h1>
        <h2>This is a secondary header</h2>
        Hello?
        Hi everyone
        <b>Hi</b>
        <p>Trying again</p>
      </Container>
    </div>
    
  );
}

export default App;
