import BasePage from './BasePage';
import { toKebabCase } from '../../utils/string';

export default class ProductsPage extends BasePage {
    /**
     * Adds a product to cart by providing its name.
     * @param productName The product's title showed on Products page.
     */
    public addProductToCart(productName: string) {
        this.getElementBySearchParam('addProductToCartButton', toKebabCase(productName)).click();
    }
}
