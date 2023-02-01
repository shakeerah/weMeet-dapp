// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AttendeeConfirmed extends ethereum.Event {
  get params(): AttendeeConfirmed__Params {
    return new AttendeeConfirmed__Params(this);
  }
}

export class AttendeeConfirmed__Params {
  _event: AttendeeConfirmed;

  constructor(event: AttendeeConfirmed) {
    this._event = event;
  }

  get eventId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get attendeeAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class CapturedError extends ethereum.Event {
  get params(): CapturedError__Params {
    return new CapturedError__Params(this);
  }
}

export class CapturedError__Params {
  _event: CapturedError;

  constructor(event: CapturedError) {
    this._event = event;
  }

  get errorCode(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get errorContext(): string {
    return this._event.parameters[1].value.toString();
  }

  get errorMessage(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class NewEventCreated extends ethereum.Event {
  get params(): NewEventCreated__Params {
    return new NewEventCreated__Params(this);
  }
}

export class NewEventCreated__Params {
  _event: NewEventCreated;

  constructor(event: NewEventCreated) {
    this._event = event;
  }

  get eventId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get creatorAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get eventStartTimestamp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get eventEndTimestamp(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get maxCapacity(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get deposit(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get eventDataCID(): string {
    return this._event.parameters[6].value.toString();
  }
}

export class NewRSVPcreated extends ethereum.Event {
  get params(): NewRSVPcreated__Params {
    return new NewRSVPcreated__Params(this);
  }
}

export class NewRSVPcreated__Params {
  _event: NewRSVPcreated;

  constructor(event: NewRSVPcreated) {
    this._event = event;
  }

  get eventId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get registrantAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class UnclaimedDepositsWithdrawn extends ethereum.Event {
  get params(): UnclaimedDepositsWithdrawn__Params {
    return new UnclaimedDepositsWithdrawn__Params(this);
  }
}

export class UnclaimedDepositsWithdrawn__Params {
  _event: UnclaimedDepositsWithdrawn;

  constructor(event: UnclaimedDepositsWithdrawn) {
    this._event = event;
  }

  get eventId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class WeRsvp__eventsMapResult {
  value0: Bytes;
  value1: string;
  value2: Address;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: BigInt;
  value7: boolean;

  constructor(
    value0: Bytes,
    value1: string,
    value2: Address,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: BigInt,
    value7: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytes(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromBoolean(this.value7));
    return map;
  }

  getEventId(): Bytes {
    return this.value0;
  }

  getEventDataCID(): string {
    return this.value1;
  }

  getEventOwner(): Address {
    return this.value2;
  }

  getEventStartTimestamp(): BigInt {
    return this.value3;
  }

  getEventEndTimestamp(): BigInt {
    return this.value4;
  }

  getDeposit(): BigInt {
    return this.value5;
  }

  getMaxCapacity(): BigInt {
    return this.value6;
  }

  getRefundPaidOut(): boolean {
    return this.value7;
  }
}

export class WeRsvp extends ethereum.SmartContract {
  static bind(address: Address): WeRsvp {
    return new WeRsvp("WeRsvp", address);
  }

  eventsMap(param0: Bytes): WeRsvp__eventsMapResult {
    let result = super.call(
      "eventsMap",
      "eventsMap(bytes32):(bytes32,string,address,uint256,uint256,uint256,uint256,bool)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return new WeRsvp__eventsMapResult(
      result[0].toBytes(),
      result[1].toString(),
      result[2].toAddress(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBigInt(),
      result[7].toBoolean()
    );
  }

  try_eventsMap(param0: Bytes): ethereum.CallResult<WeRsvp__eventsMapResult> {
    let result = super.tryCall(
      "eventsMap",
      "eventsMap(bytes32):(bytes32,string,address,uint256,uint256,uint256,uint256,bool)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new WeRsvp__eventsMapResult(
        value[0].toBytes(),
        value[1].toString(),
        value[2].toAddress(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBigInt(),
        value[7].toBoolean()
      )
    );
  }
}

export class ConfirmAllAttendeesCall extends ethereum.Call {
  get inputs(): ConfirmAllAttendeesCall__Inputs {
    return new ConfirmAllAttendeesCall__Inputs(this);
  }

  get outputs(): ConfirmAllAttendeesCall__Outputs {
    return new ConfirmAllAttendeesCall__Outputs(this);
  }
}

export class ConfirmAllAttendeesCall__Inputs {
  _call: ConfirmAllAttendeesCall;

  constructor(call: ConfirmAllAttendeesCall) {
    this._call = call;
  }

  get _eventId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class ConfirmAllAttendeesCall__Outputs {
  _call: ConfirmAllAttendeesCall;

  constructor(call: ConfirmAllAttendeesCall) {
    this._call = call;
  }
}

export class ConfirmAttendeeCall extends ethereum.Call {
  get inputs(): ConfirmAttendeeCall__Inputs {
    return new ConfirmAttendeeCall__Inputs(this);
  }

  get outputs(): ConfirmAttendeeCall__Outputs {
    return new ConfirmAttendeeCall__Outputs(this);
  }
}

export class ConfirmAttendeeCall__Inputs {
  _call: ConfirmAttendeeCall;

  constructor(call: ConfirmAttendeeCall) {
    this._call = call;
  }

  get _eventId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _attendee(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConfirmAttendeeCall__Outputs {
  _call: ConfirmAttendeeCall;

  constructor(call: ConfirmAttendeeCall) {
    this._call = call;
  }
}

export class CreateNewEventCall extends ethereum.Call {
  get inputs(): CreateNewEventCall__Inputs {
    return new CreateNewEventCall__Inputs(this);
  }

  get outputs(): CreateNewEventCall__Outputs {
    return new CreateNewEventCall__Outputs(this);
  }
}

export class CreateNewEventCall__Inputs {
  _call: CreateNewEventCall;

  constructor(call: CreateNewEventCall) {
    this._call = call;
  }

  get _eventStartTimestamp(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _eventEndTimestamp(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _deposit(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _maxCapacity(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _eventDataCID(): string {
    return this._call.inputValues[4].value.toString();
  }
}

export class CreateNewEventCall__Outputs {
  _call: CreateNewEventCall;

  constructor(call: CreateNewEventCall) {
    this._call = call;
  }
}

export class CreateNewRsvpCall extends ethereum.Call {
  get inputs(): CreateNewRsvpCall__Inputs {
    return new CreateNewRsvpCall__Inputs(this);
  }

  get outputs(): CreateNewRsvpCall__Outputs {
    return new CreateNewRsvpCall__Outputs(this);
  }
}

export class CreateNewRsvpCall__Inputs {
  _call: CreateNewRsvpCall;

  constructor(call: CreateNewRsvpCall) {
    this._call = call;
  }

  get _eventId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class CreateNewRsvpCall__Outputs {
  _call: CreateNewRsvpCall;

  constructor(call: CreateNewRsvpCall) {
    this._call = call;
  }
}

export class WithdrawUnclaimedDepositsCall extends ethereum.Call {
  get inputs(): WithdrawUnclaimedDepositsCall__Inputs {
    return new WithdrawUnclaimedDepositsCall__Inputs(this);
  }

  get outputs(): WithdrawUnclaimedDepositsCall__Outputs {
    return new WithdrawUnclaimedDepositsCall__Outputs(this);
  }
}

export class WithdrawUnclaimedDepositsCall__Inputs {
  _call: WithdrawUnclaimedDepositsCall;

  constructor(call: WithdrawUnclaimedDepositsCall) {
    this._call = call;
  }

  get _eventId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class WithdrawUnclaimedDepositsCall__Outputs {
  _call: WithdrawUnclaimedDepositsCall;

  constructor(call: WithdrawUnclaimedDepositsCall) {
    this._call = call;
  }
}
