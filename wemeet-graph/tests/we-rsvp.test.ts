import {
  assert,
  describe,
  test,
  beforeAll
} from 'matchstick-as/assembly/index';
import { Bytes, Address, BigInt } from '@graphprotocol/graph-ts';

import { handleNewEventCreated, handleCapturedError } from '../src/we-rsvp';
import { Event, Account, Error } from '../generated/schema';
import { NewEventCreated as NewEventCreatedEvent } from '../generated/WeRsvp/WeRsvp';

import { createNewEventCreatedEvent } from './we-rsvp-utils';

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
  beforeAll(() => {
    // let eventId = "0x93fa7c9346491abfd21678f8aa63198048c0a2d03d119abac2f656fe1354d037"//Bytes.fromI32(1234567890)
    let eventId = Bytes.fromI32(1234567890)
    let creatorAddress = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    )
    let eventStartTimestamp = BigInt.fromString("1672131660000")
    let eventEndTimestamp =  BigInt.fromString("1672214400000")
    let maxCapacity =  BigInt.fromString("20")
    let deposit =  BigInt.fromString("20000000000000000000")
    let eventDataCID = "bafybeicou6jnmwbcna7pd5vjqgkh3sm7w7lqkq4q5d4r77gfr6ighdxboa"

    let newNewEventCreatedEvent = createNewEventCreatedEvent(
      eventId,
      creatorAddress,
      eventStartTimestamp,
      eventEndTimestamp,
      maxCapacity,
      deposit,
      eventDataCID,
    );
    handleNewEventCreated(newNewEventCreatedEvent);
  });

  // afterAll(() => {
  //   clearStore();
  // });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test('NewEventCreated created and stored', () => {
    assert.entityCount('Event', 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      'NewEventCreated',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'eventId',
      '1234567890'
    );
    assert.fieldEquals(
      'NewEventCreated',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'registrantAddress',
      '0x0000000000000000000000000000000000000001'
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
