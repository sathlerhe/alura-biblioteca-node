import BadRequest from "../errors/BadRequest.js";

export default async function pagination(req, res, next) {
  try {
    let { limit = 5, page = 1, ordenation = "_id:-1" } = req.query;

    let [sortBy, order] = ordenation.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result

    if (limit < 0 || page < 0) return next(new BadRequest());

    const paginetedResult = await result
      .find()
      .sort({
        [sortBy]: order,
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.status(200).send(paginetedResult);
  } catch (err) {
    next(err);
  }
}
