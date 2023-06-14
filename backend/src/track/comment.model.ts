import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Track} from "./track.model";

@Table({tableName: 'comments'})
export class Comment extends Model<Comment,{}>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    username: string;

    @Column({type: DataType.STRING})
    text: string;

    @ForeignKey(() => Track)
    @Column({type: DataType.INTEGER})
    trackId: number;

    @BelongsTo(()=>Track)
    track: Track;
}