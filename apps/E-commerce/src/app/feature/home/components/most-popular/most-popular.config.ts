import { product } from '../../interfaces/home';
import { Product as ProductCardModel } from 'apps/E-commerce/src/app/shared/components/ui/product-card/interface/product';

export function mapToProductCard(product: product): ProductCardModel {
    return {
        _id: product._id,
        title: product.title,
        slug: product.slug ?? '',
        description: product.description,
        imgCover: product.imgCover,
        images: product.images,
        price: product.price,
        priceAfterDiscount: product.priceAfterDiscount ?? product.price,
        quantity: product.quantity,
        category: product.category,
        occasion: product.occasion,
        createdAt: product.createdAt ?? '',
        updatedAt: product.updatedAt ?? '',
        sold: product.sold ?? 0,
        rateAvg: product.rateAvg ?? 0,
        rateCount: product.rateCount ?? 0,
        isSuperAdmin: product.isSuperAdmin ?? false,
        favoriteId: null,
        isInWishlist: false,
    };
}
