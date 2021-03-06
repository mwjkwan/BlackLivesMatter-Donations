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
import * as firebase from "firebase/app";
import 'firebase/analytics';

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

        firebase.initializeApp({
            apiKey: "AIzaSyC80M--JIgWxrCA2qTfYsCCPU1Ps2VAE6o",
            authDomain: "harker-blm-fabe8.firebaseapp.com",
            databaseURL: "https://harker-blm-fabe8.firebaseio.com",
            projectId: "harker-blm-fabe8",
            storageBucket: "harker-blm-fabe8.appspot.com",
            messagingSenderId: "907256557421",
            appId: "1:907256557421:web:adb73defb1c556c6073464",
            measurementId: "G-KWY4RB3VDY"
        });
        firebase.analytics();
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
                            gap={4}
                            columns={[1, '1fr 3fr']}
                            padding={['2em']}
                            maxWidth={'80%'}
                        >
                            <div sx={{display: ['none', 'initial'], maxHeight: '165vh', overflow: 'scroll'}}>
                                <DonationFeed loading={loading} donations={recentDonations}/>
                            </div>
                            <div
                                sx={{
                                    paddingLeft: ['0em', '3em'],
                                    borderLeft: ['none', '1px solid #396C4B !important'],
                                    maxWidth: '80vw',
                                }}
                            >
                                <Infographic loading={loading} total={donations.total} count={donations.count || {}}/>
                                <Letter/>
                                <br/><br />
                                <Styled.h3>Join our efforts and make a change. Donate today. </Styled.h3>
                                <hr/>
                                <ElementsConsumer>
                                    {({elements, stripe}) => (
                                        <StripeWidget elements={elements} stripe={stripe}/>
                                    )}
                                </ElementsConsumer>
                                <Styled.p
                                  sx={{
                                    fontSize: 0,
                                    color: '#111111 !important',
                                    mt: 2,
                                  }}
                                >
                                    Secure payment powered by <Styled.a href="https://stripe.com/docs/security">Stripe.</Styled.a>
                                    <br/><br />
                                    This fundraiser is managed by Harker alumni Aliesa Bahri '18, Gloria Guo '18, Melissa Kwan '18, and Johnny Wang '19
                                    and is unaffiliated with The Harker School. While we are directing 100% of our proceeds to charities, we are not a registered
                                    charity with the IRS and therefore cannot provide you with an official tax receipt.
                                    If you have questions or concerns, please email us at
                                    <Styled.a href="mailto:HarkerBLM@gmail.com"> HarkerBLM@gmail.com</Styled.a>.
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
