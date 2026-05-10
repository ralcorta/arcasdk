import { Item } from "./Item";

/**
 * arrayItems
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ArrayItems {
    /** item[] */
    item?: Array<Item>;
}
