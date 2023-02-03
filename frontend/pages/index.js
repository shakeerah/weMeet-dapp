import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import EventCard from "../components/EventCard";
import Loader from '../components/Loader';

import Landing from "../components/Landing";

const UpcomingEvent = gql`
  query Events($currentTimestamp: String) {
    events(where: { eventStartTimestamp_gt: $currentTimestamp }) {
      id
      name
      eventStartTimestamp
      eventEndTimestamp
      imageUrl
    }
  }
`;

export default function Home() {
  const [currentTimestamp, setEventStartTimestamp] = useState(
    new Date().getTime().toString()
  );

  const { loading, error, data } = useQuery(UpcomingEvent, {
    variables: { currentTimestamp },
  });

  if (loading) {
    return (
      <Landing>
        <Loader />
      </Landing>
    );
  }

  if (error) {
    console.log("🚀 ~ file: index.js:38 ~ Home ~ error", error);
    return (
      <Landing>
        {/* <p>`Error: $(error.message)`</p> */}
        <p>`Error! ${error.message}`</p>
      </Landing>
    );
  }


  return (
    <Landing>
      {!data.events.length && <p>No Up coming Events </p>}
      {data.events.length && <p className="my-2 bold"> Up coming Events </p>}

      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {data &&
          data.events.length &&
          data.events.map((event) => (
            <li key={event.id}>
              
              <EventCard
                eventId={event.id}
                name={event.name}
                eventStartTimeStamp={event.eventStartTimestamp}
                eventEndTimeStamp={event.eventEndTimestamp}
                imageURL={event.imageURL}
              />
            </li>
          ))}
      </ul>
    </Landing>
  );
}
