import { newMockEvent } from 'matchstick-as';
import { ethereum, Bytes, Address, BigInt } from '@graphprotocol/graph-ts';
import {
  AttendeeConfirmed,
  NewEventCreated,
  NewRSVPcreated,
  UnclaimedDepositsWithdrawn,
} from '../generated/WeRsvp/WeRsvp';

export function createAttendeeConfirmedEvent(
  eventId: Bytes,
  registrantAddress: Address
): AttendeeConfirmed {
  let attendeeConfirmedEvent = changetype<AttendeeConfirmed>(newMockEvent());

  attendeeConfirmedEvent.parameters = new Array();

  attendeeConfirmedEvent.parameters.push(
    new ethereum.EventParam('eventId', ethereum.Value.fromFixedBytes(eventId))
  );
  attendeeConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      'registrantAddress',
      ethereum.Value.fromAddress(registrantAddress)
    )
  );

  return attendeeConfirmedEvent;
}

export function createNewEventCreatedEvent(
  eventId: Bytes,
  creatorAddress: Address,
  eventStartTimestamp: BigInt,
  eventEndTimestamp: BigInt,
  maxCapacity: BigInt,
  deposit: BigInt,
  eventDataCID: string
): NewEventCreated {
  let newEventCreatedEvent = changetype<NewEventCreated>(newMockEvent());

  newEventCreatedEvent.parameters = new Array();

  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam('eventId', ethereum.Value.fromFixedBytes(eventId))
  );
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'creatorAddress',
      ethereum.Value.fromAddress(creatorAddress)
    )
  );
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'eventStartTimestamp',
      ethereum.Value.fromUnsignedBigInt(eventStartTimestamp)
    )
  );
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'eventEndTimestamp',
      ethereum.Value.fromUnsignedBigInt(eventEndTimestamp)
    )
  );
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'maxCapacity',
      ethereum.Value.fromUnsignedBigInt(maxCapacity)
    )
  );
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'deposit',
      ethereum.Value.fromUnsignedBigInt(deposit)
    )
  );
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      'eventDataCID',
      ethereum.Value.fromString(eventDataCID)
    )
  );

  return newEventCreatedEvent;
}

export function createNewRSVPcreatedEvent(
  eventId: Bytes,
  registrantAddress: Address
): NewRSVPcreated {
  let newRsvPcreatedEvent = changetype<NewRSVPcreated>(newMockEvent());

  newRsvPcreatedEvent.parameters = new Array();

  newRsvPcreatedEvent.parameters.push(
    new ethereum.EventParam('eventId', ethereum.Value.fromFixedBytes(eventId))
  );
  newRsvPcreatedEvent.parameters.push(
    new ethereum.EventParam(
      'registrantAddress',
      ethereum.Value.fromAddress(registrantAddress)
    )
  );

  return newRsvPcreatedEvent;
}

export function createUnclaimedDepositsWithdrawnEvent(
  eventID: Bytes
): UnclaimedDepositsWithdrawn {
  let unclaimedDepositsWithdrawnEvent = changetype<UnclaimedDepositsWithdrawn>(
    newMockEvent()
  );

  unclaimedDepositsWithdrawnEvent.parameters = new Array();

  unclaimedDepositsWithdrawnEvent.parameters.push(
    new ethereum.EventParam('eventID', ethereum.Value.fromFixedBytes(eventID))
  );

  return unclaimedDepositsWithdrawnEvent;
}
