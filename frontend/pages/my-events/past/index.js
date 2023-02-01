import Dashboard from "../../../components/Dashboard";
import { useState } from "react";
import Link from "next/link"
import {gql, useQuery} from "@apollo/client"
import {  ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi";
import EventCard from "../../../components/EventCard";
import Loader from "../../../components/Loader";

const myPastEvents = gql `
query Event($eventOwner: String, $currentTimestamp: String) {
  events(where: {eventOwner: $eventOwner, eventEndTimestamp_lt: $currentTimestamp}){
    id
    eventId
    name
    description
    eventStartTimestamp
    eventEndTimestamp
    maxCapacity
    totalRSVPs
    imageUrl
  }
}
`

export default function MyPastEvents() {

const {data: account} = useAccount();
const eventOwner = account ? account.address.toLowerCase() : "";
const [currentTimestamp, setCurrentTimestamp] = useState(new Date().getTime().toString())

const {loading, error, data} = useQuery(myPastEvents, {
  variables: { eventOwner, currentTimestamp}
}) 
console.log('🚀 ~ file: index.js:34 ~ MyPastEvents ~ data', data)

if (loading) {
  return (
    <Dashboard page="events" isUpcoming={false}>
       <Loader />
    </Dashboard>
  );
}

if (error) {
  return (
    <Dashboard page="events" isUpcoming={false}>
      <p>Èrror: ${error.message}`</p>
    </Dashboard>
  );
}

  return (
    <Dashboard page="events" isUpcoming={false}>
      {account? (
        <div>
          {data && data.events.length == 0 && (<p>No Upcoming Event</p>) }
          {data && data.events.length > 0 && (
            <ul role="list"  className="grid grid-cols-2 gap-x-4 gap-y-8">
              {data.events.map((event)=>{
                return (<li key={event.id}>
                  <EventCard
                    eventId={event.id}
                    eventStartTimeStamp={event.eventStartTimestamp}
                    eventEndTimeStamp={event.eventEndTimestamp}
                    imageUR={event.imageUrl}
                   />

                   <Link href={`/my-event/past/${event.id}`}>
                      <a className="text-indigo-800 text-sm truncate hover:underline">Confirm attendees</a>
                    </Link>
                </li>)
              })}
            </ul>
          )}
        </div>
      ): (
        <div className="flex flex-col items-center py-8">
          <p className="mb-4">Please connect your wallet to view your events</p>
          <ConnectButton />
        </div>
      )}
    </Dashboard>
  );
}
