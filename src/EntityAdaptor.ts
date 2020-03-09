/**
 * Created by rockyl on 2020-03-08.
 */

import {EntityAdaptorBase} from 'qunity'

export class EntityAdaptor extends EntityAdaptorBase {
	get isActive(): boolean {
		return false;
	}

}
