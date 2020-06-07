/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const Letter = () => {
  return (
    <div>
      <Styled.p>Dear Harker students, alumni, and families,</Styled.p>
      <Styled.p>
        {'In light of explicit police brutality and racial injustice, we are starting a fundraiser to support Black solidarity organizations. '}
        {'Donations'}
        {' will be split equally between '}
        <Styled.a target='_blank' href='https://blacklivesmatter.com/'>Black Lives Matter</Styled.a>
        {', '}
        <Styled.a target='_blank' href='https://bailproject.org/'>The Bail Project</Styled.a>
        {', and '}
        <Styled.a target='_blank' href='https://www.eji.org/'>Equal Justice Initiative.</Styled.a>
        {' Black Lives Matter drives the cultural movement for Black justice, The Bail Project combats mass incarceration, and Equal Justice Initiative '}
        {'challenges racial and economic injustice through public education and criminal justice reform.'}
      </Styled.p>
      <Styled.p>If you'd like to spread awareness about this fundraiser, here is the <Styled.a target='_blank' href='https://www.facebook.com/events/273772077332886'>Facebook event.</Styled.a></Styled.p>
      <Styled.p>Please also read the <Styled.a target='_blank' href='https://bit.ly/harkerblm'>educational resources</Styled.a> to help you learn, protest, and use your voice to help others do the same.</Styled.p>
      <Styled.p>You can either Venmo your donation to <Styled.a target='_blank' href='https://venmo.com/harkerblm'>@HarkerBLM</Styled.a> or donate below.</Styled.p>
      <Styled.p>Thank you for supporting these worthy causes.</Styled.p>
      <Styled.p
        sx={{
          fontSize: 0,
          color: '#111111 !important',
          mt: 2,
        }}
      >
          * The Harker Black Solidarity Fundraiser is dedicated to supporting the Black community in a way that is informed by BIPOC leaders across the country.
          As Campaign Zero has received criticism for its data analysis and the implications of its #8CantWait campaign, we decided to redirect those funds
          to the Equal Justice Initiative, which provides legal support to those who have been illegally convicted, unfairly
          sentenced, or abused in jails and prisons. If you would like us to refund your donation either in part or in full, please email us at
          <Styled.a href="mailto:HarkerBLM@gmail.com"> HarkerBLM@gmail.com</Styled.a>.
      </Styled.p>
    </div>
  )
}

export default Letter
