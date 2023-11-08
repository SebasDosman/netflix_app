import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Content {
    _id?: string;
    
    @Prop({ default: false, required: true })
    isFilm: boolean;
    
    @Prop({ required: true })
    title: string;
    
    @Prop({ required: true })
    trailer: string;
    
    @Prop({ required: true })
    image: string;
    
    @Prop({ required: true })
    releaseAt: Date;
    
    @Prop({ required: true })
    classification: number;
    
    @Prop({ required: true })
    description: string;
    
    @Prop({ required: true })
    duration: string;
    
    @Prop({ required: true })
    tags: string[];
    
    @Prop({ required: true })
    castList: string[];
    
    @Prop({ required: true })
    genreList: string[];
    
    @Prop({ default: true })
    isActive: boolean;
}


export const ContentSchema = SchemaFactory.createForClass(Content);