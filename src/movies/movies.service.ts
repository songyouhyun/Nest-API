import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entity/movies.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll():Movie[] {
        return this.movies;
    }

    getOne(id:string):Movie{
        // string으로 받아온 id값을 int로 형변환
        const movie =  this.movies.find(movie => movie.id === +id);
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} is not found`);
        }
        return movie;
    }

    deleteOne(id:string){
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id);
    }

    create(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }
    
    update(id:string, updateData){
        // id가 1인 movie를 가져온다 -> 그 movie를 지운다 -> 과거의 데이터에 새로운 데이터를 더해서 새로운 movie를 만든다
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });

    }
}