import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from 'matchstick-as/assembly/index';
import { Bytes, Address, BigInt } from '@graphprotocol/graph-ts';
import { AttendeeConfirmed } from '../generated/schema';
import { AttendeeConfirmed as AttendeeConfirmedEvent } from '../generated/WeRsvp/WeRsvp';
import { handleAttendeeConfirmed } from '../src/we-rsvp';
import { createAttendeeConfirmedEvent } from './we-rsvp-utils';

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
  beforeAll(() => {
    let eventId = Bytes.fromI32(1234567890);
    let registrantAddress = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    );
    let newAttendeeConfirmedEvent = createAttendeeConfirmedEvent(
      eventId,
      registrantAddress
    );
    handleAttendeeConfirmed(newAttendeeConfirmedEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test('AttendeeConfirmed created and stored', () => {
    assert.entityCount('AttendeeConfirmed', 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      'AttendeeConfirmed',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'eventId',
      '1234567890'
    );
    assert.fieldEquals(
      'AttendeeConfirmed',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1',
      'registrantAddress',
      '0x0000000000000000000000000000000000000001'
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
