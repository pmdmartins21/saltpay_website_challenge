export class Album {

    constructor(
        public albumName: string,
        public artistName: string,
        public imageUrl: string,
        public trackNumber: number,
        public price: string, // currency is always dollars
        public rights: string,
        public itunesLink: string,
        public genre: string, // filter by name, category, price?
        public releaseDate: string,
        public id:string
    ) {}

}