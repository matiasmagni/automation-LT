import BasePage from "./BasePage";
import ProductsPage from "./ProductsPage";
import LoginPage from "./LoginPage";
import YourCartPage from "./YourCartPage";
import CheckoutYourInformationPage from "./CheckoutYourInformationPage";
import CheckoutOverviewPage from "./CheckoutOverviewPage";

export default class PageFactory {
    /**
     * Gets the page's object for the given name.
     * 
     * @param pageName The page's name.
     * @returns A page object.
     */
     public static getCurrentPageObject(pageName: string): BasePage {
        let page: BasePage;
    
        switch (pageName) {
            case 'Login':
                page = new LoginPage();
                break;

            case 'Products':
                page = new ProductsPage();
                break;

            case 'Your Cart':
                page = new YourCartPage();
                break;

            case 'Checkout: Your Information':
                page = new CheckoutYourInformationPage();
                break;

            case 'Checkout: Overview':
                page = new CheckoutOverviewPage();
                break;
            
            default:
                throw new Error(`"${pageName}" page not implemented yet!`);
        }
    
        return page;
    };
}
