import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import getRandomImage from "../utils/getRandomImage";
import { ethers } from "ethers";
import connectContract from "../utils/connectContract";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Alert from "../components/Alert";
import Loader from '../components/Loader';

export default function CreateEvent() {
  const { data: account } = useAccount();

  const [eventName, setEventName] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [refund, setRefund] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [eventId, setEventId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      name: eventName,
      description: eventDescription,
      link: eventLink,
      image: getRandomImage(),
    };
    try {
      const response = await fetch("/api/store-event-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status != 200) {
        alert("Oops!, Something went wrong. Please refresh and try again.");
      } else {
        console.log("Form Successfully submitted ", response);
        let responseJSON = await response.json();
        await createEvent(responseJSON.cid);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: create-event.js:42 ~ handleSubmit ~ error",
        error
      );
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    }
  }

  const createEvent = async (cid) => {
    try {
      const weRSVPContract = connectContract();
      if (weRSVPContract) {
        let deposit = ethers.utils.parseEther(refund);
        let eventStartDateTime = new Date(
          `${eventStartDate} ${eventStartTime}`
        );
        let eventStartTimestamp = eventStartDateTime.getTime();
        let eventEndDateTime = new Date(`${eventEndDate} ${eventEndTime}`);
        let eventEndTimestamp = eventEndDateTime.getTime();
        let eventDataCID = cid;

        const createEventTrx = await weRSVPContract.createNewEvent(
          eventStartTimestamp,
          eventEndTimestamp,
          deposit,
          maxCapacity,
          eventDataCID,
          { gasLimit: 900000 }
        );

        setLoading(true);
        console.log("Minting...", createEventTrx.hash);
        let wait = await createEventTrx.wait();
        console.log("Minted -- ", createEventTrx.hash);
        setEventId(wait.events[0].args[0]);
        setSuccess(true);
        setLoading(false);

        setMessage("Your Event has been created Successfully");
      } else {
        setSuccess(false);

        console.log("Error getting contract.");
        setMessage(`There was an error while creating your event`);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error getting contract.", error);
      setSuccess(false);
      setMessage(
        `There was an error while creating your event: ${error.message}`
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    // disable scroll on <input> elements of type number
    document.addEventListener("wheel", (event) => {
      if (document.activeElement.type === "number") {
        document.activeElement.blur();
      }
    });
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Create your event | WeRSVP</title>
        <meta
          name="description"
          content="Create your virtual event on the blockchain"
        />
      </Head>
      <section className="relative py-12">
        {loading && (
          <Alert
            alertType={"loading"}
            alertBody={"Please Wait"}
            triggerAlert={true}
            color={"white"}
          />
        )}

        {loading && (
            <Loader />
          )}

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

        {!success && (
          <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl mb-4">
            Create your virtual Event or Meeting
          </h1>
        )}

        {account && !success && (
          <section>
            <div>
              <form
                onSubmit={handleSubmit}
                className="space-y-8 divide-y divide-gray-200"
              >
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor="event-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Event name
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        id="event-name"
                        name="event-name"
                        type="text"
                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        required
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Start Date & time
                      <p className="mt-1 max-w-2xl text-sm text-gray-400">
                        Your event start date and time
                      </p>
                    </label>
                    <div className="mt-1 sm:mt-0 flex flex-wrap sm:flex-nowrap gap-2">
                      <div className="w-1/2">
                        <input
                          id="date"
                          name="date"
                          type="date"
                          className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"
                          required
                          value={eventStartDate}
                          onChange={(e) => setEventStartDate(e.target.value)}
                        />
                      </div>
                      <div className="w-1/2">
                        <input
                          id="time"
                          name="time"
                          type="time"
                          className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"
                          required
                          value={eventStartTime}
                          onChange={(e) => setEventStartTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      End Date & time
                      <p className="mt-1 max-w-2xl text-sm text-gray-400">
                        Your event end date and time
                      </p>
                    </label>

                    <div className="mt-1 sm:mt-0 flex flex-wrap sm:flex-nowrap gap-2">
                      <div className="w-1/2">
                        <input
                          id="date"
                          name="date"
                          type="date"
                          className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"
                          required
                          value={eventEndDate}
                          onChange={(e) => setEventEndDate(e.target.value)}
                        />
                      </div>
                      <div className="w-1/2">
                        <input
                          id="time"
                          name="time"
                          type="time"
                          className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"
                          required
                          value={eventEndTime}
                          onChange={(e) => setEventEndTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor="max-capacity"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Max capacity
                      <p className="mt-1 max-w-2xl text-sm text-gray-400">
                        Limit the number of spots available for your event.
                      </p>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="number"
                        name="max-capacity"
                        id="max-capacity"
                        min="1"
                        placeholder="100"
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"
                        value={maxCapacity}
                        onChange={(e) => setMaxCapacity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor="refundable-deposit"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Refundable deposit
                      <p className="mt-1 max-w-2xl text-sm text-gray-400">
                        Require a refundable deposit (in MATIC) to reserve one
                        spot at your event
                      </p>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="number"
                        name="refundable-deposit"
                        id="refundable-deposit"
                        min="0"
                        step="any"
                        inputMode="decimal"
                        placeholder="0.00"
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-gray-300 rounded-md"
                        value={refund}
                        onChange={(e) => setRefund(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor="event-link"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Event link
                      <p className="mt-1 max-w-2xl text-sm text-gray-400">
                        The link for your virtual event
                      </p>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        id="event-link"
                        name="event-link"
                        type="text"
                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        required
                        value={eventLink}
                        onChange={(e) => setEventLink(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Event description
                      <p className="mt-2 text-sm text-gray-400">
                        Let people know what your event is about!
                      </p>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <textarea
                        id="about"
                        name="about"
                        rows={10}
                        className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-5">
                  <div className="flex justify-end">
                    <Link href="/">
                      <a className="bg-white py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Cancel
                      </a>
                    </Link>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        )}

        {!account && (
          <section className="flex flex-col items-start py-8">
            <div>
              <p className="mb-4">
                Please connect your wallet to create events.
              </p>

              <ConnectButton />
            </div>
          </section>
        )}

        {success && eventId && (
          <div>
            <p>
              Success!. You can now check the status of your Event{" "}
              <span className="text-indigo-500">
                <Link href={`/event/${eventId}`}> Here</Link>
              </span>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
