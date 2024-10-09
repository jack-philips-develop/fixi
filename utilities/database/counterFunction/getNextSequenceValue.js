const Counter = require('../../../models/counter');

async function getNextSequenceValue(sequenceName, startNumber) {
    let sequenceDocument = await Counter.findOne({ _id: sequenceName });

    if (!sequenceDocument) {
        sequenceDocument = await Counter.create({
            _id: sequenceName,
            sequence_value: startNumber
        });
    } else if (sequenceDocument.sequence_value < startNumber) {
        sequenceDocument.sequence_value = startNumber;
        await sequenceDocument.save();
    }

    sequenceDocument = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 } },
        { new: true }
    );

    return sequenceDocument.sequence_value;
}

module.exports = getNextSequenceValue;
