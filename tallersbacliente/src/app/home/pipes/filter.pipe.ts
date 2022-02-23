import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    if(value != null){
      for(const post of value){
        if(post.titulo.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.direccion.toLowerCase().indexOf(arg.toLowerCase()) > -1 ){
           resultPosts.push(post);
        }
      };
      return resultPosts;
    }
    
  }

}