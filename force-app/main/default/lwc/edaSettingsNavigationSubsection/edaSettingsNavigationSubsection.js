import { LightningElement, api } from "lwc";

export default class EdaSettingsNavigationSubsection extends LightningElement {
    @api viewModel;

    get qaLocator() {
        return "edaSettingsNav" + this.viewModel.id;
    }

    get hasMenuItems() {
        return !!this.viewModel.menuItems;
    }

    get menuItemsViewModel() {
        let formattedMenuItems = [];

        this.viewModel.menuItems.forEach((menuItem) => {
            let formattedMenuItem = {
                label: menuItem.label,
                id: menuItem.id,
                qaLocator: "edaSettingsNav" + menuItem.id,
            };
            formattedMenuItems.push(formattedMenuItem);
        });

        const menuItemsViewModel = {
            page: this.viewModel.page,
            isActive: this.viewModel.isActive,
            paddingLeft: "slds-p-left_x-large",
            menuItems: formattedMenuItems,
        };

        return menuItemsViewModel;
    }

    handleNavigationClick() {
        this.dispatchSettingsNavigationEvent();
    }

    dispatchSettingsNavigationEvent() {
        const settingsNavigationDetail = {
            pageName: this.viewModel.page,
        };
        this.dispatchEvent(
            new CustomEvent("settingsnavigation", {
                detail: settingsNavigationDetail,
                bubbles: true,
                composed: true,
            })
        );
    }

    get subsectionHeaderClass() {
        let subsectionHeaderClass = "slds-p-horizontal_large slds-p-top_small slds-p-bottom_xx-small";

        if (this.viewModel.isActive) {
            subsectionHeaderClass += " eda-nav-is-active";
        }

        return subsectionHeaderClass;
    }
}
