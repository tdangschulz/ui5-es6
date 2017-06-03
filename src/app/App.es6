import ManagedObject from "sap/ui/base/ManagedObject";

export default class App extends ManagedObject{

    onInit() {

        this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
    }

    onOpenDialog() {
        this.getOwnerComponent().openHelloDialog();
    }
}