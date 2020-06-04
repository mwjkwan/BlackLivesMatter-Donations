/** @jsx jsx */
import { jsx, Spinner, Styled } from 'theme-ui'
import { Component } from 'react'
import timeAgo from '../lib/utils'
 
class DonationFeed extends Component {

  renderDonation({affiliation, date, amount}, key){
    const affiliationMapping = {
      STUDENT: 'A student / alum',
      FACULTY: 'A faculty member',
      PARENT: 'A parent',
      COMMUNITY: 'A Harker community member'
    }
    return (
      <div
        id={`donation-${key}`}
        sx={{
          padding: ' 2em 0.2em 2em 0.4em',
          borderTop: '1px solid #396C4B !important'
        }}
      >
        {`${affiliationMapping[affiliation]} donated `}
        <b sx={{ color: 'primary' }}>${amount}</b>
        <Styled.p sx={{ fontSize: 1 }}>{timeAgo(date)}</Styled.p>
      </div>
    )
  }
 
  render() {
    const { donations, loading } = this.props;
    return (
      <div>
        <Styled.h4>CONTRIBUTIONS</Styled.h4>
        {loading
          ? <Spinner />
          : donations.map((item, key) =>
              this.renderDonation(item, key)
            )
        }
      </div>
    )
  }
}

export default DonationFeed