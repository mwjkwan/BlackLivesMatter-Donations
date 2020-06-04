/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const Letter = () => {
  return (
    <div>
      <Styled.p>Dear Harker students, alumni, and families,</Styled.p>
      <Styled.p>
        {'In light of explicit police brutality and racial injustice, we are starting a fundraiser to support Black solidarity organizations. '}
        {'Donations to the Venmo account '}
        <Styled.a target='_blank' href='https://venmo.com/harkerblm'>@HarkerBLM</Styled.a>
        {' will be split equally between '}
        <Styled.a target='_blank' href='https://blacklivesmatter.com/'>Black Lives Matter</Styled.a>
        {', '}
        <Styled.a target='_blank' href='https://bailproject.org/'>The Bail Project</Styled.a>
        {', and '}
        <Styled.a target='_blank' href='https://www.joincampaignzero.org/'>Campaign Zero.</Styled.a>
        {'Black Lives Matter drives the cultural movement for Black justice, The Bail Project combats mass incarceration, and Campaign Zero '}
        {'researches policy solutions to end police brutality.'}
      </Styled.p>
      <Styled.p>Here are more <Styled.a target='_blank' href='https://bit.ly/harkerblm'>educational resources</Styled.a> to help you learn, protest, and use your voice to help others do the same.</Styled.p>
      <Styled.p>Thank you for supporting these worthy causes.</Styled.p>
    </div>
  )
}

export default Letter
