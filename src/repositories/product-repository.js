import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const Product = mongoose.model('Product');

export default class ProductRepository {
  static async get() {
    const res = await Product
      .find({
        active: true,
      }, 'title price slug');

    return res;
  }

  static async getBySlug(slug) {
    const res = await Product
      .findOne({
        slug,
        active: true,
      }, 'title description price slug tags');

    return res;
  }

  static async getById(id) {
    const res = await Product
      .findById(id);

    return res;
  }

  static async getByTag(tag) {
    const res = await Product
      .find({
        tags: tag,
        active: true,
      }, 'title description price slug tags');

    return res;
  }

  static async create(data) {
    const product = new Product(data);

    await product.save();
  }

  static async update(id, data) {
    await Product
      .findByIdAndUpdate(id, {
        $set: {
          title: data.title,
          description: data.description,
          price: data.price,
          slug: data.slug,
        },
      });
  }

  static async deleteProduct(id) {
    await Product
      .findOneAndRemove(id);
  }
}
