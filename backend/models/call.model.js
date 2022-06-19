const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    participant_username: {type: String, required: true},
    participant_id: {type: String, required: true},
})

const callSchema = new mongoose.Schema({
    participants:[participantSchema],
    call_duration: {type: String, required: true}
})

const Call = mongoose.model('Call', callSchema);

module.exports = Call;