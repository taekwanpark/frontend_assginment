import {Model} from '@vuex-orm/core'
import Comment from './Comment'

export default class Post extends Model {
    static entity = 'posts'


    static fields() {
        return {
            id: this.attr(null),
            title: this.string(''),
            complete: this.boolean(false),
            // relationships
            comments: this.hasMany(Comment, 'postId')
        }
    }
}