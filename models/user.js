const { Schema, model } = require("mongoose")
const { createHmac, randomBytes } = require("node:crypto")
const newSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: "/public/images/default-profile.jpg"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
},
    { timestamps: true }
)

newSchema.pre("save", function () {
    const user = this;

    if (!user.isModified("password")) {
        return;
    }

    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

});

newSchema.static("matchPassword", function(email,password){
    const user = User.findOne({email})
    if (!user) throw new Error("User not found")
    const salt = user.salt
    const hashedPassword = user.password
    const userProvidedhash = createHmac("sha256",salt)
    .update(password)
    .digest("hex")

    if (userProvidedhash !== hashedPassword)
        throw new Error("Incorrect password")
    return {...user , password:undefined,salt: undefined}
})

const User = model("user", newSchema)

module.exports = User