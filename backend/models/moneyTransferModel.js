const mongoose = require("mongoose");

const moneyTransferSchema = mongoose.Schema(
    {
        amount:{
            type: String,
            required: true
        },
        senderAccount:{
            type: mongoose.Types.ObjectId,
            required: true
        },
        recieverAccount:{
            type: mongoose.Types.ObjectId,
            required: true
        },
        status:{
            type: String,
            required: true
        },
        reason:{
            type: String,
            required: true,
            default:"Miscllenous"
        },
        senderBank:{
            type: String,
            required: true
        },
        reciverBank:{
            type: String,
            required: true
        },
        fee:{
            type: String,
            required: true
        }
      },
      {
        timestamps: true,
      }
);



const moneyTransfer = mongoose.model("MoneyTransfer", moneyTransferSchema);

module.exports = moneyTransfer;
