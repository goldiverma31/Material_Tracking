const defaultParams = {
    search: '',
    sortField: 'createdAt',
    order: 'ASC',
    filterField: '',
    filterValue: '',
    page: '',
    limit: '',
};

const queryBuilder = (data) => {
    const query = {};
    data.search !== ''
        ? (query.search = data.search)
        : (query.search = defaultParams.search);
    data.order !== ''
        ? ((query.order = data.order), (query.sortField = data.sortField))
        : ((query.order = defaultParams.order),
            (query.sortField = defaultParams.sortField));
    data.filterField !== ''
        ? (query.filterField = data.filterField)
        : (query.filterField = defaultParams.filterField);
    data.filterValue !== ''
        ? (query.filterValue = data.filterValue)
        : (query.filterValue = defaultParams.filterValue);
    data.page && (query.offset = (data.page - 1) * parseInt(data.limit));
    data.limit && (query.limit = parseInt(data.limit));
    return query;
};
module.exports = queryBuilder;