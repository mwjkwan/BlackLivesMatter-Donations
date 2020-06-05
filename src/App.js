/** @jsx jsx */
import {jsx, Grid, Image, ThemeProvider, Styled} from 'theme-ui'
import {Component} from 'react'
import Container from './components/container'
import DonationFeed from './components/donation-feed'
import Infographic from './components/infographic'
import StripeWidget from './components/stripe-widget'
import Letter from './components/letter'
import logo from './assets/coverphoto.png'
import theme from './theme/theme'
import axios from 'axios'
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(
    (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'pk_test_51Gq5wjJc2RVGxWcmaTBLLw5usbhRGbZpxFxZ0JCJ7cWDvXFGtDgpqrY3JIN58leIkXIwusTPSQ0Y98O3ruVgqhyU003Vj78K03' : "pk_live_DtVsIuGEFoLA3JGhOP1ncltc0056GzeT0g"
);

class App extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            donations: {}
        }
    }

    componentDidMount() {
        axios.get(`https://us-central1-harker-blm.cloudfunctions.net/api/donations`)
            .then(json => this.setState({donations: json.data, loading: false}))
            .catch(error => console.log('Error:', error));
    }

    render() {
        const {donations, loading} = this.state
        const recentDonations = loading
            ? []
            : donations.donations.sort((a, b) => b.date - a.date);

        return (
            // Wrap the entire webapp in Stripe element
            // Stripe needs access to all the DOMs for "fraud prevention"...
            <Elements stripe={stripePromise}>
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
                                maxHeight: ['5em', '12em'],
                            }}
                        />
                    </div>
                    <Container id='info'>
                        <Grid
                            gap={5}
                            columns={[1, '1fr 3fr']}
                            padding={['2em']}
                        >
                            <div sx={{display: ['none', 'initial'], maxHeight: '120vh', overflow: 'scroll'}}>
                                <DonationFeed loading={loading} donations={recentDonations}/>
                            </div>
                            <div
                                sx={{
                                    paddingLeft: ['0em', '3em'],
                                    borderLeft: ['none', '1px solid #396C4B !important']
                                }}
                            >
                                <Infographic loading={loading} total={donations.total} count={donations.count || {}}/>
                                <Letter/>
                                <Styled.h3>Join our efforts and make a change. Donate today. </Styled.h3>
                                <hr/>
                                <ElementsConsumer>
                                    {({elements, stripe}) => (
                                        <StripeWidget elements={elements} stripe={stripe}/>
                                    )}
                                </ElementsConsumer>
                                <Styled.p
                                    style={{
                                        'color': '#303030',
                                        'font-size': '10px'
                                    }}
                                    mt={2}
                                >
                                    While we are directing 100% of our proceeds to charties, we are not a registered
                                    charity with the IRS and therefore cannot provide you with an official tax receipt.
                                    We use <Styled.a href="https://stripe.com/docs/security">Stripe</Styled.a> to
                                    process your payment. Your payment is secure.
                                    This website is ran by Harker alumni and we are not affiliated with The Harker
                                    School. Please direct your questions to <Styled.a
                                    href="mailto:HarkerBLM@gmail.com">HarkerBLM@gmail.com</Styled.a>.
                                </Styled.p>

                            </div>
                            <div sx={{display: ['initial', 'none']}}>
                                <DonationFeed loading={loading} donations={recentDonations}/>
                            </div>
                        </Grid>
                    </Container>
                </ThemeProvider>
            </Elements>
        );
    }
}

export default App;
