import { Injectable } from '@nestjs/common';
import { Movie } from './entity/movies.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll():Movie[] {
        return this.movies;
    }

    getOne(id:string):Movie{
        // string으로 받아온 id값을 int로 형변환
        return this.movies.find(movie => movie.id === +id);
    }

    deleteOne(id:string):boolean{
        this.movies.filter(movie => movie.id !== +id);
        return true;
    }

    create(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }
}