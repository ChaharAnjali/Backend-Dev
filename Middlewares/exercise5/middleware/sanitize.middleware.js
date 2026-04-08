export const sanitizeInput = (req, res, next) => {

    const sanitize = (data) => {
        if (typeof data === "string") {
            return data
                .replace(/</g, "")   // remove <
                .replace(/>/g, "")   // remove >
                .replace(/'/g, "")   // remove '
                .replace(/"/g, "")   // remove "
                .replace(/;/g, "");  // remove ;
        }

        if (typeof data === "object" && data !== null) {
            for (let key in data) {
                data[key] = sanitize(data[key]);
            }
        }

        return data;
    };

    req.body = sanitize(req.body);
    req.query = sanitize(req.query);
    req.params = sanitize(req.params);

    next();
};