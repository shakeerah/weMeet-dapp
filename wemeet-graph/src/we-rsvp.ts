import { Address, ipfs, json } from '@graphprotocol/graph-ts';

import {
  AttendeeConfirmed as AttendeeConfirmedEvent,
  NewEventCreated as NewEventCreatedEvent,
  NewRSVPcreated as NewRSVPcreatedEvent,
  UnclaimedDepositsWithdrawn as UnclaimedDepositsWithdrawnEvent,
} from '../generated/WeRsvp/WeRsvp';

import {
  Account,
  RSVP,
  Confirmation,
  Event,
} from '../generated/schema';

import { integer } from '@protofire/subgraph-toolkit';

export function handleNewEventCreated(event: NewEventCreatedEvent): void {
  let newEvent = Event.load(event.params.eventId.toHex());
  if (newEvent == null) {
    newEvent = new Event(event.params.eventId.toHex());
    newEvent.eventId = event.params.eventId;
    newEvent.eventOwner = event.params.creatorAddress;
    newEvent.eventStartTimestamp = event.params.eventStartTimestamp;
    newEvent.eventEndTimestamp = event.params.eventEndTimestamp;
    newEvent.maxCapacity = event.params.maxCapacity;
    newEvent.deposit = event.params.deposit;
    newEvent.refundPaidOut = false;
    newEvent.totalConfirmedAttendees = integer.ZERO;
    newEvent.totalRSVPs = integer.ZERO;

    let metadata = ipfs.cat(event.params.eventDataCID + '/data.json');

    if (metadata) {
      const value = json.fromBytes(metadata).toObject();
      if (value) {
        const name = value.get('name');
        const description = value.get('description');
        const link = value.get('link');
        const imagePath = value.get('image');

        if (name) {
          newEvent.name = name.toString();
        }
        if (description) {
          newEvent.description = description.toString();
        }
        if (link) {
          newEvent.link = link.toString();
        }
        if (imagePath) {
          const ImageUrl =
            'https://ipfs.io/ipfs' +
            event.params.eventDataCID +
            imagePath.toString();
          newEvent.imageUrl = ImageUrl;
        } else {
          const fallbackUrl =
            'https://ipfs.io/ipfs/bafybeibssbrlptcefbqfh4vpw2wlmqfj2kgxt3nil4yujxbmdznau3t5wi/event.png';
          newEvent.imageUrl = fallbackUrl;
        }
      }
    }

    newEvent.save();
  }

}

function getOrCreateAccount(address: Address): Account {
  let account = Account.load(address.toHex());
  if (account == null) {
    account = new Account(address.toHex());
    account.totalRSVPs = integer.ZERO;
    account.totalAttendedEvent = integer.ZERO;
    account.save();
  }

  return account;
}

export function handleNewRSVPcreated(event: NewRSVPcreatedEvent): void {
  let id =
    event.params.eventId.toHex() + event.params.registrantAddress.toHex();
  let newRSVP = RSVP.load(id);

  let account = getOrCreateAccount(event.params.registrantAddress);
  let thisEvent = Event.load(event.params.eventId.toHex());

  if (newRSVP == null && thisEvent != null) {
    newRSVP = new RSVP(id);
    newRSVP.event = thisEvent.id;
    newRSVP.attendee = account.id;
    newRSVP.save();

    thisEvent.totalRSVPs = integer.increment(thisEvent.totalRSVPs);
    thisEvent.save();

    account.totalRSVPs = integer.increment(account.totalRSVPs);
    account.save();
  }

}

export function handleAttendeeConfirmed(event: AttendeeConfirmedEvent): void {
  let id = event.params.eventId.toHex() + event.params.registrantAddress.toHex()
  let newConfirmation = Confirmation.load(id)
  let account = getOrCreateAccount(event.params.registrantAddress)
  let thisEvent = Event.load(event.params.eventId.toHex())

  if (newConfirmation == null && thisEvent != null) {
      newConfirmation = new Confirmation(id)
      newConfirmation.event = thisEvent.id
      newConfirmation.attendee = account.id
      newConfirmation.save()

      thisEvent.totalConfirmedAttendees = integer.increment(thisEvent.totalConfirmedAttendees)
      thisEvent.save()

      account.totalAttendedEvent = integer.increment(account.totalAttendedEvent)
      account.save()
  } 
}

export function handleUnclaimedDepositsWithdrawn(
  event: UnclaimedDepositsWithdrawnEvent
): void {

  let thisEvent = Event.load(event.params.eventID.toHex())
  if (thisEvent) {
    thisEvent.refundPaidOut = true
    thisEvent.save()
  }
}
