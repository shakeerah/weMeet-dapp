import { useState } from "react";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import connectContract from "../../utils/connectContract";
import Alert from "../../components/Alert";
import Loader from "../../components/Loader";

import Head from "next/head";
import { gql } from "@apollo/client";
import apolloClient from "../../apollo-client";

import {
  EmojiHappyIcon,
  TicketIcon,
  UsersIcon,
  LinkIcon,
} from "@heroicons/react/outline";
import formatTimeStamp from "../../utils/formatTimestamp";
import Image from "next/image";

function Event({ event }) {
  console.log("EVENT details:", event);
  const { data: account } = useAccount();
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [currentTimestamp, setEventTimestamp] = useState(new Date().getTime());

  function checkIfAlreadyRSVPed() {
    if (account) {
      for (let i = 0; i < event.rsvps.length; i++) {
        const thisAccount = account.address.toLowerCase();
        if (event.rsvps[i].registrant.id.toLowerCase() == thisAccount) {
          return true;
        }
      }
    }
    return false;
  }

  const newRSVP = async () => {
    try {
      const weRSVPContract = connectContract();
      if (weRSVPContract) {
        const trx = await weRSVPContract.createNewRsvp(event.eventId, {
          value: event.deposit,
          gasLimit: 300000,
        });
        setLoading(true);
        console.log("Minting...", trx.hash);

        await trx.wait();
        console.log("Minted -- ", trx.hash);

        setSuccess(true);
        setLoading(false);
        setMessage("You have successfully registered your RSVP");
      } else {
        setMessage("Error getting Contract");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: Event details by Id line:64 ~ newRSVP ~ error",
        error
      );
      setSuccess(false);
      setLoading(false);
      setMessage("Failed to register your RSVP.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{event ? event.name : ""} | WeRSVP</title>
        <meta name="description" content={event ? event.name : ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {event && (
        <section className="relative py-12">
          {loading && (
            <Alert
              alertType={"loading"}
              alertBody={"Please Wait"}
              triggerAlert={true}
              color={"white"}
            />
          )}

          {loading && <Loader />}

          {success && (
            <Alert
              alertType={"success"}
              alertBody={message}
              triggerAlert={true}
              color={"palegreen"}
            />
          )}
          {success === false && (
            <Alert
              alertType={"failed"}
              alertBody={message}
              triggerAlert={true}
              color={"palevioletred"}
            />
          )}
          <h6 className="mb-2">
            From{" "}
            <span className="text-indigo-500">
              <em> {formatTimeStamp(event.eventStartTimestamp)} </em>
            </span>{" "}
            To{" "}
            <span className="text-orange-500">
              <em>{formatTimeStamp(event.eventEndTimestamp)} </em>
            </span>{" "}
          </h6>
          <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl mb-6 lg:mb-12">
            {event.name} _
          </h1>
          <div className="flex flex-wrap-reverse lg:flex-nowrap">
            <div className="w-full pr-0 lg:pr-24 xl:pr-32">
              <div className="mb-8 w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-200 focus-within:ring-indigo-500 overflow-hidden">
                {event.imageUrl && (
                  <Image
                    src="{event.imageUrl}"
                    alt="{event.name}"
                    layout="fill"
                  />
                )}
              </div>
              <p>{event.description}</p>
            </div>
            <div className="max-w-xs w-full flex flex-col gap-4 mb-6 lg:mb-0">
              {event.eventEndTimestamp > currentTimestamp ? (
                <div>
                  {account ? (
                    checkIfAlreadyRSVPed() ? (
                      <>
                        <span className="w-full text-center px-6 py-3 text-base font-medium rounded-full text-teal-800 bg-teal-100">
                          You have RSVPed! 🙌
                        </span>
                        <div className="flex item-center">
                          <LinkIcon className="w-6 mr-2 text-indigo-800" />
                          <a
                            className="text-indigo-800 truncate hover:underline"
                            href={event.link}
                          >
                            {event.link}
                          </a>
                        </div>
                      </>
                    ) : (
                      <button
                        type="button"
                        className="items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={newRSVP}
                      >
                        RSVP for {ethers.utils.formatEther(event.deposit)} Matic
                      </button>
                    )
                  ) : (
                    <ConnectButton />
                  )}
                  <div className="flex item-center mt-6">
                    <UsersIcon className="w-6 mr-2" />
                    <span className="truncate">
                      {event.totalRSVPs}/{event.maxCapacity} Attending
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="w-full text-center px-6 py-3 ext-base font-medium rounded-full border-2 border-gray-200">
                    Event has ended
                  </span>
                  <div className="flex item-center mt-6">
                    <UsersIcon className="w-6 mr-2" />
                    <span className="truncate">
                      {event.totalRSVPs}/{event.maxCapacity} Attended
                    </span>
                  </div>
                </div>
              )}

              <div className="flex item-center">
                <TicketIcon className="w-6 mr-2" />
                <span className="truncate">1 RSVP per wallet</span>
              </div>
              <div className="flex items-center">
                <EmojiHappyIcon className="w-10 mr-2" />
                <span className="truncate">
                  Hosted by{" "}
                  <a
                    className="text-indigo-800 truncate hover:underline"
                    href={`${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}/address/${event.eventOwner}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {event.eventOwner}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
      {!event && (
        <section className="flex flex-col items-start py-8">
          <div>
            <p className="mb-4">Event Details not found</p>
          </div>
        </section>
      )}
    </div>
  );
}

export default Event;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data } = await apolloClient.query({
    query: gql`
      query Event($id: String!) {
        event(id: $id) {
          id
          eventId
          name
          description
          link
          eventOwner
          eventStartTimestamp
          eventEndTimestamp
          maxCapacity
          deposit
          totalConfirmedAttendees
          totalRSVPs
          imageUrl
          rsvps {
            id
            registrant {
              id
            }
          }
        }
      }
    `,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      event: data.event,
    },
  };
}
