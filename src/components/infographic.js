/** @jsx jsx */
import { jsx, Styled, Text } from 'theme-ui'
import CountUp from 'react-countup';

const Infographic = ({loading, total, count }) => {
  return (
    <div>
      <Styled.h1 sx={{ margin: '0px' }}>
        $
        { loading
          ? <CountUp start={0} end={1000} delay={0} />
          : <CountUp start={1000} end={total} delay={0} />
        }
      </Styled.h1>
      <Styled.p sx={{ marginTop: '0.25em', fontSize: 3 }}>
        {'donated to '}
        <Styled.a target='_blank' href='https://blacklivesmatter.com/'>Black Lives Matter</Styled.a>
        {', '}
        <Styled.a target='_blank' href='https://bailproject.org/'>The Bail Project</Styled.a>
        {', and '}
        <Styled.a target='_blank' href='https://www.joincampaignzero.org/'>Campaign Zero.</Styled.a>
      </Styled.p>
      <Text variant='infographic'><b>{count.student}</b>{` student and alumni contributions`}</Text>
      <Text variant='infographic'><b>{count.faculty}</b>{` faculty contributions`}</Text>
      <Text variant='infographic'><b>{count.parent}</b>{` parent contributions`}</Text>
      <Text variant='infographic'><b>{count.community}</b>{` community contributions`}</Text>
      <br />
      <Styled.h3><Styled.a target='_blank' href='https://bit.ly/harkerblm'>Resources for allyship</Styled.a></Styled.h3>
      <br />
    </div>
  )
}

export default Infographic
