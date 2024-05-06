export const seedData = {
    users: {
      _model: "User",
      homer: {
        username: "HomerSimpson",
        email: "homer@simpson.com",
        password: "secret",
      },
      marge: {
        username: "MargeSimpson",
        email: "marge@simpson.com",
        password: "secret",
      },
      bart: {
        username: "BartSimpson",
        email: "bart@simpson.com",
        password: "secret",
      },
    },
    characters: {
      _model: "Character",
      homer: {
        name: "Homer",
      },
      marge: {
        name: "Marge",
      },
      bart: {
        name: "Bart",
      },
    },
    lore: {
      _model: "Lore",
      springfieldTales: {
        bookno: 1,
        charactersinv: "Homer, Marge, Bart",
        lore: "The misadventures of a nuclear family in Springfield.",
        lat: "39.7817",
        lng: "-89.6501",
        contributor: "baka",
        
      }
    }
};
