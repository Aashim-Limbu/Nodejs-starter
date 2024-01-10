class APIFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const searchQuery = { ...this.queryString };
    const keys = ['page', 'limit', 'sort', 'fields'];
    keys.forEach((key) => delete searchQuery[key]);
    let tempQuery = JSON.stringify(searchQuery);
    tempQuery = JSON.parse(
      tempQuery.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
    );
    this.query = this.query.find(tempQuery);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  page() {
    if (this.queryString.page || this.queryString.limit) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 10;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }
}
module.exports = APIFeature;
