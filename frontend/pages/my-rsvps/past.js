import { useState } from 'react'
import {gql, useQuery} from '@apollo/client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import EventCard from '../../components/EventCard';

import Dashboard from "../../components/Dashboard";
import Loader from '../../components/Loader';

const PastEvent = gql `
  query Account ($id: String) {
      account(id: $id) {
        id
        rsvps {
          event {
            id
            name
            eventStartTimestamp
            eventEndTimestamp
            imageUrl
          }
        }
      }
  }
`

export default function MyPastRSVPs() {

  const {data: account} = useAccount()
  const id = account? account.address.toLowerCase(): ''
  const [currentTimestamp, setEventEndTimestamp] = useState(new Date().getTime())
  const { loading, error, data } = useQuery(PastEvent, {
    variables: {id}
  })
  

  if (loading) 
    return (
      <Dashboard page="rsvps" isUpcoming={false} >
         <Loader />
      </Dashboard>
    )

  if (error) {
    console.log('🚀 ~ file: upcoming.js:47 ~ MyUpcomingRSVPs ~ Error', Error)
    return (
      <Dashboard page="rsvps" isUpcoming={false}>
        <p>`Error:: ${error.message}`</p>
      </Dashboard>
    )
  }

  
  return (
    <Dashboard page="rsvps" isUpcoming={false}>
       { account ? (
        <div>
          {data && !data.account && (<p>No Past Event RSVPs found</p>)}

          {data && data.account && (
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              
              {data.account.rsvps.map((rsvp)=>{
                if (rsvp.event.eventEndTimestamp < currentTimestamp) {
                  return (
                    <li key={rsvp.event.id}>
                      <EventCard 
                        eventId={rsvp.event.id}
                        name={rsvp.event.name}
                        eventStartTimeStamp={rsvp.event.eventStartTimestamp}
                        eventEndTimeStamp={rsvp.event.eventEndTimestamp}
                        imageURL={rsvp.event.imageUrl}
                      />
                    </li>
                  )
                }
              })}
            </ul>
          )}
        </div>
      ) : (
        <div className='flex flex-col items-center py-8'>
          <p className='mb-4' >Please Connect your wallet to view your RSVPs</p>
          <ConnectButton />
        </div>
      ) }
    </Dashboard>
  );
}
