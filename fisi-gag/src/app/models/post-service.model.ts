import { StringMap } from '@angular/compiler/src/compiler_facade_interface';


// tslint:disable-next-line: no-namespace
export namespace PostServiceModel {
    export type PostContentType = 'text' | 'video' | 'picture';
    export interface PostEntity {
        postId: string;
        userId: string;
        userName: string;
        postDate: Date;
        points: number;
        comments: number;
        title: string;
        mediaUrl?: string;
        content?: any;
        contentType: PostContentType;
        categories: PostCategory[];
    }

    export interface PostCategory {
        categoryId: string;
        category: string;
        categroyIconUrl?: string;
    }
}
