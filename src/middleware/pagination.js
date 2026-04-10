const paginate = (req, totalItems, page, limit) => {
    const totalPages = Math.ceil(totalItems / limit);
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}${req.baseUrl}${req.path}`;

    // Construir query strings preservando otros filtros
    const getUrl = (p) => {
        const query = { ...req.query, page: p };
        const searchParams = new URLSearchParams(query).toString();
        return `${baseUrl}?${searchParams}`;
    };

    return {
        count: totalItems,
        pages: totalPages,
        next: page < totalPages ? getUrl(page + 1) : null,
        prev: page > 1 ? getUrl(page - 1) : null
    };
};

module.exports = { paginate };
