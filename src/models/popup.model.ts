export interface IPopup {
    isCreateNewAddressShown : boolean,
    isEditAddressShown : boolean
}
export const initialPopup : IPopup = {
    isCreateNewAddressShown : false,
    isEditAddressShown : false,
}