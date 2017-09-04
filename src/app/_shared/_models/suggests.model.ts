export class SuggestsModel {
    constructor(
        public query: String,
        public suggests: String []) {
            this.query = query;
            this.suggests = suggests;
    }
}
