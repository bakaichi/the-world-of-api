import bcrypt from "bcrypt";
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}
const fireImages = [
    "/src/lib/public/fireN.png",
    "/src/lib/public/fireN2.png",
    "/src/lib/public/fireN3.png",
    "/src/lib/public/fireN4.png"
];
const waterImages = [
    "/src/lib/public/waterT.png",
    "/src/lib/public/waterT2.png",
    "/src/lib/public/waterT3.png",
    "/src/lib/public/waterT4.png"
];
const airImages = [
    "/src/lib/public/airT.png",
    "/src/lib/public/airT2.png",
    "/src/lib/public/airT3.png",
    "/src/lib/public/airT4.png"
];
const earthImages = [
    "/src/lib/public/earthK.png",
    "/src/lib/public/earthK2.png",
    "/src/lib/public/earthK3.png",
    "/src/lib/public/earthK4.png"
];
export const seedData = {
    users: {
        _model: "User",
        homer: {
            username: "HomerSimpson",
            email: "homer@simpson.com",
            password: await hashPassword("secret"),
        },
        marge: {
            username: "MargeSimpson",
            email: "marge@simpson.com",
            password: await hashPassword("secret"),
        },
        bart: {
            username: "BartSimpson",
            email: "bart@simpson.com",
            password: await hashPassword("secret"),
        },
    },
    characters: {
        _model: "Character",
        aang: {
            name: "Aang",
        },
        katara: {
            name: "Katara",
        },
        sokka: {
            name: "Sokka",
        },
        zuko: {
            name: "Zuko",
        },
        toph: {
            name: "Toph",
        },
        suki: {
            name: "Suki",
        },
        azula: {
            name: "Azula",
        },
        iroh: {
            name: "Iroh",
        },
        ozai: {
            name: "Ozai",
        },
        appa: {
            name: "Appa",
        }
    },
    lores: {
        _model: "Lore",
        fireNation1: {
            bookno: 1,
            charactersinv: "Zuko",
            lat: 0,
            lng: -115,
            lore: "Zuko's search for his honor led him across the world.",
            contributor: "Zuko",
            nation: "Fire Nation",
            images: [fireImages[0], fireImages[1]]
        },
        fireNation2: {
            bookno: 2,
            charactersinv: "Azula",
            lat: 5,
            lng: -125,
            lore: "Azula's conquest of Ba Sing Se showcased her formidable power.",
            contributor: "Azula",
            nation: "Fire Nation",
            images: [fireImages[2], fireImages[3]]
        },
        fireNation3: {
            bookno: 3,
            charactersinv: "Iroh",
            lat: -10,
            lng: -130,
            lore: "Iroh's wisdom and tea-making skills are renowned throughout the Fire Nation.",
            contributor: "Iroh",
            nation: "Fire Nation",
            images: [fireImages[0], fireImages[2]]
        },
        northernWaterTribe1: {
            bookno: 1,
            charactersinv: "Katara",
            lat: 83,
            lng: 10,
            lore: "Katara's mastery of waterbending helped save her tribe from hardship.",
            contributor: "Katara",
            nation: "Water Tribes",
            images: [waterImages[0], waterImages[1]]
        },
        northernWaterTribe2: {
            bookno: 2,
            charactersinv: "Sokka",
            lat: 78,
            lng: 15,
            lore: "Sokka's ingenuity and bravery made him a hero of the Northern Water Tribe.",
            contributor: "Sokka",
            nation: "Water Tribes",
            images: [waterImages[2], waterImages[3]]
        },
        northernWaterTribe3: {
            bookno: 3,
            charactersinv: "Aang",
            lat: 80,
            lng: 5,
            lore: "Aang's visit to the Northern Water Tribe marked a turning point in his journey.",
            contributor: "Aang",
            nation: "Water Tribes",
            images: [waterImages[0], waterImages[2]]
        },
        southernWaterTribe1: {
            bookno: 1,
            charactersinv: "Katara",
            lat: -77,
            lng: -10,
            lore: "Katara's early years in the Southern Water Tribe shaped her resolve.",
            contributor: "Katara",
            nation: "Water Tribes",
            images: [waterImages[1], waterImages[3]]
        },
        southernWaterTribe2: {
            bookno: 2,
            charactersinv: "Sokka",
            lat: -82,
            lng: 15,
            lore: "Sokka's leadership was vital in defending the Southern Water Tribe.",
            contributor: "Sokka",
            nation: "Water Tribes",
            images: [waterImages[0], waterImages[2]]
        },
        southernWaterTribe3: {
            bookno: 3,
            charactersinv: "Aang",
            lat: -80,
            lng: 5,
            lore: "Aang's arrival brought hope to the Southern Water Tribe.",
            contributor: "Aang",
            nation: "Water Tribes",
            images: [waterImages[1], waterImages[3]]
        },
        northernAirTemple: {
            bookno: 1,
            charactersinv: "Aang",
            lat: 75,
            lng: 45,
            lore: "Aang's memories of the Northern Air Temple were filled with joy and sorrow.",
            contributor: "Aang",
            nation: "Air Nomads",
            images: [airImages[0], airImages[1]]
        },
        southernAirTemple: {
            bookno: 2,
            charactersinv: "Aang",
            lat: -65,
            lng: -25,
            lore: "The Southern Air Temple holds a special place in Aang's heart.",
            contributor: "Aang",
            nation: "Air Nomads",
            images: [airImages[2], airImages[3]]
        },
        easternAirTemple: {
            bookno: 3,
            charactersinv: "Aang",
            lat: -32,
            lng: 152,
            lore: "Aang found peace and guidance at the Eastern Air Temple.",
            contributor: "Aang",
            nation: "Air Nomads",
            images: [airImages[0], airImages[2]]
        },
        westernAirTemple: {
            bookno: 3,
            charactersinv: "Aang",
            lat: 63,
            lng: -65,
            lore: "The Western Air Temple was a hidden sanctuary for Aang and his friends.",
            contributor: "Aang",
            nation: "Air Nomads",
            images: [airImages[1], airImages[3]]
        },
        earthKingdom1: {
            bookno: 1,
            charactersinv: "Toph",
            lat: 35,
            lng: 120,
            lore: "Toph's earthbending mastery made her the greatest Earthbender in the world.",
            contributor: "Toph",
            nation: "Earth Kingdom",
            images: [earthImages[0], earthImages[1]]
        },
        earthKingdom2: {
            bookno: 2,
            charactersinv: "Suki",
            lat: 30,
            lng: 110,
            lore: "Suki's leadership of the Kyoshi Warriors protected the Earth Kingdom.",
            contributor: "Suki",
            nation: "Earth Kingdom",
            images: [earthImages[2], earthImages[3]]
        },
        earthKingdom3: {
            bookno: 3,
            charactersinv: "Aang",
            lat: 40,
            lng: 100,
            lore: "Aang's journey through the Earth Kingdom taught him the value of resilience.",
            contributor: "Aang",
            nation: "Earth Kingdom",
            images: [earthImages[0], earthImages[2]]
        }
    }
};
