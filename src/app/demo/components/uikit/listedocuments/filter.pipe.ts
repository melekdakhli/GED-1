import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      // Filtrez les éléments selon les critères requis
      // Par exemple, si vous souhaitez filtrer par nom de catégorie
      return item.categoryName.toLowerCase().includes(searchTerm);
    });
  }
}
