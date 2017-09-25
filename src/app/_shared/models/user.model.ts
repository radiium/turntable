export class User {
    constructor(
        public name: string,
        public access_token: string,
        public refresh_token: string,
        public img: string,
        public isAuthenticated: boolean) {
            this.name = name;
            this.access_token = access_token;
            this.refresh_token = refresh_token;
            this.img = img;
            this.isAuthenticated = isAuthenticated;
    }
}
