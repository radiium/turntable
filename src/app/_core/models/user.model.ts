export class User {
    constructor(
        public name: string,
        public token: string,
        public img: string,
        public isAuthenticated: boolean) {
            this.name = name;
            this.token = token;
            this.img = img;
            this.isAuthenticated = isAuthenticated;
    }
}
