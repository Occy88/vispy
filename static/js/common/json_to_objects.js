function json_to_objects(json_data) {
    /**
     * This is for handling the unpacking of serialized json from a Django object request
     * @returns: a list of objects specified by the request
     */
        // the request contains the model so this is sort of a factory.
    var model_to_class = {
            "group":Group,
            "user": User,
            "factory": Factory,
            "factoryline": FactoryLine,
            "supplier": Supplier,
            "suppliersite": SupplierSite,
            "storagezone": StorageZone,
            "storagezoneunit": StorageZoneUnit,
            "truck": Truck,
            "product": Product
        };
    var object_list=[];
    for(var i in json_data){
        var model_dict=json[i];
        var model_fields=model_dict["fields"];
        var class_inst=model_to_class[model_dict["model"]];
        object_list.push(class_inst(model_fields))
    }
    return object_list;
}
