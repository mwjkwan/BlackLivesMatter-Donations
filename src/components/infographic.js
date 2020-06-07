/** @jsx jsx */
import { jsx, Styled, Text } from 'theme-ui'
import CountUp from 'react-countup';

const Infographic = ({loading, total, count }) => {
  const { student, faculty, parent, community } = count;
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
        {'total raised for '}
        <Styled.a target='_blank' href='https://blacklivesmatter.com/'>Black Lives Matter</Styled.a>
        {', '}
        <Styled.a target='_blank' href='https://bailproject.org/'>The Bail Project</Styled.a>
        {', and '}
        <Styled.a target='_blank' href='https://www.eji.org/'>Equal Justice Initiative.</Styled.a>
      </Styled.p>
      <Text variant='infographic'><b>{student}</b>{` student and alumni contribution${student === 1 ? '' : 's'}`}</Text>
      <Text variant='infographic'><b>{faculty}</b>{` faculty contribution${faculty === 1 ? '' : 's'}`}</Text>
      <Text variant='infographic'><b>{parent}</b>{` parent contribution${parent === 1 ? '' : 's'}`}</Text>
      <Text variant='infographic'><b>{community}</b>{` community contribution${community === 1 ? '' : 's'}`}</Text>
      <br />
      <Styled.h3>
        <Styled.a target='_blank' href='https://bit.ly/harkerblm'>Learn, petition, donate</Styled.a>
        {`   •   `}
        <Styled.a target='_blank' href='https://docs.google.com/document/d/1BRlF2_zhNe86SGgHa6-VlBO-QgirITwCTugSfKie5Fs'>How to be anti-racist</Styled.a> 
      </Styled.h3>
      <br />
    </div>
  )
}

export default Infographic
