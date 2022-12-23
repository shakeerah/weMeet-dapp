import hre from "hardhat";

const main = async () => {
    const WeRSVPContractFactory = await hre.ethers.getContractFactory('WeRsvp');
    const WeRSVPContract = await WeRSVPContractFactory.deploy();
    await WeRSVPContract.deployed();
    console.log('🚀 ~ WeRSVP Contract deployed to : ', WeRSVPContract.address)

    const [deployer, user_1, user_2] = await hre.ethers.getSigners();
    console.log('🚀 ~ file: run.ts:10 ~ main ~ deployer', deployer.address)

    let eventName = 'someEvent'
    let deposit = hre.ethers.utils.parseEther("1");
    let maxCapacity = 5
    let eventStartTimestamp = Date.parse('2023/01/02')
    let eventEndTimestamp = Date.parse('2023/01/03')

    let eventDataCID = `${eventStartTimestamp}_${eventName}_${eventEndTimestamp}`

    let evtTrx = await WeRSVPContract.createNewEvent( eventStartTimestamp, eventEndTimestamp, deposit, maxCapacity, eventDataCID )
        
    let weMeetWait = await evtTrx.wait()
        console.log("NEW EVENT CREATED:", weMeetWait.events![0].event, weMeetWait.events![0].args);
        
    let eventId = weMeetWait.events![0].args!.eventId;
        console.log("EVENT ID:", eventId);

    let rsvpTrx_1 = await WeRSVPContract.createNewRsvp(eventId, {value: deposit})
    let weMeetRsvpWait = await rsvpTrx_1.wait()

    console.log('New RsvpWait Deployer', weMeetRsvpWait!.events![0].event, weMeetRsvpWait!.events![0].args)

    let rsvpTrx_2 = await WeRSVPContract
    .connect(user_1).createNewRsvp(eventId, {value: deposit})
     weMeetRsvpWait = await rsvpTrx_2.wait()
    console.log('New RsvpWait user_1', weMeetRsvpWait.events![0].event, weMeetRsvpWait.events![0].args)

    let rsvpTrx_3 = await WeRSVPContract
    .connect(user_2).createNewRsvp(eventId, {value: deposit})
     weMeetRsvpWait = await rsvpTrx_3.wait()
    console.log('New RsvpWait user_2', weMeetRsvpWait.events![0].event, weMeetRsvpWait.events![0].args)

    let cfmTrx =  await WeRSVPContract.confirmAllAttendees(eventId) 
    let weMeetCfmWait = await cfmTrx.wait()
    console.log(' confirmAllAttendees', weMeetCfmWait.events)

    await hre.network.provider.send("evm_increaseTime", [15778800000000])
    
    let wtdTrx =  await WeRSVPContract.withdrawUnclaimedDeposits(eventId)
    let weMeetWtdWait = await wtdTrx.wait()
    console.log(' withdrawUnclaimedDeposits', weMeetWtdWait.events)
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log('🚀 ~ file: run.ts:11 ~ runMain ~ error', error)
        process.exit(1)
    }
}

runMain();