/** @jsx jsx */
import {Alert, Box, Button, Grid, Input, jsx, Label, Radio, Spinner, Text} from 'theme-ui'
import {Component} from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import axios from 'axios'
import * as firebase from "firebase/app";
import 'firebase/analytics';

const StripeElement = (props) => {
    return (
        <div sx={{ textAlign: 'left' }}>
            <Label htmlFor='username'>Name</Label>
            <Text variant='small'>
              All donations will be anonymous; we just want to send you a thank-you note.
            </Text>
            <Input
                name='name'
                id='name'
                type="text"
                placeholder='Proud Eagle'
                onChange={props.handleChange}
                mb={3}
            />
            <Label htmlFor='username'>Email</Label>
            <Input
                name='email'
                id='email'
                type="email"
                placeholder='eagle@alumni.harker.org'
                onChange={props.handleChange}
                mb={3}
            />
            <Label
                mb={3}
            >
                Credit / Debit Card
            </Label>
            <CardElement
                options={{
                    style: {
                        base: {
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <Button mt={3} textAlign={'left'} disabled={props.disabled}>
                Donate
            </Button>
        </div>
    );
};

class StripeWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        const target = event.target;
        const value = target.name === 'isGoing' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        firebase.analytics().logEvent('form_changed_' + target.name);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        firebase.analytics().logEvent('donate_attempt', {
            amount: this.state.amount
        });

        const testmode = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

        if (this.state.disabled) {
            // Avoid duplicate charge
            return;
        }

        this.setState({
            disabled: true
        });

        if (!this.state.amount) {
            this.setState({
                error: 'Please enter a donation amount. ',
                disabled: false
            });
            firebase.analytics().logEvent('donate_failed_no_amount');
            return;
        }

        if (!this.state.email) {
            this.setState({
                error: 'Please enter your email so we can send you a receipt. We won\'t spam. ',
                disabled: false
            });
            firebase.analytics().logEvent('donate_failed_no_email', {
                amount: this.state.amount
            });
            return;
        }

        if (!this.state.name) {
            this.setState({
                error: 'Please enter your name. ',
                disabled: false
            });
            firebase.analytics().logEvent('donate_failed_no_name', {
                amount: this.state.amount
            });
            return;
        }


        if (!this.state.affiliation) {
            // Allow fallback affiliation
            this.setState({
                affiliation: 'COMMUNITY'
            });
            firebase.analytics().logEvent('donate_no_affiliation_fallback', {
                amount: this.state.amount
            });
        }


        const {stripe, elements} = this.props;
        if (!stripe || !elements) {
            this.setState({
                error: 'Page is still loading. Please try again. ',
                disabled: false
            });
            firebase.analytics().logEvent('donate_failed_no_stripe', {
                amount: this.state.amount
            });
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: this.state.name,
                email: this.state.email,
            }
        });

        if (error) {
            this.setState({
                error: error.message,
                disabled: false
            });
            firebase.analytics().logEvent('donate_failed_stripe_create_payment_method_failed', {
                amount: this.state.amount
            });
            return;
        }

        // Obtain payment intent
        let intentClientSecret;

        try {
            intentClientSecret = (await axios.post('https://us-central1-harker-blm.cloudfunctions.net/api/payment/stripe/intent', {
                email: this.state.email,
                name: this.state.name,
                amount: Number(this.state.amount) * 100,
                affiliation: this.state.affiliation,
                test: testmode
            })).data.clientSecret
        } catch (e) {
            this.setState({
                error: e.data.message,
                disabled: false
            });
            firebase.analytics().logEvent('donate_failed_obtain_payment_intent_failed', {
                amount: this.state.amount
            });
            return;
        }

        const {error: paymentError} = await stripe.confirmCardPayment(
            intentClientSecret,
            {
                payment_method: paymentMethod.id,
                receipt_email: this.state.email
            },
        );
        if (paymentError) {
            firebase.analytics().logEvent('donate_failed_stripe_capture_charge_failed', {
                amount: this.state.amount
            });
            this.setState({
                error: paymentError.message,
                disabled: false
            });
        } else {
            this.setState({
                error: false,
                disabled: false,
                success: true
            });
            firebase.analytics().logEvent('donate_succeed', {
                amount: this.state.amount
            });
        }

    };


    render() {
        return (
            <div
                sx={{
                    minWidth: '100%',
                    minHeight: '175px',
                    justifyContent: 'center',
                    margin: 'auto',
                    textAlign: 'center',
                }}
            >

                {this.state.success &&
                <Alert>
                    Thank you for your contributions! A receipt will be emailed to you shortly.
                </Alert>
                }

                {!this.state.success &&
                <Box as='form' onSubmit={this.handleSubmit}>
                    <Label htmlFor='username'>I can contribute </Label>
                    <Input
                        name='amount'
                        id='amount'
                        type="number"
                        min="0.01"
                        step="0.01"
                        mb={3}
                        placeholder='$50'
                        onChange={this.handleChange}
                    />
                    <Label htmlFor='username'>Harker Affiliation</Label>
                    <Grid mb={3} columns={['1fr 1fr 1fr', '1fr 1fr 1fr 1fr 1fr']}>
                        <Label>
                            <Radio name='affiliation' onChange={this.handleChange} value="STUDENT"/> Student
                        </Label>
                        <Label>
                            <Radio name='affiliation' onChange={this.handleChange} value="ALUMNI"/> Alum
                        </Label>
                        <Label>
                            <Radio name='affiliation' onChange={this.handleChange} value="FACULTY"/> Faculty
                        </Label>
                        <Label>
                            <Radio name='affiliation' onChange={this.handleChange} value="PARENT"/> Parent
                        </Label>
                        <Label>
                            <Radio name='affiliation' onChange={this.handleChange} value="COMMUNITY"/> Friend
                        </Label>
                    </Grid>

                    <StripeElement handleChange={this.handleChange} stripe={this.props.stripe}
                                   elements={this.props.elements} disabled={this.state.disabled}/>

                    {this.state.disabled &&
                    <div
                        mt={3}>
                        <Spinner/>
                    </div>
                    }
                    {this.state.error &&
                    <Alert
                        mt={3}
                    >
                        Error: {this.state.error}
                    </Alert>
                    }
                </Box>
                }

            </div>
        )
    }
}

export default StripeWidget
