import BasePage from "./BasePage";
import InventoryPage from "./InventoryPage";
import LoginPage from "./LoginPage";

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

            case 'Inventory':
                page = new InventoryPage();
                break;
            
            default:
                throw new Error(`"${pageName}" page not implemented yet!`);
        }
    
        return page;
    };
}
