import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Content } from "src/modules/content/entities/content.entity";


@Schema()
export class User {
    _id?: string;
    
    @Prop({ required: true, maxlength: 50 })
    name: string;
    
    @Prop({ default: Date.now, required: true })
    createdAt: Date;

    @Prop({ required: true })
    imageUrl: string;

    @Prop({ default: () => [], required: false })
    favoriteList: Content[]; 

    @Prop({ default: () => [], required: false })
    historyList: Content[];

    @Prop({ unique: true, required: true })
    email: string;
    
    @Prop({ required: true, minlength: 8 })
    password?: string;
    
    @Prop({ default: true })
    isActive: boolean;
    
    @Prop({ type: [String], default: ['user'], required: true })
    roles: string[];
}


export const UserSchema = SchemaFactory.createForClass(User);