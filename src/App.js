/** @jsx jsx */
import { jsx, Image, Grid, ThemeProvider, Styled } from 'theme-ui'
import { Component } from 'react'
import Container from './components/container'
import Infographic from './components/infographic'
import StripeWidget from './components/stripe-widget'
import Letter from './components/letter'
import logo from './assets/coverphoto.png'
import theme from './theme/theme'
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = { donations: {}}
  }

  componentDidMount() {
    axios.get(`https://us-central1-harker-blm.cloudfunctions.net/api/donations`)
      .then(json => this.setState({ donations: json.data }))
      .catch(error => console.log('Error:', error));
  }

  render() {
    const donations = this.state.donations
    return (
      <ThemeProvider theme={theme}>
        <div
          sx={{
            backgroundColor: '#040404',
            minHeight: ['5em', '12em'],
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0.5em',
          }}
        >
          <Image
            src={logo}
            sx={{
              maxHeight:['5em', '12em'],
            }}
          />
        </div>
        <Container>
          <Grid
            gap={5}
            columns={[1, '1fr 3fr']}
            padding={['2em']}
          >
            <div sx={{ paddingRight: ['0em', '3em'] }}>
              This is where other stuff goes
            </div>
            <div
              sx={{
                paddingLeft: ['0em', '3em'],
                borderLeft: ['none','1px solid #396C4B !important']
              }}
            >
              <Infographic total={donations.total || 2440} count={donations.count || {}}/>
              <StripeWidget />
              <Letter />
            </div>
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
