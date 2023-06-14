import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileService, FileType} from "../file/file.service";
import {Track} from "./track.model";
import {Comment} from "./comment.model";
import {Op} from 'sequelize'

@Injectable()
export class TrackService {

    constructor(@InjectModel(Track) private trackModel: typeof Track,
                @InjectModel(Comment) private commentModel: typeof Comment,
                private fileService: FileService) {}

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const track = await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
        return track
    }

    async getAll(count = 10, offset = 0): Promise<Track[]> {
        const tracks = await this.trackModel.findAll({offset,limit: count});
        return tracks;
    }

    async getOne(id: number): Promise<Track> {
        const track = await this.trackModel.findOne({where: {id}, include: {model: Comment, as: 'comments'}});
        return track
    }

    async delete(id: number): Promise<number> {
        const track = await this.trackModel.destroy({where: {id}});
        return track
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findOne({where: {id:dto.trackId}})
        const comment = await this.commentModel.create({...dto})
        // @ts-ignore
        track.comments.push(comment.id)
        await track.save();
        return comment
    }

    async listen(id: number) {
        const track = await this.trackModel.findOne({where: {id}});
        track.listens += 1
        track.save()
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.findAll({
            // @ts-ignore

        where: {
            [Op.or]: [
                {'name':{[Op.like]:new RegExp(query, 'i')}}
            ]/*{
                $regex: new RegExp(query, 'i')
            }*/
        }
        })
        return tracks;
    }
}
