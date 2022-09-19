import {Model} from '@vuex-orm/core'
import Post from "@/Models/Post";

export default class Comment extends Model {
    static entity = 'comments'


    static fields() {
        return {
            id: this.attr(null),
            body: this.attr(''),
            postId: this.attr(null),
            email: this.string(''),
            icon: this.attr({}),

            // relationships
            post: this.belongsTo(Post, 'postId')
        }
    }
}