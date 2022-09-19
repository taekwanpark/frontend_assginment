import {Model} from '@vuex-orm/core'

export default class User extends Model {
static entity = 'users'


    static fields() {
        return {
            id:this.attr(null),
            name:this.string(''),
            email:this.string(null).nullable(),
        }
    }
}