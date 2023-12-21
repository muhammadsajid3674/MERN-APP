class ApiFeatures {
    constructor(query, queryStr, req) {
        this.query = query;
        this.queryStr = queryStr;
        this.req = req;
    }
    search() {
        const searchQuery = this.queryStr.name
            ? {
                $or: [
                    { name: { $regex: this.queryStr.name, $options: "i" } }
                ]
            }
            : {};
        this.query = this.query.find({ ...searchQuery });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        // ? remove fields from query
        const removeFields = ["name", "description"];
        removeFields.forEach((el) => delete queryCopy[el]);
        this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

export default ApiFeatures;