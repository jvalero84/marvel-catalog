export type TCharBasic = {
  id: number;
  name: string;
};

export type TCharCard = TCharBasic & {
  thumbnail: {
    path: string;
    extension: string;
  };
};

export type TCharDetail = TCharCard & {
  description: string;
  // comics: [{

  // }]
};
