import { Schema, model } from 'mongoose';

// generate unique ID
const generateID = () => {
    const date = Date.now();
    const randomString = Array.from({ length: 11 }, () => Math.random().toString(36).slice(2, 3)).join('');
    return `${date}${randomString}`;
};

const cardSchema = new Schema({
    id: {
        type: String,
        unique: true,
        default: generateID,
    },
    title: {
        type: String,
        required: [true, "Provide the Card Title!"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Provide Card Description!"],
    },
    link: {
        type: String,
        required: false,
    }
});


// Error-handling middleware 
cardSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        // Check if it's a unique constraint
        if (error.keyValue && error.keyValue.title) {
            next(new Error(`Duplicate! '${error.keyValue.title}' Already Exists!`));
        } else {
            next(new Error('Duplicate! Title Already Exists!'));
        }
    } else {
        next(error);
    }
});


cardSchema.post('insertMany', (error, doc, next) => {
    if (error.code === 11000) {
        if (error.keyValue && error.keyValue.title) {
            next(new Error(`'${error.keyValue.title}' Already Exist(s)!`));
        } else {
            next(new Error('Duplicate! One or Some Title(s) Already Exist(s)!'));
        }
    } else {
        next(error);
    }
});

const CardModel = model("Card", cardSchema);

export default CardModel;
