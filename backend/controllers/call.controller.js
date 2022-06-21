const Call = require('../models/call.model');

const storeCall = async(call)=>{
    const newCall = new Call(call);
    try{
        newCall.save();
        return newCall
    }catch(e){
        console.log(e)
    }
};

const getParticipantCalls = async(id)=>{
    try{
        const calls = await Call.find({participants: {$elemMatch: {participant_id:id}}})
        console.log(id)
        console.log("calls: ",calls)
        return calls
    }catch(e){
        console.log(e)
    }
}

module.exports= {storeCall, getParticipantCalls}