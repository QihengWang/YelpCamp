const mongoose= require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const randomSelect = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.random() * 20 + 10;
        const newCampground = new Campground({
            author: '62c856a3a81f408d124caae0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${randomSelect(descriptors)} ${randomSelect(places)}`,
            description: 'This is a description',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,    
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/wqh/image/upload/v1657486820/YelpCamp/vjf4lujfvsbmsyplmafn.jpg',
                    filename: 'YelpCamp/vjf4lujfvsbmsyplmafn'
                },
                {
                    url: 'https://res.cloudinary.com/wqh/image/upload/v1657486820/YelpCamp/uc3bbniqxvophcsbvdxp.jpg',
                    filename: 'YelpCamp/uc3bbniqxvophcsbvdxp'
                }
            ]
        })
        await newCampground.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})