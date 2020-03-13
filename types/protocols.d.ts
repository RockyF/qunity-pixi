/**
 * Created by rockyl on 2020-03-11.
 */
import { Application } from 'qunity';
export declare enum Protocols {
    TEXTURE = "texture://"
}
export declare const protocols: {
    [Protocols.TEXTURE]: typeof texture;
};
declare function texture(app: Application, key: string, value: any): any;
export {};
