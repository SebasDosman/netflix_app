import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Genre {
    _id?: string;
    
    @Prop({ unique: true, required: true, maxlength: 50 })
    name: string;
    
    @Prop({ required: true, maxlength: 150 })
    description: string;
    
    @Prop({ default: true, required: true })
    isActive: boolean;
}


export const GenreSchema = SchemaFactory.createForClass(Genre);